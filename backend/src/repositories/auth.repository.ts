import { prisma } from "../config/prisma";


export class AuthRepository {
  public async saveRefreshToken(userId: number, token: string, expiresAt: Date) {
    return await prisma.refreshToken.create({
      data: { userId, token, expiresAt }
    })
  }

  public async findValidRefreshToken(token: string) {
    return await prisma.refreshToken.findUnique({
      where: {
        token: token,
        expiresAt: { gt: new Date() }
      }
    })
  }

  public async deleteToken(token: string) {
    return await prisma.refreshToken.delete({
      where: { token: token }
    })
  }
}