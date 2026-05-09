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

  public async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id }
    });
  }

  public async findAll() {
    return await prisma.user.findMany({
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
}