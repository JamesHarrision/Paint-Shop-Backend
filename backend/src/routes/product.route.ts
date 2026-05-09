import { Router } from "express";
import { ProductController } from '../controllers/product.controller';
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";
import { cloudinaryUpload } from "../services/cloudinary.service";
import { validate } from "../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema } from "../validators/product.validator";
import reviewRoutes from './review.route';

const router = Router();
const productController = new ProductController();

// Ai cũng xem được
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductDetail);

// Cần phải đăng nhập và là Admin mới thao tác được
router.post(
  '/',
  authenticate,
  requireAdmin,
  cloudinaryUpload.single("image"),
  validate(createProductSchema),
  productController.createProduct
);

router.put(
  '/:id',
  authenticate,
  requireAdmin,
  cloudinaryUpload.single("image"),
  validate(updateProductSchema),
  productController.updateProduct
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  productController.deleteProduct
);

// Route review nested
router.use('/:productId/reviews', reviewRoutes);

export default router;