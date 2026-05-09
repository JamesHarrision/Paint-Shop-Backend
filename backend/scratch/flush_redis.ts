import redis from '../src/config/redis';

async function flushRedis() {
    console.log('🧹 Đang dọn dẹp Cache Redis...');
    try {
        await redis.flushall();
        console.log('✅ Đã xóa toàn bộ Cache.');
    } catch (err) {
        console.error('❌ Lỗi khi xóa Cache:', err);
    } finally {
        process.exit(0);
    }
}

flushRedis();
