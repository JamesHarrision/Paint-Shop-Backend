import { Router } from "express";
import * as orderController from '../controllers/orderController'
import { authenticate } from "../middlewares/authMiddleware";
import { requireAdmin } from "../middlewares/roleMiddleware";

const router = Router();

// POST /api/orders
router.post('/', authenticate, orderController.createOrder)
router.get('/', authenticate, orderController.getMyOrder);
router.post('/:id/status', authenticate, requireAdmin, orderController.updateStatus);

export default router;