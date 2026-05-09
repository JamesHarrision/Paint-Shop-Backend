import jwt from "jsonwebtoken";
import { RefreshTokenPayload, JwtPayload } from "../interfaces/jwt.interface";

const ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN_SECRET as string;

export const generateAccessToken = (userId: number, role: string): string => {
  return jwt.sign(
    { userId, role },
    ACCESS_TOKEN,
    { expiresIn: '15m' }
  )
};

export const generateRefreshToken = (userId: number) => {
  const token = jwt.sign({ userId }, REFRESH_TOKEN, { expiresIn: '7d' });
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  return { token, expiresAt };
};

export const generateAuthTokens = (userId: number, role: string) => {
  const accessToken = generateAccessToken(userId, role);
  const { token: refreshToken, expiresAt } = generateRefreshToken(userId);

  return { accessToken, refreshToken, expiresAt };
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN) as JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN) as RefreshTokenPayload;
};