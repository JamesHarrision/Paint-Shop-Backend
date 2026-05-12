import { prisma } from '../config/prisma';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { OrderRepository } from '../repositories/order.repository';
import { ProductRepository } from '../repositories/product.repository';

interface CartItem {
  productId: number;
  quantity: number;
}

export class OrderService {
  private orderRepo = new OrderRepository();
  private productRepo = new ProductRepository();

  public createOrder = async (userId: number, items: CartItem[]) => {
    // 1. Lấy thông tin sản phẩm từ DB
    const productIds = items.map(p => p.productId);
    const productsInDb = await Promise.all(
      productIds.map(id => this.productRepo.getProductById(id))
    );

    const productMap = new Map();
    productsInDb.forEach(p => {
      if (p) productMap.set(p.id, p);
    });

    let totalAmount = 0;
    const orderItemsData: any[] = [];

    // 2. Validate logic & Tính tiền
    for (const item of items) {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new Error(`PRODUCT_NOT_FOUND:${item.productId}`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`OUT_OF_STOCK:${item.productId}`);
      }

      const itemTotal = item.quantity * Number(product.price);
      totalAmount += itemTotal;

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: Number(product.price)
      });
    }

    // 3. Transaction
    try {
      return await prisma.$transaction(async (tx) => {
        // 3.1: Tạo Order
        const newOrder = await this.orderRepo.create({
          userId: userId,
          totalAmount: totalAmount,
          status: OrderStatus.PENDING,
          items: {
            create: orderItemsData
          }
        }, tx);

        // 3.2: Trừ kho
        for (const item of items) {
          const result = await this.productRepo.decrementStock(item.productId, item.quantity, tx);

          if (result.count === 0) {
            throw new Error(`OUT_OF_STOCK_TRANS:${item.productId}`);
          }
        }

        return newOrder;
      });
    } catch (error: any) {
      console.error("Order Creation Failed:", error);
      throw error;
    }
  }

  public getOrdersByUserId = async (userId: number, page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;
    const orders = await this.orderRepo.findAllByUserId(userId, skip, limit);
    const total = await this.orderRepo.countByUserId(userId);

    return {
      data: orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  public updateOrderStatus = async (orderId: number, newStatus: OrderStatus) => {
    return await prisma.$transaction(async (tx) => {
      const currentOrder = await this.orderRepo.findById(orderId, tx);

      if (!currentOrder) {
        throw new Error('ORDER_NOT_FOUND');
      }

      // Nếu hủy đơn hàng, hoàn trả lại kho
      if (newStatus === OrderStatus.CANCELLED && currentOrder.status !== OrderStatus.CANCELLED) {
        for (const item of currentOrder.items) {
          await this.productRepo.incrementStock(item.productId, item.quantity, tx);
        }
      }

      return await this.orderRepo.updateStatus(orderId, newStatus, tx);
    });
  }

  public updatePaymentStatus = async (orderId: number, newStatus: PaymentStatus) => {
    const currentOrder = await this.orderRepo.findById(orderId);
    if (!currentOrder) {
      throw new Error('ORDER_NOT_FOUND');
    }
    return await this.orderRepo.updatePaymentStatus(orderId, newStatus);
  }
  
  public getOrderById = async (orderId: number) => {
    return await this.orderRepo.findById(orderId);
  }

  public getAllOrders = async (page: number = 1, limit: number = 10, search?: string) => {
    const skip = (page - 1) * limit;
    const orders = await this.orderRepo.findAll(skip, limit, search);
    const total = await this.orderRepo.countAll(search);

    return {
      data: orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}