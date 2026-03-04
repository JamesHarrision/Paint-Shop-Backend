import { prisma } from "../config/prisma";

export class CollectionService {
  public createNewCollection = async (
    name: string,
    thumbnail: string,
    shortDesc: string,
    longDesc: string,
    userId: number,
  ) => {
    return await prisma.collection.create({
      data: {
        name,
        thumbnail,
        shortDesc,
        longDesc,
        userId: userId
      }
    })
  }

  public getAllCollectionByUserId = async (
    userId: number
  ) => {
    return await prisma.collection.findMany({
      where: {
        userId: userId
      },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            items: true
          }
        }
      }
    })
  }

  public getCollectionById = async (
    id: string
  ) => {
    return await prisma.collection.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            Product: true
          }
        }
      }
    });
  }

  public updateCollectionById = async (
    collectionId: string,
    name: string,
    thumbnail: string,
    shortDesc: string,
    longDesc: string,
    userId: number,
  ) => {
    const collection = await prisma.collection.findUnique({ where: { id: collectionId } });
    if (!collection) throw new Error('NOT_FOUND');
    if (collection.userId !== userId) throw new Error('FORBIDDEN');

    return await prisma.collection.update({
      where: {
        id: collectionId
      },
      data: {
        name,
        thumbnail,
        shortDesc,
        longDesc,
        userId
      }
    })
  }

  public deleteCollectionById = async (
    collectionId: string,
    userId: number
  ) => {
    const collection = await prisma.collection.findUnique({ where: { id: collectionId } });
    if (!collection) throw new Error('NOT_FOUND');
    if (collection.userId !== userId) throw new Error('FORBIDDEN');

    return await prisma.collection.delete({
      where: {
        id: collectionId
      }
    })
  }
}