import multer from 'multer'
import fs from 'fs'
import path from 'path'

// Tạo upload directory nếu chưa tồn tại
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

export const multerUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});