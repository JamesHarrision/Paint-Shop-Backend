// File redis.ts
import Redis from 'ioredis';

// Lấy thông tin từ biến môi trường
const redisPort = Number(process.env.REDIS_PORT) || 6379;
// Ưu tiên 127.0.0.1 nếu file env lỗi
const redisHost = process.env.REDIS_HOST || '127.0.0.1'; 

console.log(`🔌 Connecting to Redis at ${redisHost}:${redisPort}...`);

const redis = new Redis({
  host: redisHost,
  port: redisPort,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('connect', () => {
  console.log('✅ Connected to Redis successfully!');
});

redis.on('error', (err) => {
  // Lọc bớt log lỗi cho đỡ rác màn hình
  console.error(`❌ Redis connection error: ${err.message}`);
});

export default redis;