import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from '../config/prisma';
import { Order, OrderItem, OrderStatus } from '@prisma/client';

interface CartItem {
  productId: number,
  quantity: number
};

export const createOrder = async (userId: number, items: CartItem[]) => {
  // BƯỚC 1: Validate đầu vào & Lấy thông tin sản phẩm
  if (!items || items.length === 0) {
    throw new Error('Cart is empty');
  }

  // Lấy danh sách ID để query 1 lần (tối ưu hiệu năng)
  const productIds = items.map(p => p.productId);

  const productsInDb = await prisma.product.findMany({
    where: { id: { in: productIds } }
  });

  // Map để tra cứu nhanh: id -> product
  const productMap = new Map(productsInDb.map(p => [p.id, p]));

  let totalAmount = 0;
  const orderItemsData: { productId: number; quantity: number; price: number; }[] = [];

  // BƯỚC 2: Tính toán & Validate logic (In-Memory)
  for (const item of items) {
    const product = productMap.get(item.productId);

    if (!product) {
      throw new Error(`Product ID ${item.productId} not found`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`Product ID ${item.productId} is out of stock`);
    }

    // Tính tiền: Luôn dùng giá từ DB
    const itemTotal = item.quantity * Number(product.price);
    totalAmount += itemTotal;

    orderItemsData.push({
      productId: item.productId,
      quantity: item.quantity,
      price: Number(product.price)
    })
  }

  // BƯỚC 3: DATABASE TRANSACTION (ACID)
  try {
    const result = await prisma.$transaction(async (tx) => {
      // 3.1: Tạo Order
      const newOrder = await tx.order.create({
        data: {
          userId: userId,
          totalAmount: totalAmount,
          status: 'PENDING',
          items: {
            create: orderItemsData
          }
        }
      })

      // 3.2: Trừ kho & Xử lý Race Condition cho TỪNG sản phẩm
      for (const item of items) {
        // Kỹ thuật Optimistic Concurrency Control:
        // Cố gắng update với điều kiện stock >= quantity.
        // Nếu không thỏa mãn -> Prisma throw Error -> Rollback toàn bộ.
        const result = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: { gte: item.quantity }
          },
          data: {
            stock: { decrement: item.quantity }
          }
        })

        if (result.count === 0) {
          throw new Error(`Product ID ${item.productId} is out of stock during checkout transaction`);
        }
      }

      return newOrder;
    });

    return result;
  } catch (error: any) {
    console.error("Order Creation Failed:", error);
    if (error.message.includes('out of stock')) {
      throw error;
    }
    throw new Error('Error checking out');
  }
}

export const getOrderServiceByUserId = async (userId: number) => {
  return await prisma.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              colorCode: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const updateOrderStatus = async (orderId: number, status: string) => {

  const order = await prisma.order.findUnique({
    where: {
      id: orderId
    }
  });

  if (!order) {
    throw new Error('Order not found');
  }

  if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
    throw new Error('Error updating invalid status');
  }

  return await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: (status as OrderStatus)
    }
  })
}