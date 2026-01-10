import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10; //Độ khó thuật toán (10 là chuẩn nha)

export const hashPassword = async (password: string) : Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export const comparePassword = async (rawPassword: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(rawPassword, hash);
}

