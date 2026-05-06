import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { cloudinaryUpload } from '../services/cloudinary.service';

const reviewController = new ReviewController();

// Cho phép mergeParams để lấy được :productId nếu route này được nhúng vào productRoutes
const router = Router({ mergeParams: true });

// Route lấy review của sản phẩm (Không cần đăng nhập)
router.get('/', reviewController.getProductReviews);

// Các route phải đăng nhập
router.use(authenticate);

// Cho phép upload mảng file (tối đa 5 ảnh), field name là 'images'
router.post('/', cloudinaryUpload.array('images', 5), reviewController.createReview);
router.put('/:id', cloudinaryUpload.array('images', 5), reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

export default router;