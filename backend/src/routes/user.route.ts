import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();
const userController = new UserController();

// Tất cả các route user management đều cần quyền Admin
router.use(authenticate, requireAdmin);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserDetail);
router.delete('/:id', userController.deleteUser);

export default router;