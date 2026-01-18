import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { AuthRequest } from "../types/express";

const SECRET_KEY = process.env.JWT_SECRET ||  'fallback_secret';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) : void => {
  // 1. Lấy token từ Header (Client gửi lên dạng: "Bearer <token>")
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({message: 'Access Denied. No token provided'});
    return;
  }

  // 2. Tách lấy phần token (bỏ chữ 'Bearer ')
  const token = authHeader.split(' ')[1];

  try {
    // 3. Xác thực token
    const decoded = jwt.verify(token, SECRET_KEY)  as { userId: number; role: string };

    // 4. Gán thông tin user vào request để các hàm sau dùng
    req.user = decoded;

    // 5. Cho phép đi tiếp
    next();
  }
  catch (error){
    res.status(403).json({message: 'Invalid or expired token'});
  }
} 