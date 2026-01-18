import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_key';

export const generateJwtToken = (userId: number, role: string): string => {
  // Token chứa ID và Role của user
  // Hết hạn sau 1 ngày (1d)
  return jwt.sign(
    {userId, role},
    SECRET_KEY,
    {expiresIn: '1d'}
  )
};