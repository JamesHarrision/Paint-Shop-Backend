import { prisma } from '../config/prisma'
import { Prisma } from '@prisma/client'
import redis from '../config/redis'

// Interface cho bộ lọc (Filter)
interface GetProductsParams {
  page?: number,
  limit?: number,
  search?: string,
  minPrice?: number,
  maxPrice?: number
}

export const createProduct = async (data: any) => {
  await redis.del('product:color-lookup');

  return await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      imageUrl: data.imageUrl,
    },
  });
};

export const getProductById = async (id: number) => {
  // 1. Tạo Key Cache: ví dụ "product:15"
  const cacheKey = `product:${id}`;

  // 2. Kiểm tra trong Redis trước
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log(`⚡ Hit Cache Product Detail: ${id}`);
    return JSON.parse(cachedData);
  }

  // 3. Nếu không có, gọi DB
  const product = await prisma.product.findUnique({
    where: { id: id }
  });


  if (!product) throw new Error('Product not found');

  // 4. Lưu vào Redis (Hết hạn sau 60s)
  await redis.set(cacheKey, JSON.stringify(product), "EX", 60);

  return product;
}

export const getProducts = async (params: GetProductsParams) => {
  let { page = 1, limit = 10, search, minPrice, maxPrice } = params;
  if (!minPrice) minPrice = 0;
  if (!maxPrice) maxPrice = 1e9;

  // 1. TẠO KEY CACHE (Định danh duy nhất cho request này)
  // Ví dụ: "products:p1:l10:s=Son:min=null:max=null"
  const cacheKey = `product:p${page}:l${limit}:s=${search || ''}:min=${minPrice || ''}:max=${maxPrice || ''}`;

  // 2. CHECK REDIS
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    // Hit Cache: Có dữ liệu trong RAM -> Trả về ngay
    console.log('⚡ Hit Cache List: Returning data from Redis');
    return JSON.parse(cachedData);
  }


  // 3. MISS CACHE -> GỌI DB
  console.log('🐢 Miss Cache List: Fetching from DB...');
  
  // Page 1: skip 0. Page 2: skip 10...
  const skip = (page - 1) * limit;

  // Xây dựng câu điều kiện Query (Dynamic Query)
  const whereCondition: Prisma.ProductWhereInput = {
    AND: [
      // Tìm kiếm theo tên (nếu có)
      search ? { name: { contains: search } } : {},
      // Lọc theo khoảng giá (nếu có)
      minPrice ? { price: { gte: minPrice } } : {},
      maxPrice ? { price: { lte: maxPrice } } : {},
    ],
  };

  // Thực hiện 2 query song song (Promise.all) để tối ưu thời gian
  // 1. Lấy dữ liệu
  // 2. Đếm tổng số record (để Frontend biết có bao nhiêu trang)
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: whereCondition,
      skip: skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' }, // Mới nhất lên đầu
    }),
    prisma.product.count({ where: whereCondition }),
  ]);


  const result = {
    data: products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
  
  // 4. LƯU VÀO REDIS (Set TTL = 60 giây)
  // Dữ liệu sẽ tự động biến mất sau 60s để đảm bảo không bị cũ quá
  redis.set(cacheKey, JSON.stringify(result), 'EX', 60);

  return result;
}