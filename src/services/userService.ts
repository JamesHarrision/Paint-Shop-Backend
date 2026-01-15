import { error } from 'node:console';
import {prisma} from '../config/prisma'
import { comparePassword, hashPassword } from '../utils/password'
import { generateJwtToken } from '../utils/jwt';

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

  if(!user){
    throw new Error("Invalid email or password");
  }

  //2. So sánh password hash
  const isMatch = await comparePassword(password, user.password);
  if(!isMatch){
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