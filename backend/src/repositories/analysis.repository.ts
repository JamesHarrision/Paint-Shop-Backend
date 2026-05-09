import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export class AnalysisRepository {
  public async create(data: Prisma.AnalysisHistoryUncheckedCreateInput) {
    return await prisma.analysisHistory.create({
      data
    });
  }

  public async findAllByUserId(userId: number) {
    return await prisma.analysisHistory.findMany({
      where: { userId },
      select: {
        id: true,
        imageUrl: true,
        createdAt: true,
        result: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
