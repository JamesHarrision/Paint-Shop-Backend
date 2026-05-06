import express from 'express'
import { multerUpload } from '../middlewares/upload.middleware'
import * as aiController from '../controllers/ai.controller'
import { authenticate } from '../middlewares/auth.middleware'
import { cloudinaryUpload } from '../services/cloudinary.service';

const router = express.Router();

// 3. Định nghĩa Route
// POST /api/v1/ai/analyze
// upload.single('image') -> middleware này sẽ bắt field có tên là 'image' trong form data
// POST /api/v1/ai/analyze (Yêu cầu đăng nhập để lưu lịch sử)
router.post('/analyze', authenticate, cloudinaryUpload.single('image'), aiController.getColorSugestion);

// GET /api/v1/ai/history (Xem lịch sử)
router.get('/history', authenticate, aiController.getHistory);

export default router;


