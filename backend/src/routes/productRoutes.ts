import { Router } from "express";
import * as productController from '../controllers/productController'
import { authenticate } from "../middlewares/authMiddleware";
import { requireAdmin } from "../middlewares/roleMiddleware";
import { cloudinaryUpload } from "../services/cloudinaryService";
const router = Router();

import reviewRoutes from './review.route'

//Ai cũng xem được
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductDetail);

// Cần phải đăng nhập mới xem được
router.post('/', authenticate, requireAdmin, cloudinaryUpload.single("image"), productController.createProduct);
router.put('/:id', authenticate, requireAdmin, cloudinaryUpload.single("image"), productController.updateProduct);

router.delete('/:id', authenticate, requireAdmin, productController.deleteProduct);

// Route review
router.use('/:productId/reviews', reviewRoutes);

export default router;