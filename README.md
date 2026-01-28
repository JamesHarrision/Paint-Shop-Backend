# 🎨 Paint Shop E-commerce System (Microservices)

Hệ thống thương mại điện tử chuyên bán sơn, tích hợp AI tư vấn màu sắc. Dự án được xây dựng với kiến trúc Clean Architecture, vận hành hoàn toàn trên Docker.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v20-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

---

## 🚀 Tech Stack

* **Backend:** Node.js, Express, TypeScript (Clean Architecture)
* **AI Service:** Python (FastAPI) - Phân tích màu sắc từ ảnh
* **Database:** MySQL 8.0 (Prisma ORM)
* **Cache:** Redis (Caching & Session management)
* **Infrastructure:** Docker & Docker Compose
* **Containerization:** Multi-stage Build (Optimized for Production)

---

## ✨ Tính năng chính

### 1. Authentication & Authorization
* Đăng ký/Đăng nhập (JWT)
* Phân quyền chặt chẽ (Admin vs User)

### 2. Product Management
* CRUD sản phẩm, quản lý tồn kho (Stock)
* **Optimistic Locking:** Xử lý concurrency (tranh chấp) khi nhiều người mua hàng cùng lúc.

### 3. AI Color Analysis
* Upload ảnh nội thất → AI phân tích mã màu chủ đạo
* Gợi ý loại sơn phù hợp dựa trên màu sắc

### 4. Order System
* Giỏ hàng & Checkout
* **Transaction Management:** Đảm bảo tính toàn vẹn dữ liệu khi tạo đơn
* Quản lý trạng thái đơn hàng (Pending → Shipped → Cancelled)

---

## 🛠️ Cài đặt & Chạy dự án (Docker)

Bạn không cần cài Node.js hay MySQL trên máy. Chỉ cần **Docker Desktop**.

### 1. Clone & Config

# Clone dự án
git clone [https://github.com/your-username/paint-shop-backend.git](https://github.com/your-username/paint-shop-backend.git)
cd paint-shop-backend

# Tạo file .env (Copy từ mẫu)
cp backend/.env.example backend/.env

###   2. Khởi chạy hệ thống
Chạy toàn bộ 4 services (Backend, AI, MySQL, Redis) với 1 lệnh duy nhất:

```Bash
docker-compose up --build -d
```

### 3. Setup Database (Lần đầu tiên)
Vì Database chạy trong Docker ban đầu sẽ trống, bạn cần chạy lệnh sau từ máy host để tạo bảng và nạp dữ liệu mẫu:
```bash
# Di chuyển vào thư mục backend
cd backend

# Chạy Migration (Tạo bảng)
npx prisma migrate deploy

# Chạy Seed (Nạp dữ liệu sản phẩm & user mẫu)
npx prisma db seed
```
Quan trọng: Khi chạy lệnh prisma từ máy host, hãy đảm bảo DATABASE_URL trong file .env trỏ tới localhost:3306 (hoặc port bạn đã map trong docker-compose).

Tất nhiên rồi! Dưới đây là nội dung hoàn chỉnh cho file README.md. Tôi đã format lại chuẩn Markdown, làm đẹp các đoạn code và cấu trúc để bạn chỉ cần Copy & Paste là xong.

Bạn hãy tạo file README.md ở thư mục gốc của dự án (paint-shop-backend/) và dán nội dung này vào nhé:

Markdown
# 🎨 Paint Shop E-commerce System (Microservices)

Hệ thống thương mại điện tử chuyên bán sơn, tích hợp AI tư vấn màu sắc. Dự án được xây dựng với kiến trúc Clean Architecture, vận hành hoàn toàn trên Docker.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v20-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

---

## 🚀 Tech Stack

* **Backend:** Node.js, Express, TypeScript (Clean Architecture)
* **AI Service:** Python (FastAPI) - Phân tích màu sắc từ ảnh
* **Database:** MySQL 8.0 (Prisma ORM)
* **Cache:** Redis (Caching & Session management)
* **Infrastructure:** Docker & Docker Compose
* **Containerization:** Multi-stage Build (Optimized for Production)

---

## ✨ Tính năng chính

### 1. Authentication & Authorization
* Đăng ký/Đăng nhập (JWT)
* Phân quyền chặt chẽ (Admin vs User)

### 2. Product Management
* CRUD sản phẩm, quản lý tồn kho (Stock)
* **Optimistic Locking:** Xử lý concurrency (tranh chấp) khi nhiều người mua hàng cùng lúc.

### 3. AI Color Analysis
* Upload ảnh nội thất → AI phân tích mã màu chủ đạo
* Gợi ý loại sơn phù hợp dựa trên màu sắc

### 4. Order System
* Giỏ hàng & Checkout
* **Transaction Management:** Đảm bảo tính toàn vẹn dữ liệu khi tạo đơn
* Quản lý trạng thái đơn hàng (Pending → Shipped → Cancelled)

---

## 🛠️ Cài đặt & Chạy dự án (Docker)

Bạn không cần cài Node.js hay MySQL trên máy. Chỉ cần **Docker Desktop**.

### 1. Clone & Config
# Clone dự án
```bash
git clone [https://github.com/your-username/paint-shop-backend.git](https://github.com/your-username/paint-shop-backend.git)
cd paint-shop-backend
```

1. Tạo file .env (Copy từ mẫu)
cp backend/.env.example backend/.env
Lưu ý: Cập nhật các biến môi trường trong .env nếu cần thiết.

2. Khởi chạy hệ thống
Chạy toàn bộ 4 services (Backend, AI, MySQL, Redis) với 1 lệnh duy nhất:

```Bash
docker-compose up --build -d
```

3. Setup Database (Lần đầu tiên)
Vì Database chạy trong Docker ban đầu sẽ trống, bạn cần chạy lệnh sau từ máy host để tạo bảng và nạp dữ liệu mẫu:

```Bash
# Di chuyển vào thư mục backend
cd backend
```

```bash
# Chạy Migration (Tạo bảng)
npx prisma migrate deploy
```

```bash
# Chạy Seed (Nạp dữ liệu sản phẩm & user mẫu)
npx prisma db seed
Quan trọng: Khi chạy lệnh prisma từ máy host, hãy đảm bảo DATABASE_URL trong file .env trỏ tới localhost:3306 (hoặc port bạn đã map trong docker-compose).
```

📖 API Documentation
Hệ thống cung cấp RESTful API đầy đủ. Xem chi tiết tài liệu tại file: API_DOCS.md

Test nhanh
Admin Account: admin@paint.com / admin123

User Account: user@paint.com / user123

📂 Cấu trúc dự án
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
