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

  public async findAllByUserId(userId: number) {
    return await prisma.order.findMany({
      where: { userId },
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
}
