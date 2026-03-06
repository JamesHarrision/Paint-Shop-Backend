import { prisma } from '../config/prisma'

export class ReviewService {

  // Hàm helper dùng chung để tính toán và cập nhật lại Rating cho Product
  public updateProductRating = async (
    tx: any,
    productId: number
  ) => {
    const aggregation = await tx.review.aggregate({
      where: {
        productId: productId
      },
      _avg: { rating: true },
      _count: true
    });

    const avgRating = aggregation._avg.rating ? (Number(aggregation._avg.rating).toFixed(1)) : 0;
    const count = aggregation._count;

    return await tx.product.update({
      where: { id: productId },
      data: {
        reviewCount: count,
        averageRating: Number(avgRating)
      }
    })
  }

  public createReview = async (
    userId: number,
    productId: number,
    data: any) => {
    // Dùng transaction để đảm bảo tính toàn vẹn dữ liệu
    return await prisma.$transaction(async (tx) => {
      // 1. Kiểm tra sản phẩm có tồn tại không
      const product = await tx.product.findUnique({ where: { id: productId } });
      if (!product) throw new Error('PRODUCT_NOT_FOUND');

      // 2. Tạo review (nếu user đã review rồi, Prisma sẽ quăng lỗi P2002 do constraint @@unique)
      const review = await tx.review.create({
        data: {
          userId,
          productId,
          rating: Number(data.rating),
          comment: data.comment,
          images: data.images || [],
        },
      });

      // 3. Cập nhật lại averageRating và reviewCount của Product
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

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { productId },
        skip: skip,
        take: limit,
        include: {
          User: { select: { id: true, fullName: true } }
        }
      }),
      prisma.review.count({ where: { productId: productId } })
    ])


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
    data: any
  ) => {
    return await prisma.$transaction(async (tx) => {
      const review = await tx.review.findUnique({ where: { id: reviewId } });
      if (!review) throw new Error('REVIEW_NOT_FOUND');
      if (review.userId !== userId) throw new Error('FORBIDDEN')

      const updatedReview = await tx.review.update({
        where: { id: reviewId },
        data: {
          rating: data.rating ? Number(data.rating) : review.rating,
          comment: data.comment !== undefined ? data.comment : review.comment,
          images: data.images ? data.images : review.images,
        }
      });

      if (data.rating) {
        await this.updateProductRating(
          tx,
          updatedReview.productId as number)
      }

      return updatedReview;
    });
  }

  public deleteReview = async (
    reviewId: string,
    userId: number) => {
    return await prisma.$transaction(async (tx) => {
      const review = await tx.review.findUnique({ where: { id: reviewId } });
      if (!review) throw new Error('REVIEW_NOT_FOUND');
      if (review.userId !== userId) throw new Error('FORBIDDEN');

      await tx.review.delete({ where: { id: reviewId } });
      await this.updateProductRating(tx, review.productId as number);

      return true;
    });
  };
}