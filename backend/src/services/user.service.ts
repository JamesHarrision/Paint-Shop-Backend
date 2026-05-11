import { comparePassword, hashPassword } from '../utils/password'
import { generateAccessToken, generateAuthTokens, verifyAccessToken, verifyRefreshToken } from '../utils/jwt.util';
import { sendResetPasswordEmail } from '../utils/email.service';
import { UserRepository } from '../repositories/user.repository';
import { redisUtil } from '../utils/cache.util';
import { AuthRepository } from '../repositories/auth.repository';
import crypto from 'crypto';
import { RefreshTokenPayload } from '../interfaces/jwt.interface';

const userRepo = new UserRepository();
const authRepo = new AuthRepository();

export const registerUser = async (
  email: string,
  password: string,
  fullName: string
) => {
  const existingUser = await userRepo.getUserByEmail(email);

  if (existingUser) { throw new Error('EMAIL_EXISTS'); }

  const hashedPassword = await hashPassword(password);

  const newUser = await userRepo.createUser({
    email: email,
    password: hashedPassword,
    fullName: fullName
  })

  return newUser;
}

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await userRepo.getUserByEmail(email);
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("INVALID_CREDENTIALS");

  const { accessToken, refreshToken, expiresAt } = generateAuthTokens(user.id, user.role);

  await authRepo.saveRefreshToken(user.id, refreshToken, expiresAt);

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    },
    accessToken,
    refreshToken
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

  const user = await userRepo.getUserByEmail(email);
  // if (!user) throw new Error("USER_NOT_FOUND");
  if (!user) return { message: 'Email reset mật khẩu đã được gửi' };

  const token = crypto.randomUUID();
  await redisUtil.setResetToken(token, email);
  await sendResetPasswordEmail(email, token);

  return { message: 'Email reset mật khẩu đã được gửi' };
}

export const resetPassword = async (
  token: string,
  newPassword: string
) => {
  // 1. Kiểm tra token trong Redis
  // 2. Hash password mới và cập nhật vào MySQL
  // 3. Xóa token khỏi Redis để tránh sử dụng lại (One-time use)

  const email = await redisUtil.getResetToken(token);
  if (!email) throw new Error("INVALID_TOKEN");

  const hashedPassword = await hashPassword(newPassword);
  await userRepo.updateUserPassword(email, hashedPassword)

  await redisUtil.deleteResetToken(token);

  return { message: 'Đặt lại mật khẩu thành công' };
}

export const refreshToken = async (token: string) => {
  let payload: RefreshTokenPayload;
  try {
    payload = verifyRefreshToken(token);
  } catch (error) {
    throw new Error("INVALID_TOKEN");
  }

  const savedToken = await authRepo.findValidRefreshToken(token);
  if (!savedToken) throw new Error("REFRESH_TOKEN_NOT_FOUND");

  await authRepo.deleteToken(token);

  const user = await userRepo.getUserById(payload.userId);
  if (!user) throw new Error("USER_NOT_FOUND");

  const { accessToken, refreshToken: newRefreshToken, expiresAt } = generateAuthTokens(user.id, user.role);

  await authRepo.saveRefreshToken(user.id, newRefreshToken, expiresAt);

  return {
    accessToken,
    refreshToken: newRefreshToken
  };
}

export const logout = async (accessToken: string, refreshToken: string) => {
  await authRepo.deleteToken(refreshToken);
  await redisUtil.addToBlackList(accessToken, 900);
}

export const getAllUsers = async (page: number = 1, limit: number = 10, search?: string) => {
  const skip = (page - 1) * limit;
  const users = await userRepo.findAll(skip, limit, search);
  const total = await userRepo.countAll(search);

  return {
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export const deleteUser = async (id: number) => {
  return await userRepo.deleteUser(id);
}

export const getUserById = async (id: number) => {
  return await userRepo.getUserById(id);
}

export const updateUser = async (id: number, data: { fullName: string }) => {
  return await userRepo.update(id, data);
}

export const changePassword = async (id: number, currentPass: string, newPass: string) => {
  const user = await userRepo.getUserById(id);
  if (!user) throw new Error("USER_NOT_FOUND");

  const isMatch = await comparePassword(currentPass, user.password);
  if (!isMatch) throw new Error("Mật khẩu hiện tại không chính xác");

  const hashedNewPassword = await hashPassword(newPass);
  await userRepo.update(id, { password: hashedNewPassword });
}

export const createUserByAdmin = async (data: any) => {
  const existingUser = await userRepo.getUserByEmail(data.email);
  if (existingUser) throw new Error("EMAIL_EXISTS");

  const hashedPassword = await hashPassword(data.password || "123456");
  const newUser = await userRepo.createUser({
    ...data,
    password: hashedPassword
  });
  return newUser;
}

export const updateUserByAdmin = async (id: number, data: any) => {
  if (data.password) {
    data.password = await hashPassword(data.password);
  }
  return await userRepo.update(id, data);
}