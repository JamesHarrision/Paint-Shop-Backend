import { Request, Response } from 'express'
import * as userService from '../services/user.service'
import { AuthRequest } from '../types/express';

export class UserController {
  public getProfile = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.userId;
      const user = await userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy thông tin người dùng" });
      }

      res.json({
        message: "Lấy thông tin cá nhân thành công",
        data: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server khi lấy thông tin cá nhân" });
    }
  }

  public updateProfile = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.userId;
      const { fullName } = req.body;

      if (!fullName) {
        return res.status(400).json({ message: "Họ tên không được để trống" });
      }

      const updatedUser = await userService.updateUser(userId, { fullName });

      res.json({
        message: "Cập nhật thông tin thành công",
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật thông tin" });
    }
  }

  public changePassword = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.userId;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ mật khẩu cũ và mới" });
      }

      await userService.changePassword(userId, currentPassword, newPassword);

      res.json({ message: "Đổi mật khẩu thành công" });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Lỗi khi đổi mật khẩu" });
    }
  }

  // Admin only
  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await userService.getAllUsers(page, limit);
      res.json({
        message: "Lấy danh sách người dùng thành công",
        ...result
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
