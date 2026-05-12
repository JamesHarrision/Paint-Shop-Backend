import { prisma } from "../config/prisma";
import { Prisma, OrderStatus, PaymentStatus } from "@prisma/client";

export class OrderRepository {
  public async create(data: Prisma.OrderUncheckedCreateInput, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return await client.order.create({
      data,
      include: {
        items: true
      }
    });
  }

  public async findById(id: number, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return await client.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                colorCode: true,
                imageUrl: true
              }
            }
          }
        }
      }
    });
  }

  public async findAllByUserId(userId: number, skip?: number, take?: number) {
    return await prisma.order.findMany({
      where: { userId },
      skip,
      take,
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                colorCode: true,
                imageUrl: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  public async countByUserId(userId: number) {
    return await prisma.order.count({
      where: { userId }
    });
  }

  public async updateStatus(id: number, status: OrderStatus, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return await client.order.update({
      where: { id },
      data: { status }
    });
  }

  public async updatePaymentStatus(id: number, paymentStatus: PaymentStatus, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return await client.order.update({
      where: { id },
      data: { paymentStatus }
    });
  }

  public async findAll(skip?: number, take?: number, search?: string) {
    const where: Prisma.OrderWhereInput = {};
    if (search) {
      const idSearch = Number(search);
      const orConditions: Prisma.OrderWhereInput[] = [
        { user: { fullName: { contains: search } } },
        { user: { email: { contains: search } } }
      ];
      if (!isNaN(idSearch)) {
        orConditions.push({ id: idSearch });
      }
      where.OR = orConditions;
    }

    return await prisma.order.findMany({
      where,
      skip,
      take,
      include: {
        user: {
          select: {
            fullName: true,
            email: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
                colorCode: true,
                imageUrl: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  public async countAll(search?: string) {
    const where: Prisma.OrderWhereInput = {};
    if (search) {
      const idSearch = Number(search);
      const orConditions: Prisma.OrderWhereInput[] = [
        { user: { fullName: { contains: search } } },
        { user: { email: { contains: search } } }
      ];
      if (!isNaN(idSearch)) {
        orConditions.push({ id: idSearch });
      }
      where.OR = orConditions;
    }
    return await prisma.order.count({ where });
  }

  public async hasUserPurchasedProduct(userId: number, productId: number) {
    const count = await prisma.orderItem.count({
      where: {
        productId: productId,
        order: {
          userId: userId,
          status: {
            not: OrderStatus.CANCELLED
          }
        }
      }
    });
    return count > 0;
  }
}
