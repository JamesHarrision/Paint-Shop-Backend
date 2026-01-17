import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Lấy thông tin từ biến môi trường (đã cấu hình trong .env)
const redisPort = Number(process.env.REDIS_PORT_APP) || 6379;
const redisHost = process.env.REDIS_HOST || 'localhost';

console.log(`🔌 Connecting to Redis at ${redisHost}:${redisPort}...`);

// Khởi tạo client Redis
const redis = new Redis({
  host: redisHost,
  port: redisPort,
  // Chiến thuật tự động kết nối lại nếu bị mất mạng
  retryStrategy: (times) => {
    // Thử lại sau 50ms, 100ms... tối đa chờ 2s
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('connect', () => {
  console.log('✅ Connected to Redis successfully!');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

export default redis;