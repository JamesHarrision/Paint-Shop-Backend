import { Router } from "express";
import * as productController from '../controllers/productController'
import { authenticate } from "../middlewares/authMiddleware";
import { requireAdmin } from "../middlewares/roleMiddleware";
import { cloudinaryUpload } from "../services/cloudinaryService";
const router = Router();

import reviewRoutes from './review.route'

// GET /api/products -> Ai cũng xem được
router.get('/', productController.getAllProducts);

// GET /api/products/:id -> Xem chi tiết
router.get('/:id', productController.getProductDetail);

router.post('/', authenticate, requireAdmin, cloudinaryUpload.single("image"), productController.createProduct);
router.put('/:id', authenticate, requireAdmin, cloudinaryUpload.single("image"), productController.updateProduct);

router.delete('/:id', authenticate, requireAdmin, productController.deleteProduct);

router.use('/:productId/reviews', reviewRoutes);

export default router;