import { Request } from "express";

// Mở rộng interface Request của Express
export interface AuthRequest extends Request {
  user? :{
    userId: number;
    role: string;
  }
}