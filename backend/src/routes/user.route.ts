import Router from 'express'
import * as userController from '../controllers/user.controller'
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();
router.use(authenticate, requireAdmin);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserDetail);
router.delete('/:id', userController.deleteUser);

export default router