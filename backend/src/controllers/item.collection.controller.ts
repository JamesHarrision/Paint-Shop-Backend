import { ItemCollectionService } from "../services/item.collection.service";
import { AuthRequest } from "../types/express";
import { Response } from "express";

export class ItemCollectionController {
  private itemCollectionService = new ItemCollectionService();

  public addItem = async (req: AuthRequest, res: Response) => {
    try {
      const { collectionId } = req.params;
      const { productId } = req.body;
      const userId = req.user!.userId;
      const isAdmin = req.user!.role === 'ADMIN';

      const newItem = await this.itemCollectionService.addItemToCollection(
        collectionId as string,
        Number(productId),
        userId,
        isAdmin
      );
      res.status(201).json({ 
        message: 'Thêm sản phẩm vào bộ sưu tập thành công', 
        data: newItem 
      });
    } catch (error: any) {
      console.error("Add item to collection error:", error.message);
      if (error.message === 'COLLECTION_NOT_FOUND') {
        res.status(404).json({ message: 'Không tìm thấy bộ sưu tập' });
      } else if (error.message === 'FORBIDDEN') {
        res.status(403).json({ message: 'Không có quyền truy cập bộ sưu tập này' });
      } else if (error.message === 'PRODUCT_NOT_FOUND') {
        res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
      } else if (error.message === 'ITEM_ALREADY_EXISTS') {
        res.status(400).json({ message: 'Sản phẩm này đã có trong bộ sưu tập' });
      } else {
        res.status(500).json({ message: 'Lỗi server khi thêm sản phẩm' });
      }
    }
  }

  public removeItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { collectionId, productId } = req.params;
      const userId = req.user!.userId;
      const isAdmin = req.user!.role === 'ADMIN';

      await this.itemCollectionService.removeItemFromCollection(
        collectionId as string,
        Number(productId),
        userId,
        isAdmin
      );
      res.status(200).json({ message: 'Xóa sản phẩm khỏi bộ sưu tập thành công' });
    } catch (error: any) {
      console.error("Remove item from collection error:", error.message);
      if (error.message === 'COLLECTION_NOT_FOUND') {
        res.status(404).json({ message: 'Không tìm thấy bộ sưu tập' });
      } else if (error.message === 'FORBIDDEN') {
        res.status(403).json({ message: 'Không có quyền truy cập bộ sưu tập này' });
      } else {
        res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm' });
      }
    }
  };
}