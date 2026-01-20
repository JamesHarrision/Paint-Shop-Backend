import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/express";
import { Role } from "@prisma/client";

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // Kiểm tra user có tồn tại
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized. Please login first.' });
    return; 
  }

  // So sánh với enum Role.ADMIN thay vì string
  if (req.user.role !== Role.ADMIN) {
    res.status(403).json({ message: 'Access denied. Admin only.' });
    return; 
  }

  console.log("=> OK: Là Admin, cho qua next()");
  next(); 
};