import { Router } from "express";
import * as authController from '../controllers/authController';
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);

// --- Khu vực VIP (Cần đăng nhập) ---
// Flow: Request -> authenticate (check vé) -> getMe (trả dữ liệu)
router.get('/me', authenticate, authController.getMe);

export default router;

