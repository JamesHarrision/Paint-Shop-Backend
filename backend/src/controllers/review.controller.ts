import { Request, Response } from "express";
import { AuthRequest } from "../types/express";

import { ReviewService } from "../services/review.service";

export class ReviewController {

  private reviewService = new ReviewService();

  public createReview = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;
      const { rating, comment } = req.body;

      // Validate rating
      if (!rating || isNaN(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
        res.status(400).json({ error: 'Rating phải là một số từ 1 đến 5' });
        return;
      }

      // Xử lý mảng ảnh tải lên từ Multer/Cloudinary
      const imageUrls: string[] = [];
      if (req.files && Array.isArray(req.files)) {
        for (const file of req.files) {
          imageUrls.push(file.path);
        }
      }

      const review = await this.reviewService.createReview(
        req.user!.userId as number,
        Number(productId),
        {
          rating,
          comment,
          images: imageUrls,
        }
      );

      res.status(201).json({ message: 'Đánh giá sản phẩm thành công', data: review });
    } catch (error: any) {
      if (error.code === 'P2002') res.status(400).json({ error: 'Bạn đã đánh giá sản phẩm này rồi' });
      else if (error.message === 'PRODUCT_NOT_FOUND') res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      else res.status(500).json({ error: 'Lỗi server khi tạo đánh giá' });
    }
  };

  public getProductReviews = async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const data = await this.reviewService.getProductReview(
        Number(productId),
        page,
        limit);
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi server khi lấy danh sách đánh giá' });
    }
  };

  public updateReview = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { rating, comment } = req.body;

      if (rating && (isNaN(Number(rating)) || Number(rating) < 1 || Number(rating) > 5)) {
        res.status(400).json({ error: 'Rating phải là một số từ 1 đến 5' });
        return;
      }

      let imageUrls: string[] | undefined = undefined;
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        imageUrls = [];
        for (const file of req.files) {
          imageUrls.push(file.path);
        }
      }

      const review = await this.reviewService.updateReview(
        id as string,
        req.user!.userId as number,
        {
          rating,
          comment,
          images: imageUrls
        }
      );

      res.status(200).json({ message: 'Cập nhật đánh giá thành công', data: review });
    } catch (error: any) {
      if (error.message === 'REVIEW_NOT_FOUND') res.status(404).json({ error: 'Không tìm thấy đánh giá' });
      else if (error.message === 'FORBIDDEN') res.status(403).json({ error: 'Bạn không có quyền sửa đánh giá này' });
      else res.status(500).json({ error: 'Lỗi server' });
    }
  };

  public deleteReview = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.reviewService.deleteReview(
        id as string,
        req.user!.userId);
      res.status(200).json({ message: 'Xóa đánh giá thành công' });
    } catch (error: any) {
      if (error.message === 'REVIEW_NOT_FOUND') res.status(404).json({ error: 'Không tìm thấy đánh giá' });
      else if (error.message === 'FORBIDDEN') res.status(403).json({ error: 'Bạn không có quyền xóa đánh giá này' });
      else res.status(500).json({ error: 'Lỗi server' });
    }
  };

}