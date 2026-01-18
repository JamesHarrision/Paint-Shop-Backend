import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Xóa dữ liệu cũ (để tránh trùng lặp khi chạy lại)
  await prisma.product.deleteMany();
  console.log('Deleted all existing products.');

  // 2. Danh sách dữ liệu mẫu (15 sản phẩm)
  const products = [
    {
      name: 'Sơn Dulux Inspire Nội Thất Mịn',
      description: 'Sơn nội thất bề mặt mờ, công nghệ ChromaBrite bền màu.',
      price: 850000,
      stock: 50,
      imageUrl: 'https://placehold.co/600x400?text=Dulux+Inspire',
    },
    {
      name: 'Sơn Dulux Weathershield Ngoài Trời',
      description: 'Chống thấm, chống rêu mốc, làm mát nhà tới 5 độ C.',
      price: 1450000,
      stock: 30,
      imageUrl: 'https://placehold.co/600x400?text=Dulux+Weathershield',
    },
    {
      name: 'Sơn Jotun Jotashield Bền Màu',
      description: 'Sơn ngoại thất cao cấp, bảo vệ 8 năm, chống tia UV.',
      price: 1350000,
      stock: 40,
      imageUrl: 'https://placehold.co/600x400?text=Jotun+Jotashield',
    },
    {
      name: 'Sơn Lót Jotun Ultra Primer',
      description: 'Sơn lót chống kiềm, độ bám dính cực cao cho tường mới.',
      price: 980000,
      stock: 100,
      imageUrl: 'https://placehold.co/600x400?text=Jotun+Primer',
    },
    {
      name: 'Sơn Chống Thấm Kova CT-11A',
      description: 'Chất chống thấm cao cấp, pha xi măng, bảo vệ sàn và tường.',
      price: 1800000, // Giá cao (để test filter maxPrice)
      stock: 20,
      imageUrl: 'https://placehold.co/600x400?text=Kova+CT11A',
    },
    {
      name: 'Sơn Nội Thất Nippon Odour-less',
      description: 'Sơn không mùi, an toàn cho sức khỏe, dễ lau chùi.',
      price: 750000,
      stock: 60,
      imageUrl: 'https://placehold.co/600x400?text=Nippon+Odourless',
    },
    {
      name: 'Sơn Maxilite Từ Dulux',
      description: 'Giải pháp kinh tế, màng sơn đẹp, chống bong tróc.',
      price: 450000, // Giá rẻ (để test filter minPrice)
      stock: 200,
      imageUrl: 'https://placehold.co/600x400?text=Maxilite',
    },
    {
      name: 'Sơn Kova K-5500 Ngoài Trời',
      description: 'Sơn hệ nước, chịu chùi rửa, chống bám bụi.',
      price: 1100000,
      stock: 45,
      imageUrl: 'https://placehold.co/600x400?text=Kova+K5500',
    },
    {
      name: 'Bột Trét Tường Dulux',
      description: 'Tạo bề mặt nhẵn mịn, che lấp khe nứt nhỏ.',
      price: 320000,
      stock: 150,
      imageUrl: 'https://placehold.co/600x400?text=Bot+Tret+Dulux',
    },
    {
      name: 'Sơn Dầu Bạch Tuyết (Màu Ghi)',
      description: 'Sơn cho kim loại, gỗ, bảo vệ bề mặt tối ưu.',
      price: 95000,
      stock: 300,
      imageUrl: 'https://placehold.co/600x400?text=Bach+Tuyet',
    },
    {
      name: 'Sơn Spec Hello Coat',
      description: 'Sơn nội thất, màu sắc đa dạng, chống nấm mốc.',
      price: 550000,
      stock: 80,
      imageUrl: 'https://placehold.co/600x400?text=Spec',
    },
    {
      name: 'Sơn Mykolor Grand Ruby',
      description: 'Sơn nước ngoại thất bóng, chống thấm tuyệt đối.',
      price: 1600000,
      stock: 25,
      imageUrl: 'https://placehold.co/600x400?text=Mykolor',
    },
    {
      name: 'Sơn Toa NanoShield',
      description: 'Công nghệ Nano tự làm sạch, bảo vệ tường nhà.',
      price: 1250000,
      stock: 35,
      imageUrl: 'https://placehold.co/600x400?text=Toa+Nano',
    },
    {
      name: 'Sơn Xịt ATM (Đỏ)',
      description: 'Sơn xịt cầm tay tiện lợi, khô nhanh.',
      price: 35000,
      stock: 500,
      imageUrl: 'https://placehold.co/600x400?text=ATM',
    },
    {
      name: 'Keo Chà Ron Cá Sấu',
      description: 'Chống thấm kẽ gạch, chống nấm mốc đen.',
      price: 25000,
      stock: 1000,
      imageUrl: 'https://placehold.co/600x400?text=Keo+Ca+Sau',
    },
  ];

  // 3. Insert dữ liệu vào DB
  // createMany giúp insert một cục nhanh hơn loop từng cái
  await prisma.product.createMany({
    data: products,
  });

  console.log(`Seeding finished. Created ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });