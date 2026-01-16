import { prisma } from '../config/prisma'
import { Prisma } from '@prisma/client'

// Interface cho bộ lọc (Filter)
interface GetProductsParams {
  page?: number,
  limit?: number,
  search?: string,
  minPrice?: number,
  maxPrice?: number
}

export const createProduct = async (data: any) => {
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
  const product = await prisma.product.findUnique({
    where: { id: id }
  });

  if (!product) throw new Error('Product not found');
  return product;
}

export const getProducts = async (params: GetProductsParams) => {
  const { page = 1, limit = 10, search, minPrice, maxPrice } = params;

  // Tính toán Skip (tư duy giống bài toán mảng)
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


  return {
    data: products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
}