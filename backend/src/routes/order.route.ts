import { Router } from "express";
import { OrderController } from '../controllers/order.controller';
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { checkoutSchema, updateOrderStatusSchema } from "../validators/order.validator";

const router = Router();
const orderController = new OrderController();

// Tất cả các route order đều cần đăng nhập
router.use(authenticate);

// POST /api/orders - Checkout
router.post('/', validate(checkoutSchema), orderController.createOrder);

// GET /api/orders - Lấy danh sách đơn hàng của tôi
router.get('/', orderController.getMyOrders);

// GET /api/orders/:id - Chi tiết đơn hàng
router.get('/:id', orderController.getOrderDetail);

// PATCH /api/orders/:id/status - Cập nhật trạng thái (Chỉ Admin)
router.patch('/:id/status', requireAdmin, validate(updateOrderStatusSchema), orderController.updateStatus);

export default router;