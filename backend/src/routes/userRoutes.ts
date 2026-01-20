import Router from 'express'
import * as userController from '../controllers/userController'
import { authenticate } from '../middlewares/authMiddleware';
import { requireAdmin } from '../middlewares/roleMiddleware';

const router = Router();
router.use(authenticate, requireAdmin);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserDetail);
router.delete('/:id', userController.deleteUser);

export default router