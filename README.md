🎨 Paint Shop E-commerce System (Microservices)
Hệ thống thương mại điện tử chuyên bán sơn, tích hợp AI tư vấn màu sắc. Dự án được xây dựng với kiến trúc Clean Architecture, vận hành hoàn toàn trên Docker.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v20-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

🚀 Tech Stack

Backend: Node.js, Express, TypeScript (Clean Architecture)
AI Service: Python (FastAPI) - Phân tích màu sắc từ ảnh
Database: MySQL 8.0 (Prisma ORM)
Cache: Redis (Caching & Session management)
Infrastructure: Docker & Docker Compose
Containerization: Multi-stage Build (Optimized for Production)


✨ Tính năng chính
1. Authentication & Authorization

Đăng ký/Đăng nhập (JWT)
Phân quyền chặt chẽ (Admin vs User)

2. Product Management

CRUD sản phẩm, quản lý tồn kho (Stock)
Optimistic Locking (xử lý concurrency khi mua hàng)

3. AI Color Analysis

Upload ảnh nội thất → AI phân tích mã màu chủ đạo
Gợi ý loại sơn phù hợp dựa trên màu sắc

4. Order System

Giỏ hàng & Checkout
Transaction Management (đảm bảo tính toàn vẹn dữ liệu)
Quản lý trạng thái đơn hàng (Pending → Shipped → Cancelled)


🛠️ Cài đặt & Chạy dự án (Docker)
Bạn không cần cài Node.js hay MySQL trên máy. Chỉ cần Docker Desktop.
1. Clone & Config
bash# Clone dự án
git clone https://github.com/your-username/paint-shop-backend.git
cd paint-shop-backend

# Tạo file .env (Copy từ mẫu)
cp backend/.env.example backend/.env

Lưu ý: Cập nhật các biến môi trường trong .env nếu cần

2. Khởi chạy hệ thống
Chạy toàn bộ 4 services (Backend, AI, MySQL, Redis) với 1 lệnh:
bashdocker-compose up --build -d
3. Setup Database (Lần đầu tiên)
Vì Database chạy trong Docker trống trơn, cần chạy lệnh sau từ máy host để tạo bảng và nạp dữ liệu mẫu:
bash# Vào thư mục backend
cd backend

# Chạy Migration (Tạo bảng)
npx prisma migrate deploy

# Chạy Seed (Nạp dữ liệu sản phẩm & user mẫu)
npx prisma db seed
```

> **Lưu ý:** Đảm bảo file `.env` đang trỏ tới `localhost:3306` hoặc port tương ứng

---

## 📖 API Documentation

Hệ thống cung cấp RESTful API đầy đủ. Xem chi tiết tài liệu tại file: **API_DOCS.md**

### Test nhanh

- **Admin Account:** `admin@paint.com` / `admin123`
- **User Account:** `user@paint.com` / `user123`

---

## 📂 Cấu trúc dự án
```
paint-shop-backend/
├── ai-service/          # Python Service (FastAPI)
├── backend/             # Node.js Main Service
│   ├── src/
│   │   ├── controllers/ # Xử lý Request/Response
│   │   ├── services/    # Business Logic
│   │   ├── models/      # Data Models
│   │   ├── utils/       # Helper functions
│   │   └── app.ts       # App Entry point
│   ├── prisma/          # Database Schema & Seeds
│   └── Dockerfile       # Multi-stage Dockerfile
├── docker-compose.yml   # Orchestration
└── README.md

🤝 Đóng góp
Dự án được phát triển cho mục đích học tập (DevOps & Backend Architecture). Mọi đóng góp đều được hoan nghênh!

📝 License
This project is licensed under the MIT License.

Những thay đổi đã thực hiện:

✅ Sửa các link Markdown bị lỗi format
✅ Chuẩn hóa cấu trúc heading và spacing
✅ Thêm blockquote cho các lưu ý quan trọng
✅ Format lại code blocks cho dễ đọc
✅ Thêm phần License ở cuối
✅ Loại bỏ phần "Mentor Note" không cần thiết
✅ Cải thiện visual hierarchy với divider lines
