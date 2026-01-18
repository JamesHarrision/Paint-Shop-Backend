import { Request, Response, NextFunction } from "express";
import * as aiService from '../services/aiService'

export const getColorSugestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Kiểm tra file upload
    if(!req.file) {
       return res.status(400).json({ error: 'No file uploaded' });
    }

    // 2. Lấy thông tin file
    const imageBuffer = req.file.buffer; // Dữ liệu ảnh dạng nhị phân (RAM)
    const filename = req.file.originalname;

    //3. Gọi services để xử lý
    console.log(`Processing image: ${filename}...`);
    const result = await aiService.analyzeRoomColor(imageBuffer, filename);
    
    //4. Trả về kết quả
    return res.status(200).json({
      status: 'success',
      data: result,
    });

  } catch (error: any) {
    next(error);
  }
}