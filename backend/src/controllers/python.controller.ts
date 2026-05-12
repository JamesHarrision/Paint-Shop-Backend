import { Response, NextFunction } from "express";
import { PythonService } from '../services/python.service'
import { AuthRequest } from "../types/express";

export class PythonController {
  private pythonService = new PythonService();

  public getColorSugestion = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Vui lòng upload ảnh để phân tích' });
      }

      const userId = req.user!.userId;
      const filePath = req.file.path;

      const result = await this.pythonService.analyzeRoomColor(filePath, userId);

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
      const history = await this.pythonService.getHistoryByUserId(userId);
      
      res.status(200).json({
        status: 'success',
        data: history
      });

    } catch (error: any) {
      next(error);
    }
  }
}