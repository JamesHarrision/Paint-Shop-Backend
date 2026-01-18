# 1. Dùng Node version ổn định (LTS) và nhẹ (Alpine)
FROM node:18-alpine

# 2. Tạo thư mục làm việc trong container
WORKDIR /app

# 3. Copy file package để cài thư viện trước (Tối ưu cache)
COPY package*.json ./
COPY prisma ./prisma/ 
# (Copy folder prisma để generate client, nếu bạn để prisma chỗ khác thì sửa lại đường dẫn)

# 4. Cài đặt dependencies
RUN npm install

# 5. Generate Prisma Client (BẮT BUỘC khi dùng Prisma trong Docker)
RUN npx prisma generate

# 6. Copy toàn bộ code còn lại vào container
COPY . .

# 7. Mở port 3000
EXPOSE 3000

# 8. Chạy lệnh dev (hoặc start tùy script trong package.json)
CMD ["npm", "run", "dev"]