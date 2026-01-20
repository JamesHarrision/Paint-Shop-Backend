import { Router } from "express";
import * as productController from '../controllers/productController'
import { authenticate } from "../middlewares/authMiddleware";
import { requireAdmin } from "../middlewares/roleMiddleware";

const router = Router();

// GET /api/products -> Ai cũng xem được
router.get('/', productController.getAllProducts);

// GET /api/products/:id -> Xem chi tiết
router.get('/:id', productController.getProductDetail);

// POST /api/products -> Tạo mới (Tạm thời public để dễ test data)
router.post('/', authenticate, requireAdmin, productController.createProduct);
router.put('/:id', authenticate, requireAdmin, productController.updateProduct);
router.delete('/:id', authenticate, requireAdmin, productController.deleteProduct);

export default router;