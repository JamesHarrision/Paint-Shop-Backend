import { CollectionRepository } from "../repositories/collection.repository";

export class CollectionService {
  private collectionRepo = new CollectionRepository();

  public createNewCollection = async (
    name: string,
    thumbnail: string,
    shortDesc: string,
    longDesc: string,
    userId: number,
  ) => {
    return await this.collectionRepo.create({
      name,
      thumbnail,
      shortDesc,
      longDesc,
      userId
    });
  }

  public getAllCollectionByUserId = async (
    userId: number
  ) => {
    return await this.collectionRepo.findAllByUserId(userId);
  }

  public getAllPublicCollections = async () => {
    return await this.collectionRepo.findAllPublic();
  }

  public getAllCollectionsForAdmin = async () => {
    return await this.collectionRepo.findAll();
  }

  public getCollectionById = async (
    id: string
  ) => {
    return await this.collectionRepo.findById(id);
  }

  public updateCollectionById = async (
    collectionId: string,
    name: string,
    thumbnail: string,
    shortDesc: string,
    longDesc: string,
    userId: number,
    isAdmin: boolean = false
  ) => {
    const collection = await this.collectionRepo.findById(collectionId);
    if (!collection) throw new Error('NOT_FOUND');
    if (collection.userId !== userId && !isAdmin) throw new Error('FORBIDDEN');

    return await this.collectionRepo.update(collectionId, {
      name,
      thumbnail,
      shortDesc,
      longDesc
    });
  }

  public deleteCollectionById = async (
    collectionId: string,
    userId: number,
    isAdmin: boolean = false
  ) => {
    const collection = await this.collectionRepo.findById(collectionId);
    if (!collection) throw new Error('NOT_FOUND');
    if (collection.userId !== userId && !isAdmin) throw new Error('FORBIDDEN');

    return await this.collectionRepo.delete(collectionId);
  }
}