import { prisma } from "../config/prisma";

export class CollectionItemRepository {
  public async create(collectionId: string, productId: number) {
    return await prisma.collectionItem.create({
      data: {
        collectionId,
        productId
      }
    });
  }

  public async delete(collectionId: string, productId: number) {
    return await prisma.collectionItem.delete({
      where: {
        collectionId_productId: { collectionId, productId }
      }
    });
  }

  public async findUnique(collectionId: string, productId: number) {
    return await prisma.collectionItem.findUnique({
      where: {
        collectionId_productId: { collectionId, productId }
      }
    });
  }
}
