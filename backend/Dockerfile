# --- STAGE 1: BUILDER (Dùng để build code) ---
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Cài đặt OpenSSL (Cần thiết cho Prisma Client trên Alpine Linux)
RUN apk add --no-cache openssl

# 2. Copy file định nghĩa package trước để tận dụng Docker Cache
COPY package*.json ./
COPY prisma ./prisma/

# 3. Cài đặt TOÀN BỘ dependencies (bao gồm cả devDependencies để build)
RUN npm ci

# 4. Generate Prisma Client
RUN npx prisma generate

# 5. Copy toàn bộ source code
COPY . .

# 6. Build TypeScript -> JavaScript (Output ra thư mục dist)
RUN npm run build


# --- STAGE 2: RUNNER (Image dùng để chạy thật) ---
FROM node:20-alpine AS runner

WORKDIR /app

# Thiết lập biến môi trường là Production
ENV NODE_ENV=production

# 1. Cài OpenSSL lại ở stage này
RUN apk add --no-cache openssl

# 2. Copy package.json để cài dependencies chạy production
COPY package*.json ./
COPY prisma ./prisma/

# 3. Chỉ cài dependencies cần thiết (Bỏ qua devDependencies như nodemon, types...)
# Dùng 'npm ci' + '--only=production' giúp giảm dung lượng image đáng kể
RUN npm ci --only=production && npm cache clean --force

# 4. Generate lại Prisma Client cho môi trường này (đảm bảo binary khớp với OS)
RUN npx prisma generate

# 5. Copy file build từ stage 'builder' sang
COPY --from=builder /app/dist ./dist

# 6. Copy thư mục uploads (nếu cần serve static files từ đây)
# Lưu ý: Trong thực tế nên dùng Volume, nhưng copy để tạo cấu trúc thư mục
COPY --from=builder /app/uploads ./uploads

# 7. Mở port và chạy
EXPOSE 3000

# Chạy lệnh start (node dist/server.js) thay vì dev
CMD ["npm", "start"]