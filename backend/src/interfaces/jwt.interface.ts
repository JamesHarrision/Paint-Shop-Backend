export interface JwtPayload {
  userId: number,
  role: string
}

export interface RefreshTokenPayload {
  userId: number
}

