import { Response, Request } from "express";
import { AuthRequest } from "../types/express";
import { sanitizeHtml } from "../utils/sanitize.html";
import { CollectionService } from "../services/collection.service";

const collectionService = new CollectionService();

export class CollectionController {
  public async createCollection(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.userId;
      let { name, longDesc, shortDesc } = req.body;

      const thumbnailUrl = req.file ? req.file.path : '';

      if (longDesc) {
        longDesc = sanitizeHtml(longDesc);
      }

      const newCollection = await collectionService.createNewCollection(
        name,
        thumbnailUrl,
        shortDesc,
        longDesc,
        userId
      );

      return res.status(201).json({
        message: 'Tạo collection thành công',
        data: newCollection
      });

    } catch (error: any) {
      console.error('Error creating collection:', error);
      res.status(500).json({ message: 'Lỗi server khi tạo collection' });
    }
  }

  public getMyCollections = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.userId;
      const collections = await collectionService.getAllCollectionByUserId(userId);
      res.status(200).json({ data: collections });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server khi lấy danh sách collection' });
    }
  }

  public getPublicCollections = async (req: Request, res: Response) => {
    try {
      const collections = await collectionService.getAllPublicCollections();
      res.status(200).json({ data: collections });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server khi lấy danh sách bộ sưu tập cộng đồng' });
    }
  }

  public getAllCollectionsForAdmin = async (req: Request, res: Response) => {
    try {
      const collections = await collectionService.getAllCollectionsForAdmin();
      res.status(200).json({ data: collections });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server khi lấy danh sách bộ sưu tập cho Admin' });
    }
  }

  public getCollectionById = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const collection = await collectionService.getCollectionById(id as string);

      if (!collection) {
        return res.status(404).json({ message: 'Không tìm thấy bộ sưu tập' });
      }

      res.status(200).json({ data: collection });
    } catch (error: any) {
      res.status(500).json({ message: 'Lỗi server khi lấy chi tiết bộ sưu tập' });
    }
  }

  public updateCollectionById = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      const isAdmin = req.user!.role === 'ADMIN';
      let { name, longDesc, shortDesc } = req.body;

      const thumbnailUrl = req.file ? req.file.path : '';

      if (longDesc) {
        longDesc = sanitizeHtml(longDesc);
      }

      const updatedCollection = await collectionService.updateCollectionById(
        id as string,
        name,
        thumbnailUrl,
        shortDesc,
        longDesc,
        userId,
        isAdmin
      );

      return res.status(200).json({
        message: "Cập nhật bộ sưu tập thành công",
        data: updatedCollection
      });

    } catch (error: any) {
      console.error("Error updating collection:", error);

      if (error.message === 'NOT_FOUND') {
        return res.status(404).json({ message: 'Không tìm thấy bộ sưu tập' });
      }
      if (error.message === 'FORBIDDEN') {
        return res.status(403).json({ message: 'Không có quyền chỉnh sửa bộ sưu tập này' });
      }

      return res.status(500).json({ message: "Lỗi server khi cập nhật bộ sưu tập" });
    }
  }

  public deleteCollectionById = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      const isAdmin = req.user!.role === 'ADMIN';

      const deletedCollection = await collectionService.deleteCollectionById(id as string, userId, isAdmin);

      return res.status(200).json({
        message: "Xóa bộ sưu tập thành công",
        data: deletedCollection
      });

    } catch (error: any) {
      console.error("Error deleting collection:", error);

      if (error.message === 'NOT_FOUND') {
        return res.status(404).json({ message: 'Không tìm thấy bộ sưu tập' });
      }
      if (error.message === 'FORBIDDEN') {
        return res.status(403).json({ message: 'Không có quyền xóa bộ sưu tập này' });
      }

      return res.status(500).json({ message: "Lỗi server khi xóa bộ sưu tập" });
    }
  }
}