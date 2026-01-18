import express from 'express'
import multer from 'multer'
import * as aiController from '../controllers/aiController'

const router = express.Router();

// 1. Cấu hình Multer (Lưu vào RAM)
const storage = multer.memoryStorage();

// 2. Bộ lọc file (Chỉ nhận ảnh)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if(file.mimetype.startsWith('image/')) {
    cb(null, true);
  }else{
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
router.post('/analyze', upload.single('image'), aiController.getColorSugestion);

export default router;


