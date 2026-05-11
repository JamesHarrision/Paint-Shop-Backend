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
  console.log(`[RoleCheck] Checking if user ${req.user.userId} has role ADMIN. Current role: ${req.user.role}`);
  if (req.user.role !== Role.ADMIN) {
    console.warn(`[RoleCheck] Access denied for user ${req.user.userId}. Role ${req.user.role} is not ADMIN`);
    res.status(403).json({ message: 'Access denied. Admin only.' });
    return; 
  }

  console.log(`=> OK: User ${req.user.userId} is Admin, proceeding.`);
  next(); 
};