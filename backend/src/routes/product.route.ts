import { Router } from "express";
import * as productController from '../controllers/product.controller'
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";
import { cloudinaryUpload } from "../services/cloudinary.service";
const router = Router();

import reviewRoutes from './review.route'
import { createProductSchema, updateProductSchema } from "../validators/product.validator";
import { validate } from "../middlewares/validate.middleware";

//Ai cũng xem được
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductDetail);

// Cần phải đăng nhập mới xem được
router.post(
  '/',
  authenticate,
  requireAdmin,
  cloudinaryUpload.single("image"),
  validate(createProductSchema),
  productController.createProduct);

router.put(
  '/:id',
  authenticate,
  requireAdmin,
  cloudinaryUpload.single("image"),
  validate(updateProductSchema),
  productController.updateProduct);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  productController.deleteProduct);

// Route review
router.use('/:productId/reviews', reviewRoutes);

export default router;