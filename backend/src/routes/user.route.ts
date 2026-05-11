import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();
const userController = new UserController();

// Route cho người dùng cá nhân (Chỉ cần đăng nhập)
router.get('/me', authenticate, userController.getProfile);
router.patch('/me', authenticate, userController.updateProfile);
router.patch('/me/change-password', authenticate, userController.changePassword);

// Route cho Admin quản lý (Cần quyền Admin)
router.get('/', authenticate, requireAdmin, userController.getAllUsers);
router.post('/', authenticate, requireAdmin, userController.createUser);
router.get('/:id', authenticate, requireAdmin, userController.getUserDetail);
router.put('/:id', authenticate, requireAdmin, userController.updateUser);
router.delete('/:id', authenticate, requireAdmin, userController.deleteUser);

export default router;