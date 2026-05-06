import { prisma } from '../config/prisma'
import { Prisma, Product } from '@prisma/client'
import redis from '../config/redis'
import { redisUtil } from '../utils/cacheUtils'
import { ProductRepository } from '../repositories/productRepository'
import { FindProductQuery } from '../interfaces/product.interface'

const productRepo = new ProductRepository();

export const createProduct = async (data: Prisma.ProductCreateInput) => {
  await redis.del('product:color-lookup');
  return await productRepo.createProduct(data);
};

export const getProductById = async (id: number) => {
  const product = await redisUtil.getOrSetCache<Product | null>(
    `product:${id}`,
    60,
    async (): Promise<Product | null> => {
      return await productRepo.getProductById(id)
    }
  )
  if (!product) throw new Error('Product not found');
  return product;
}

export const getProducts = async (params: FindProductQuery) => {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const search = params.search?.trim() || '';
  const minPrice = params.minPrice ? Number(params.minPrice) : 0;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : 1e9;

  const cacheKey = `product:p${page}:l${limit}:s=${search}:min=${minPrice}:max=${maxPrice}`;

  const result = await redisUtil.getOrSetCache(
    cacheKey,
    60,
    async () => {
      const { products, total } = await productRepo.findAndCount({
        page: page,
        limit: limit,
        minPrice,
        maxPrice,
        search
      });

      return {
        data: products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    }
  );
  return result;
}

export const updateProduct = async (id: number, data: Prisma.ProductUpdateInput) => {
  await getProductById(id);

  const updatedProduct = await productRepo.updateProduct(id, data);

  await redis.del(`product:${id}`);

  await redis.del('product:color-lookup');

  return updatedProduct;
}

export const deleteProduct = async (id: number) => {
  await productRepo.softDelete(id);
  await redis.del(`product:${id}`);
}