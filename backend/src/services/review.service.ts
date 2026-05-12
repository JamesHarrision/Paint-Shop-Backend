import { prisma } from '../config/prisma'
import { ReviewRepository } from '../repositories/review.repository';
import { ProductRepository } from '../repositories/product.repository';
import { ProductService } from './product.service';

import { OrderRepository } from '../repositories/order.repository';

export class ReviewService {
  private reviewRepo = new ReviewRepository();
  private productRepo = new ProductRepository();
  private productService = new ProductService();
  private orderRepo = new OrderRepository();

  private updateProductRating = async (tx: any, productId: number) => {
    const aggregation = await this.reviewRepo.aggregateRating(productId, tx);

    const avgRating = aggregation._avg.rating ? Number(aggregation._avg.rating.toFixed(1)) : 0;
    const count = aggregation._count;

    const result = await this.productRepo.updateProduct(productId, {
      reviewCount: count,
      averageRating: avgRating
    }, tx);

    await this.productService.incrementProductVersion();
    return result;
  }

  public createReview = async (
    userId: number,
    productId: number,
    data: { rating: number; comment?: string; images?: string[] }
  ) => {
    return await prisma.$transaction(async (tx) => {
      const product = await this.productRepo.getProductById(productId);
      if (!product) throw new Error('PRODUCT_NOT_FOUND');

      const hasPurchased = await this.orderRepo.hasUserPurchasedProduct(userId, productId);
      if (!hasPurchased) throw new Error('NOT_PURCHASED');

      const review = await this.reviewRepo.create({
        userId,
        productId,
        rating: data.rating,
        comment: data.comment,
        images: data.images || [],
      }, tx);

      await this.updateProductRating(tx, productId);

      return review;
    });
  };

  public getProductReview = async (
    productId: number,
    page: number = 1,
    limit: number = 10
  ) => {
    const skip = (page - 1) * limit;
    const [reviews, total] = await this.reviewRepo.findAndCount(productId, skip, limit);

    return {
      reviews,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  public updateReview = async (
    reviewId: string,
    userId: number,
    data: { rating?: number; comment?: string; images?: string[] }
  ) => {
    return await prisma.$transaction(async (tx) => {
      const review = await this.reviewRepo.findById(reviewId);
      if (!review) throw new Error('REVIEW_NOT_FOUND');
      if (review.userId !== userId) throw new Error('FORBIDDEN');

      const updatedReview = await this.reviewRepo.update(reviewId, {
        rating: data.rating,
        comment: data.comment,
        images: data.images,
      }, tx);

      if (data.rating) {
        await this.updateProductRating(tx, updatedReview.productId);
      }

      return updatedReview;
    });
  }

  public deleteReview = async (reviewId: string, userId: number) => {
    return await prisma.$transaction(async (tx) => {
      const review = await this.reviewRepo.findById(reviewId);
      if (!review) throw new Error('REVIEW_NOT_FOUND');
      if (review.userId !== userId) throw new Error('FORBIDDEN');

      await this.reviewRepo.delete(reviewId, tx);
      await this.updateProductRating(tx, review.productId);

      return true;
    });
  };
}