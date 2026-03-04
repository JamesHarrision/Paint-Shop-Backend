import { Request, Response } from "express";
import { AuthRequest } from "../types/express";
import { sanitizeHtml } from "../utils/sanitize.html";
import { CollectionService } from "../services/collection.service";

const collectionService = new CollectionService();

export class CollectionController {
  public createCollection = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    let { name, longDesc, shortDesc } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    let thumbnailUrl = '';
    // Nếu có file ảnh gửi lên (qua Multer/Cloudinary middleware)
    if (req.file) {
      thumbnailUrl = req.file.path;
    }
    // Sanitize chuỗi HTML từ TinyMCE để chống XSS
    longDesc = sanitizeHtml(longDesc);

    try {
      const newCollection = await collectionService.createNewCollection(
        name,
        thumbnailUrl,
        shortDesc,
        longDesc,
        userId
      )

      return res.status(201).json({ message: 'Tạo collection thành công', data: newCollection });
    } catch (error: any) {
      console.error('Error creating collection:', error);
      res.status(500).json({ error: 'Lỗi server khi tạo collection' });
    }

  }

  public getMyCollections = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
      const collections = await collectionService.getAllCollectionByUserId(userId);
      res.status(200).json({ data: collections });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi server khi lấy danh sách collection' });
    }
  }

  public getCollectionById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.userId

    try {
      const collection = await collectionService.getCollectionById(id as string);

      if (!collection) {
        return res.status(404).json({ error: 'Không tìm thấy collection' });
      }

      if (collection.userId !== userId) {
        return res.status(403).json({ error: "Không có quyền xem collection của người khác" })
      }

      res.status(200).json({ data: collection });
    } catch (error: any) {
      res.status(500).json({ error: 'Lỗi server khi lấy chi tiết collection' });
    }
  }

  
}