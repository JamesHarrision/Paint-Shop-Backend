import { Prisma, Product } from '@prisma/client'
import redis from '../config/redis'
import { redisUtil } from '../utils/cache.util'
import { ProductRepository } from '../repositories/product.repository'
import { FindProductQuery } from '../interfaces/product.interface'

export class ProductService {
  private productRepo = new ProductRepository();

  private async getProductCacheVersion() {
    const version = await redis.get('product:version');
    if (!version) {
      await redis.set('product:version', 1);
      return '1';
    }
    return version;
  }

  public async incrementProductVersion() {
    await redis.incr('product:version');
  }

  public createProduct = async (data: Prisma.ProductCreateInput) => {
    const result = await this.productRepo.createProduct(data);
    await this.incrementProductVersion();
    return result;
  };

  public getProductById = async (id: number) => {
    const version = await this.getProductCacheVersion();
    const product = await redisUtil.getOrSetCache<Product | null>(
      `product:${id}:v${version}`,
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

    const version = await this.getProductCacheVersion();
    const cacheKey = `product:v${version}:p${page}:l${limit}:s=${search}:min=${minPrice}:max=${maxPrice}`;

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
    await this.incrementProductVersion();

    return updatedProduct;
  }

  public deleteProduct = async (id: number) => {
    await this.productRepo.softDelete(id);
    await this.incrementProductVersion();
  }
}