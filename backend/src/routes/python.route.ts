import express from 'express'
import { authenticate } from '../middlewares/auth.middleware'
import { cloudinaryUpload } from '../services/cloudinary.service';
import { PythonController } from '../controllers/python.controller';

const router = express.Router();
const pythonController = new PythonController();

// POST /api/ai/analyze (Yêu cầu đăng nhập để lưu lịch sử)
router.post('/analyze', authenticate, cloudinaryUpload.single('image'), pythonController.getColorSugestion);

// GET /api/python/history (Xem lịch sử)
router.get('/history', authenticate, pythonController.getHistory);

export default router;
