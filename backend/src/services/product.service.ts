import { Prisma, Product } from '@prisma/client'
import redis from '../config/redis'
import { redisUtil } from '../utils/cache.util'
import { ProductRepository } from '../repositories/product.repository'
import { FindProductQuery } from '../interfaces/product.interface'

export class ProductService {
  private productRepo = new ProductRepository();

  public createProduct = async (data: Prisma.ProductCreateInput) => {
    await redis.del('product:color-lookup');
    return await this.productRepo.createProduct(data);
  };

  public getProductById = async (id: number) => {
    const product = await redisUtil.getOrSetCache<Product | null>(
      `product:${id}`,
      60,
      async (): Promise<Product | null> => {
        return await this.productRepo.getProductById(id)
      }
    )
    if (!product) return null;
    return product;
  }

  public getProducts = async (params: FindProductQuery) => {
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const search = params.search?.trim() || '';
    const minPrice = params.minPrice ? Number(params.minPrice) : 0;
    const maxPrice = params.maxPrice ? Number(params.maxPrice) : 1e9;

    const cacheKey = `product:p${page}:l${limit}:s=${search}:min=${minPrice}:max=${maxPrice}`;

    return await redisUtil.getOrSetCache(
      cacheKey,
      60,
      async () => {
        const { products, total } = await this.productRepo.findAndCount({
          page,
          limit,
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
  }

  public updateProduct = async (id: number, data: Prisma.ProductUpdateInput) => {
    const existing = await this.getProductById(id);
    if (!existing) throw new Error('PRODUCT_NOT_FOUND');

    const updatedProduct = await this.productRepo.updateProduct(id, data);

    await redis.del(`product:${id}`);
    await redis.del('product:color-lookup');

    return updatedProduct;
  }

  public deleteProduct = async (id: number) => {
    await this.productRepo.softDelete(id);
    await redis.del(`product:${id}`);
  }
}