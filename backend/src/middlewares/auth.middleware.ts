import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/express";
import { verifyAccessToken } from "../utils/jwt.util";
import { redisUtil } from "../utils/cache.util";

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string;

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  // 1. Lấy token từ Header (Client gửi lên dạng: "Bearer <token>")
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access Denied. No token provided' });
    return;
  }

  // 2. Tách lấy phần token (bỏ chữ 'Bearer ')
  const token = authHeader.split(' ')[1];

  const isBlacklisted = await redisUtil.isBlacklisted(token);
  if (isBlacklisted) {
    res.status(401).json({ message: 'Token has been revoked (Logged out)' });
    return;
  }

  try {
    // 3. Xác thực token
    const decoded = verifyAccessToken(token);

    // 4. Gán thông tin user vào request để các hàm sau dùng
    req.user = decoded;

    // 5. Cho phép đi tiếp
    next();
  }
  catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
} 