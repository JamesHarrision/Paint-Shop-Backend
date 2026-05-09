import { CollectionRepository } from "../repositories/collection.repository";
import { ProductRepository } from "../repositories/product.repository";
import { CollectionItemRepository } from "../repositories/collection.item.repository";

export class ItemCollectionService {
  private collectionRepo = new CollectionRepository();
  private productRepo = new ProductRepository();
  private itemRepo = new CollectionItemRepository();

  public addItemToCollection = async (
    collectionId: string,
    productId: number,
    userId: number
  ) => {
    // 1. Kiểm tra collection có tồn tại và thuộc về user không
    const collection = await this.collectionRepo.findById(collectionId);
    if (!collection) throw new Error('COLLECTION_NOT_FOUND');
    if (collection.userId !== userId) throw new Error('FORBIDDEN');

    // 2. Kiểm tra product có tồn tại không
    const product = await this.productRepo.getProductById(productId);
    if (!product) throw new Error('PRODUCT_NOT_FOUND');

    // 3. Thêm item
    try {
      return await this.itemRepo.create(collectionId, productId);
    } catch (error: any) {
      if (error.code === 'P2002') throw new Error('ITEM_ALREADY_EXISTS');
      throw error;
    }
  }

  public removeItemFromCollection = async (
    collectionId: string,
    productId: number,
    userId: number,
  ) => {
    const collection = await this.collectionRepo.findById(collectionId);
    if (!collection) throw new Error('COLLECTION_NOT_FOUND');
    if (collection.userId !== userId) throw new Error('FORBIDDEN');

    try {
      return await this.itemRepo.delete(collectionId, productId);
    } catch (error: any) {
      if (error.code === 'P2025') return null; // Đã xóa hoặc không tồn tại
      throw error;
    }
  }
}