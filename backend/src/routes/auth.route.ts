import { Router } from "express";
import * as authController from '../controllers/auth.controller';
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { forgotPasswordSchema, loginSchema, refreshTokenSchema, registerSchema, resetPasswordSchema } from "../validators/auth.validator";

const router = Router();

// POST /api/auth/*

router.post(
  '/register',
  validate(registerSchema),
  authController.register);

router.post(
  '/login',
  validate(loginSchema),
  authController.login);

router.post(
  '/forgot-password',
  validate(forgotPasswordSchema),
  authController.forgotPassword);

router.post(
  '/reset-password',
  validate(resetPasswordSchema),
  authController.resetPassword);

router.post(
  '/refresh-token',
  validate(refreshTokenSchema),
  authController.refreshToken
)

router.post(
  '/logout',
  authenticate,
  authController.logout
)

router.get('/me', authenticate, authController.getMe);

export default router;

