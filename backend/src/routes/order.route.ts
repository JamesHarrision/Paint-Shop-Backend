import { Router } from "express";
import * as orderController from '../controllers/order.controller'
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

const router = Router();

// POST /api/orders
router.post('/', authenticate, orderController.createOrder)
router.get('/', authenticate, orderController.getMyOrder);
router.patch('/:id/status', authenticate, requireAdmin, orderController.updateStatus);

export default router;