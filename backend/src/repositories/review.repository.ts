import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export class ReviewRepository {
  public async create(data: Prisma.ReviewUncheckedCreateInput, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return await client.review.create({
      data
    });
  }

  public async findUnique(userId: number, productId: number) {
    return await prisma.review.findUnique({
      where: {
        userId_productId: { userId, productId }
      }
    });
  }

  public async findById(id: string) {
    return await prisma.review.findUnique({
      where: { id }
    });
  }

  public async findAndCount(productId: number, skip: number, limit: number) {
    return await Promise.all([
      prisma.review.findMany({
        where: { productId },
        skip: skip,
        take: limit,
        include: {
          user: { select: { id: true, fullName: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.review.count({ where: { productId } })
    ]);
  }

  public async update(id: string, data: Prisma.ReviewUpdateInput, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return await client.review.update({
      where: { id },
      data
    });
  }

  public async delete(id: string, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return await client.review.delete({
      where: { id }
    });
  }

  public async aggregateRating(productId: number, tx?: Prisma.TransactionClient) {
    const client = tx || prisma;
    return await client.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: true
    });
  }
}
