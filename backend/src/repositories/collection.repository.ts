import { prisma } from "../config/prisma";

export class CollectionRepository {
  public async create(data: {
    name: string;
    thumbnail?: string;
    shortDesc?: string;
    longDesc?: string;
    userId: number;
  }) {
    return await prisma.collection.create({
      data
    });
  }

  public async findAllByUserId(userId: number) {
    return await prisma.collection.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
        _count: {
          select: {
            items: true
          }
        }
      }
    });
  }

  public async findById(id: string) {
    return await prisma.collection.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
  }

  public async update(id: string, data: {
    name?: string;
    thumbnail?: string;
    shortDesc?: string;
    longDesc?: string;
  }) {
    return await prisma.collection.update({
      where: { id },
      data
    });
  }

  public async findAllPublic() {
    return await prisma.collection.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, fullName: true, email: true }
        },
        _count: {
          select: { items: true }
        }
      }
    });
  }

  public async findAll() {
    return await prisma.collection.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, fullName: true, email: true } },
        _count: { select: { items: true } }
      }
    });
  }

  public async delete(id: string) {
    return await prisma.collection.delete({
      where: { id }
    });
  }
}
