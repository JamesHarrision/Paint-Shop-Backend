import express from 'express'
import multer from 'multer'
import fs from 'fs'
import * as aiController from '../controllers/aiController'
import { authenticate } from '../middlewares/authMiddleware'
import path from 'path'

const router = express.Router();

// 1. Cấu hình nơi lưu file (Disk Storage)
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); //Lưu vào folder 'uploads' ở root
  },
  filename(req, file, cb) {
    // Đặt tên file unique: timestamp-tên-gốc
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
})

// Bộ lọc file (Chỉ nhận ảnh)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Uploaded file is not an image !'), false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

// 3. Định nghĩa Route
// POST /api/v1/ai/analyze
// upload.single('image') -> middleware này sẽ bắt field có tên là 'image' trong form data
// POST /api/v1/ai/analyze (Yêu cầu đăng nhập để lưu lịch sử)
router.post('/analyze', authenticate, upload.single('image'), aiController.getColorSugestion);

// GET /api/v1/ai/history (Xem lịch sử)
router.get('/history', authenticate, aiController.getHistory);

export default router;


