import { Router } from "express";
import * as productController from '../controllers/productController'

const router = Router();

// GET /api/products -> Ai cũng xem được
router.get('/', productController.getAllProducts);

// GET /api/products/:id -> Xem chi tiết
router.get('/:id', productController.getProductDetail);

// POST /api/products -> Tạo mới (Tạm thời public để dễ test data)
router.post('/', productController.createProduct);

export default router;