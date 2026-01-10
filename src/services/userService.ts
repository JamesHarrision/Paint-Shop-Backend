import {prisma} from '../config/prisma'
import { hashPassword } from '../utils/password'

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
  
  if(existingUser){
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