import { Request, Response } from 'express'
import * as userService from '../services/user.service'
import { AuthRequest } from '../types/express';

export class UserController {
  // Admin only
  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res.json({
        message: "Lấy danh sách người dùng thành công",
        data: users
      });
    } catch (error: any) {
      console.error("Get all users error:", error);
      res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng" });
    }
  }

  public getUserDetail = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(Number(id));

      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      res.json({
        message: "Lấy chi tiết người dùng thành công",
        data: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          createdAt: user.createdAt
        }
      });
    } catch (error: any) {
      console.error("Get user detail error:", error);
      res.status(500).json({ message: "Lỗi khi lấy chi tiết người dùng" });
    }
  }

  public deleteUser = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const currentUserId = req.user!.userId;

      if (Number(id) === currentUserId) {
        return res.status(400).json({ message: "Bạn không thể tự xóa tài khoản admin của chính mình" });
      }

      await userService.deleteUser(Number(id));
      res.json({ message: "Xóa người dùng thành công" });
    } catch (error: any) {
      console.error("Delete user error:", error);
      res.status(500).json({ message: "Lỗi khi xóa người dùng" });
    }
  }
}
