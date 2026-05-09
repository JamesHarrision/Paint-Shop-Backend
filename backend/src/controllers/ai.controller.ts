import { Response, NextFunction } from "express";
import { AiService } from '../services/ai.service'
import { AuthRequest } from "../types/express";

export class AiController {
  private aiService = new AiService();

  public getColorSugestion = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Vui lòng upload ảnh để phân tích' });
      }

      const userId = req.user!.userId;
      const filePath = req.file.path;

      const result = await this.aiService.analyzeRoomColor(filePath, userId);

      return res.status(200).json({
        status: 'success',
        message: 'Phân tích màu sắc thành công',
        data: result,
      });

    } catch (error: any) {
      next(error);
    }
  }

  public getHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const history = await this.aiService.getHistoryByUserId(userId);
      
      res.status(200).json({
        status: 'success',
        data: history
      });

    } catch (error: any) {
      next(error);
    }
  }
}