# 🎨 Paint Shop - High-Performance E-commerce System

Một hệ thống thương mại điện tử chuyên biệt cho ngành sơn, được thiết kế với kiến trúc **Clean Architecture** và vận hành mượt mà trên hệ sinh thái **Docker**. Dự án tập trung vào hiệu năng cao, bảo mật và trải nghiệm người dùng hiện đại với phong cách thiết kế **Retro-Brutalist**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v20-green)
![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![Aesthetics](https://img.shields.io/badge/Design-Retro--Brutalist-E2725B)

---

## 🚀 Tech Stack

Hệ thống được xây dựng trên nền tảng micro-services (giả lập) để đảm bảo tính module hóa và dễ mở rộng:

*   **Backend (Core):** Node.js, Express, **TypeScript**. Tuân thủ nghiêm ngặt mô hình **Controller - Service - Repository**.
*   **Python Service:** Python (FastAPI/Flask) - Xử lý các logic tính toán đặc thù và hỗ trợ xử lý dữ liệu.
*   **Frontend:** Vanilla Javascript, Vite, Tailwind CSS. Sử dụng hệ thống Routing tự xây dựng (Custom Hash Router) và Template Engine nhẹ nhàng.
*   **Database:** MySQL 8.0 với **Prisma ORM** (Type-safe database access).
*   **Caching & Security:** **Redis** được sử dụng để tối ưu hóa tốc độ truy vấn (Caching) và quản lý JWT Blacklist (Security).
*   **DevOps:** Toàn bộ hệ thống được container hóa bằng **Docker**. Sử dụng **Multi-stage Build** để tối ưu kích thước image khi deploy.

---

## ✨ Tính năng nổi bật

### 1. Kiến trúc & Hiệu năng
*   **Layered Architecture:** Tách biệt rõ ràng giữa Business Logic, Database Access và Request Handling.
*   **Smart Caching:** Hệ thống Cache thông minh với Redis. Tự động Invalidate cache khi dữ liệu thay đổi (ví dụ: Cập nhật rating sản phẩm sẽ reset cache của sản phẩm đó ngay lập tức).
*   **Transaction Management:** Đảm bảo tính toàn vẹn dữ liệu cho các luồng thanh toán và đặt hàng.

### 2. Bảo mật (Production-Ready Auth)
*   **JWT Access & Refresh Token:** Cơ chế rotation token an toàn, chống tấn công replay.
*   **Redis Blacklist:** Thu hồi token ngay lập tức khi người dùng đăng xuất.
*   **Route Guards:** Bảo vệ các tuyến đường Admin/User chặt chẽ từ cả Backend và Frontend.

### 3. Trải nghiệm người dùng (UX/UI)
*   **Retro-Brutalist Design:** Giao diện độc bản, cá tính với các khối màu tương phản mạnh và typography đậm nét.
*   **Real-time UI Update:** Cập nhật số liệu rating, lượt đánh giá và trạng thái giỏ hàng ngay lập tức mà không cần load lại trang.
*   **Admin Panel:** Hệ thống quản lý sản phẩm, bộ sưu tập và đơn hàng mạnh mẽ dành cho người quản trị.

---

## 🛠️ Hướng dẫn cài đặt (Docker Compose)

Hệ thống yêu cầu máy tính đã cài đặt **Docker** và **Docker Desktop**.

```bash
# 1. Clone dự án
git clone https://github.com/your-username/paint-shop-backend.git
cd paint-shop-backend

# 2. Cấu hình môi trường
# Copy file .env.example sang .env và chỉnh sửa các tham số nếu cần
cp .env.example .env

# 3. Khởi chạy toàn bộ hệ thống
docker-compose up --build -d
```

### Setup Database lần đầu
Sau khi container DB đã chạy, thực hiện các lệnh sau để khởi tạo bảng và dữ liệu mẫu:

```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

---

## 📂 Cấu trúc dự án

```bash
paint-shop-backend/
├── python-service/      # Python Micro-service
├── backend/             # Node.js Core Service (Clean Architecture)
│   ├── src/
│   │   ├── controllers/ # Xử lý giao tiếp API
│   │   ├── services/    # Logic nghiệp vụ chính (Business Logic)
│   │   ├── repositories/# Truy vấn Database (Prisma)
│   │   └── utils/       # Caching, Helpers
├── frontend/            # Vanilla JS SPA (Retro-Brutalist)
│   ├── src/
│   │   ├── templates/   # UI Templates
│   │   ├── handlers/    # Logic điều khiển UI
│   │   └── router.js    # Custom Router system
└── docker-compose.yml   # Orchestration
```

---

## 👤 Tài khoản thử nghiệm
*   **Admin:** `admin@paint.com` / `admin123`
*   **User:** `user@paint.com` / `user123`

---
*Dự án được xây dựng với mục tiêu thực hành kiến trúc hệ thống chuyên nghiệp và quy trình phát triển sản phẩm thực tế.*
