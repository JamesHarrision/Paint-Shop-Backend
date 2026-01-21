import { Response, NextFunction } from "express";
import * as aiService from '../services/aiService'
import { AuthRequest } from "../types/express";

export const getColorSugestion = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // 1. Kiểm tra file upload
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // 2. Lấy User ID từ Token (Đã qua middleware authenticate)
    const userId = req?.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    // 3. Lấy đường dẫn file từ Disk Storage
    const filePath = req.file.path;

    // 4. Gọi services xử lý & lưu DB
    // console.log(`Processing image for User ${userId}: ${filePath}...`);
    const result = await aiService.analyzeRoomColor(filePath, userId);

    //5. Trả về kết quả
    return res.status(200).json({
      status: 'success',
      data: result,
    });

  } catch (error: any) {
    next(error);
  }
}

export const getHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    const userId = req?.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized user' });
      return;
    }

    const history = await aiService.getHistoryByUserId(userId);
    res.status(200).json({
      status: 'success',
      data: history
    })

  } catch (error: any) {
    next(error);
  }
}