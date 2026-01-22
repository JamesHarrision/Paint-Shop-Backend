import { Router } from "express";
import * as orderController from '../controllers/orderController'
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

// POST /api/orders
router.post('/', authenticate, orderController.createOrder)

export default router;