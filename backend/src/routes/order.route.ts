import { Router } from "express";
import { OrderController } from '../controllers/order.controller';
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { checkoutSchema, updateOrderStatusSchema, updatePaymentStatusSchema } from "../validators/order.validator";

const router = Router();
const orderController = new OrderController();

// Tất cả các route order đều cần đăng nhập
router.use(authenticate);

// POST /api/orders - Checkout
router.post('/', validate(checkoutSchema), orderController.createOrder);

// GET /api/orders/me - Lấy danh sách đơn hàng của tôi
router.get('/me', orderController.getMyOrders);

// GET /api/orders/all - Lấy tất cả đơn hàng (Admin)
router.get('/all', requireAdmin, orderController.getAllOrders);

// GET /api/orders/:id - Chi tiết đơn hàng
router.get('/:id', orderController.getOrderById);

// PATCH /api/orders/:id/status - Cập nhật trạng thái (Chỉ Admin)
router.patch('/:id/status', requireAdmin, validate(updateOrderStatusSchema), orderController.updateStatus);

// PATCH /api/orders/:id/payment-status - Cập nhật trạng thái thanh toán (Chỉ Admin)
router.patch('/:id/payment-status', requireAdmin, validate(updatePaymentStatusSchema), orderController.updatePaymentStatus);

export default router;