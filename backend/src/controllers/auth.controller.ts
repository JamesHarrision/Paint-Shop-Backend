import { Request, Response } from "express";
import * as userService from '../services/user.service';
import { AuthRequest } from "../types/express";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;
    const user = await userService.registerUser(email, password, fullName);
    res.status(201).json({
      message: 'User registered successfully',
      data: user
    });
  } catch (error: any) {
    console.log(`Register error:`, error);
    if (error.message === 'EMAIL_EXISTS') {
      res.status(409).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.status(200).json({
      message: 'Login successfully',
      data: result
    });
  }
  catch (error: any) {
    console.log(`Login error:`, error);
    res.status(401).json({
      message: error.message || 'Login failed'
    });
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await userService.forgetPassword(email);
    return res.status(200).json({ message: "Đã gửi email đổi mật khẩu" })
  } catch (error: any) {
    console.log("Forgot password error:", error);
    return res.status(500).json({ message: "Lỗi ở server" });
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const result = await userService.resetPassword(token, newPassword);
    return res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error: any) {
    console.log(`Reset password error:`, error);
    return res.status(500).json({ message: "Lỗi ở server" });
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const data = await userService.refreshToken(refreshToken);
    return res.status(200).json({
      message: "Refresh token successfully",
      data
    })
  } catch (error: any) {
    if (error.message === "INVALID_TOKEN") {
      return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" })
    } else if (error.message === "REFRESH_TOKEN_NOT_FOUND") {
      return res.status(404).json({ message: "Token không tồn tại trong hệ thống" })
    } else if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "Người dùng không tồn tại" })
    }
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader!.split(' ')[1]; // Lấy từ header
    const { refreshToken } = req.body;

    await userService.logout(accessToken, refreshToken);
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getMe = async (req: AuthRequest, res: Response) => {
  const currentUser = req.user
  if (!currentUser) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  res.status(200).json({
    message: 'This is your profile data',
    user: currentUser
  });
}
