import express from 'express'
import { authenticate } from '../middlewares/auth.middleware'
import { cloudinaryUpload } from '../services/cloudinary.service';
import { AiController } from '../controllers/ai.controller';

const router = express.Router();
const aiController = new AiController();

// POST /api/ai/analyze (Yêu cầu đăng nhập để lưu lịch sử)
router.post('/analyze', authenticate, cloudinaryUpload.single('image'), aiController.getColorSugestion);

// GET /api/ai/history (Xem lịch sử)
router.get('/history', authenticate, aiController.getHistory);

export default router;
