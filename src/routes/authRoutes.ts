import { Router } from "express";
import * as authController from '../controllers/authController';

const router = Router();

// POST /api/auth/register
router.post('/register', authController.register);

export default router;

