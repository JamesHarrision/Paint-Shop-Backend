import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { FindProductQuery } from "../interfaces/product.interface";

export class ProductRepository {
  public createProduct = async (data: Prisma.ProductCreateInput) => {
    return await prisma.product.create({
      data
    });
  }

  public getProductById = async (id: number) => {
    return await prisma.product.findUnique({
      where: { id: id }
    })
  }

  public findAndCount = async (query: FindProductQuery) => {
    let { page, limit, search, minPrice, maxPrice } = query;
    const skip = (Number(page) - 1) * Number(limit);

    const whereCondition: Prisma.ProductWhereInput = {
      deletedAt: null,
      AND: [
        search ? { name: { contains: search } } : {},
        minPrice ? { price: { gte: minPrice } } : {},
        maxPrice ? { price: { lte: maxPrice } } : {},
      ],
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereCondition,
        skip: skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }, // Mới nhất lên đầu
      }),
      prisma.product.count({ where: whereCondition }),
    ]);

    return { products, total }
  }

  public updateProduct = async (id: number, data: Prisma.ProductUpdateInput) => {
    return await prisma.product.update({
      where: { id: id },
      data
    });
  }

  public softDelete = async (id: number) => {
    return await prisma.product.update({
      where: { id: id },
      data: { deletedAt: new Date() }
    })
  }
}