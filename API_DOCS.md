# 🎨 Paint Shop API Documentation

**Base URL:** `http://localhost:3000/api`
**Version:** 1.0

## 1. Authentication
| Method | Endpoint | Body | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | `{ "email": "...", "password": "...", "fullName": "..." }` | Đăng ký tài khoản mới |
| `POST` | `/auth/login` | `{ "email": "...", "password": "..." }` | Đăng nhập -> Trả về `token` |
| `GET` | `/auth/me` | | Request -> authenticate (check vé) -> getMe (trả dữ liệu) |

> **Lưu ý:** Tất cả các request bên dưới (trừ `GET /products`) đều cần Header:
> `Authorization: Bearer <token>`

## 2. Products
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/products` | Lấy danh sách sơn (Public) |
| `GET` | `/products/:id` | Xem chi tiết 1 loại sơn |
| `POST` | `/products` | (Admin) Tạo sản phẩm mới |
| `PUT` | `/products/:id` | (Admin) Sửa 1 sản phẩm |
| `DELETE` | `/products/:id` | (Admin) Xóa 1 sản phẩm |

## 3. AI Features (Màu sắc)
| Method | Endpoint | Body (Form-Data) | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/v1/ai/analyze` | Key: `image` (File ảnh) | Upload ảnh -> AI phân tích màu -> Trả về bảng màu & Gợi ý sơn |
| `GET` | `/v1/ai/history` | (Xem lịch sử) |

## 4. Order System
| Method | Endpoint | Body | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/orders` | `{ "items": [ { "productId": 1, "quantity": 2 } ] }` | Tạo đơn hàng (Checkout) |
| `GET` | `/orders` | (Empty) | Xem lịch sử mua hàng của user đang login |
| `PATCH` | `/orders/:id/status` | `{ "status": "SHIPPED" }` | (Admin) Cập nhật trạng thái đơn (PENDING -> SHIPPED -> COMPLETED/CANCELLED) |
