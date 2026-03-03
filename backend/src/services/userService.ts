import { error } from 'node:console';
import { prisma } from '../config/prisma'
import { comparePassword, hashPassword } from '../utils/password'
import { generateJwtToken } from '../utils/jwt';
import redis from '../config/redis';
import { sendResetPasswordEmail } from '../utils/emailService';

export const registerUser = async (
  email: string,
  password: string,
  fullName: string
) => {
  // 1. Check xem email đã tồn tại chưa
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  // 2. Hash mật khẩu
  const hashedPassword = await hashPassword(password);

  // 3. Lưu vào database
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      fullName: fullName
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      createdAt: true
    }
  })

  return newUser;
}

export const loginUser = async (
  email: string,
  password: string
) => {
  //1. Tìm user theo email
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  //2. So sánh password hash
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }


  //3. Tạo jwt token
  const token = generateJwtToken(user.id, user.role);

  //4. Trả về thông tin (ko trả password nha fen)
  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    },
    token
  };
}

export const forgetPassword = async (
  email: string
) => {
  // 1. Kiểm tra user có tồn tại không
  // 2. Sinh token ngẫu nhiên
  // 3. Lưu vào Redis với TTL 15 phút (900s)
  // Key format: password_reset:{token} -> Value: email
  // 4. Gửi email

  const user = await prisma.user.findFirst({
    where: { email: email }
  });
  if (!user) throw new Error("User không tồn tại trong hệ thống");

  const resetToken = crypto.randomUUID();

  const redisKey = `password_reset:${resetToken}`;
  await redis.setex(redisKey, 900, email);

  await sendResetPasswordEmail(email, resetToken);

  return { message: 'Email reset mật khẩu đã được gửi' };
}

export const resetPassword = async (
  token: string,
  newPassword: string
) => {
  const redisKey = `password_reset:${token}`;

  // 1. Kiểm tra token trong Redis
  // 2. Hash password mới và cập nhật vào MySQL
  // 3. Xóa token khỏi Redis để tránh sử dụng lại (One-time use)

  const email = await redis.get(redisKey);
  if (!email) throw new Error("Token không tồn tại hoặc đã hết hạn");

  const hashedPassword = await hashPassword(newPassword);
  await prisma.user.update({
    where: { email: email },
    data: { password: hashedPassword }
  })

  await redis.del(redisKey);

  return { message: 'Đặt lại mật khẩu thành công' };
}
