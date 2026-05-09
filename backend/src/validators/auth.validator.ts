import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    fullName: z.string().min(2, "Tên quá ngắn")
  })
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email không đúng định dạng'),
    password: z.string().min(1, 'Mật khẩu không được để trống'),
  })
})

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Email không hợp lệ"),
  })
})

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, "Token là bắt buộc"),
    newPassword: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự')
  })
})

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, "Refresh token là bắt buộc")
  })
})
