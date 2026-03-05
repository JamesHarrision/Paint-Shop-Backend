import { ItemCollectionService } from "../services/item.collection.service";
import { AuthRequest } from "../types/express";
import { Request, Response } from "express";

export class ItemCollectionController {
  private itemCollectionService = new ItemCollectionService();

  public addItem = async (req: AuthRequest, res: Response) => {
    const { collectionId } = req.params;
    const { productId } = req.body;
    const userId = req.user!.userId;

    try {
      const newItem = await this.itemCollectionService.addItemToCollection(
        collectionId as string,
        productId as number,
        userId as number
      );
      res.status(201).json({ message: 'Thêm màu thành công', data: newItem });
    } catch (error: any) {
      if (error.message === 'COLLECTION_NOT_FOUND') return res.status(404).json({ error: 'Không tìm thấy collection' });
      else if (error.message === 'FORBIDDEN') return res.status(403).json({ error: 'Không có quyền truy cập collection này' });
      else if (error.message === 'PRODUCT_NOT_FOUND') return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      else if (error.message === 'ITEM_ALREADY_EXISTS') return res.status(400).json({ error: 'Màu này đã có trong collection' });
      else return res.status(500).json({ error: 'Lỗi server' });
    }
  }

  public removeItem = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { collectionId, productId } = req.params;
      const userId = req.user!.userId;
      await this.itemCollectionService.removeItemFromCollection(
        collectionId as string,
        Number.parseInt(productId as string),
        userId as number
      );
      res.status(200).json({ message: 'Xóa màu khỏi collection thành công' });
    } catch (error: any) {
      if (error.message === 'COLLECTION_NOT_FOUND') res.status(404).json({ error: 'Không tìm thấy collection' });
      else if (error.message === 'FORBIDDEN') res.status(403).json({ error: 'Không có quyền truy cập collection này' });
      else res.status(500).json({ error: 'Lỗi server' });
    }
  };

}