import { prisma } from "../config/prisma";

export class ItemCollectionService {

  public addItemToCollection = async (
    collectionId: string,
    productId: number,
    userId: number
  ) => {
    // 1. Kiểm tra collection có tồn tại và thuộc về user không
    const collection = await prisma.collection.findFirst({
      where: { id: collectionId }
    })
    if (!collection) throw new Error('COLLECTION_NOT_FOUND');
    if (collection.userId !== userId) throw new Error('FORBIDDEN');

    // 2. Kiểm tra product có tồn tại không
    const product = await prisma.product.findFirst({
      where: { id: productId }
    });
    if (!product) throw new Error('PRODUCT_NOT_FOUND');

    // 3. Thêm item
    try {
      await prisma.collectionItem.create({
        data: {
          collectionId,
          productId
        }
      })
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
    const collection = await prisma.collection.findUnique({ where: { id: collectionId } });
    if (!collection) throw new Error('COLLECTION_NOT_FOUND');
    if (collection.userId !== userId) throw new Error('FORBIDDEN');

    // Xóa dựa trên compound unique key (collectionId_productId)
    return await prisma.collectionItem.delete({
      where: {
        collectionId_productId: { collectionId, productId }
      }
    });
  }
}