import redis from "../config/redis";

/**
 * Hàm tiện ích để Lấy hoặc Set Cache dùng chung
 * @param key Khóa lưu trong Redis (VD: 'product:15')
 * @param ttl Thời gian sống của cache tính bằng giây
 * @param fetcher Một hàm callback gọi xuống DB nếu cache miss
 */

export const redisUtil = {
  getOrSetCache: async<T>(
    key: string,
    ttl: number,
    fetcher: () => Promise<T>
  ): Promise<T> => {

    // 1. Kiểm tra trong Redis
    const cachedData = await redis.get(key);
    if (cachedData) {
      console.log('⚡ Hit Cache: Returning data');
      return JSON.parse(cachedData) as T;
    }

    // 2. Nếu không có (Miss Cache), thực thi hàm fetcher() để lấy data gốc
    console.log('🐢 Miss Cache: Fetching from DB...');
    const freshData = await fetcher();

    // 3. Lưu data mới vào Redis
    await redis.set(key, JSON.stringify(freshData as T), 'EX', ttl);

    return freshData;
  },

  setResetToken: async (token: string, email: string, ttl: number = 1800) => {
    return await redis.set(`reset_token:${token}`, email, 'EX', ttl);
  },
  getResetToken: async (token: string) => {
    return await redis.get(`reset_token:${token}`);
  },
  deleteResetToken: async (token: string) => {
    return await redis.del(`reset_token:${token}`);
  },

  addToBlackList: async (accessToken: string, ttl: number) => {
    return await redis.set(`black_list:${accessToken}`, 1, "EX", ttl);
  },

  isBlacklisted: async (token: string) => {
    const result = await redis.get(`black_list:${token}`);
    return (result) ? true : false;
  }
}
