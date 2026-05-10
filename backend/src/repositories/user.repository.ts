import { prisma } from "../config/prisma"
import { CreateUserDTO } from "../interfaces/user.interface"

export class UserRepository {
  public getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
      where: { email: email }
    })
  }

  public getUserById = async (id: number) => {
    return await prisma.user.findUnique({
      where: { id }
    })
  }

  public createUser = async (data: CreateUserDTO) => {
    return await prisma.user.create({
      data: data,
      select: {
        id: true,
        email: true,
        fullName: true,
        createdAt: true
      }
    })
  }

  public updateUserPassword = async (email: string, hashedPassword: string) => {
    return await prisma.user.update({
      where: { email: email },
      data: {
        password: hashedPassword
      }
    })
  }

  public async update(id: number, data: any) {
    return await prisma.user.update({
      where: { id },
      data: data,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true
      }
    });
  }

  public async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id }
    });
  }

  public async findAll(skip?: number, take?: number) {
    return await prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  public async countAll() {
    return await prisma.user.count();
  }
}