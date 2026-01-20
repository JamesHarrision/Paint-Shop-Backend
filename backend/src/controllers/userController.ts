import { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { json } from 'node:stream/consumers';
import { stat } from 'node:fs';

//Admin only
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
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
    res.json({
      status: "Get all user successfully",
      data: {
        users
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching user . . ." });
  }
}

export const getUserDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.json({
      status: "Get user detail successfully",
      data: {
        user
      }
    });
  } catch {
    res.status(500).json({ message: "Error fetching user detail" });
  }
}
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const currentUser = (req as any).user;
    if (currentUser && Number(id) === currentUser.id) {
      return res.status(400).json({ message: "Cannot delete your own admin account" });
    }

    await prisma.user.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({ message: "Delete user successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting user" });
  }
}
