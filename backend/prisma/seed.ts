import { PrismaClient, Role } from '@prisma/client';
import { hashPassword } from '../src/utils/password';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  // --- 1. CLEAN UP DATA (QUAN TRỌNG: Thứ tự xóa phải đúng) ---

  // Xóa các bảng con trước (bảng chứa khóa ngoại)
  await prisma.orderItem.deleteMany();      // Xóa chi tiết đơn hàng trước
  await prisma.order.deleteMany();          // Sau đó xóa đơn hàng
  await prisma.analysisHistory.deleteMany(); // Xóa lịch sử AI (vì nó dính tới User)

  // Bây giờ mới được phép xóa các bảng cha (Product, User)
  await prisma.product.deleteMany();
  await prisma.user.deleteMany(); // Xóa luôn User để tạo lại ID cho sạch (hoặc giữ lại tùy bạn)
  console.log('Deleted all existing products.');

  // 2. Danh sách dữ liệu mẫu 
  const products = [
    { name: 'Sơn Dulux Trắng Sữa', description: 'Màu trắng sữa nhẹ nhàng, tinh tế cho không gian sáng sủa', price: 850000, stock: 55, imageUrl: 'https://placehold.co/600x400/FAF9F6/000000?text=Dulux+Trắng+Sữa', colorCode: '#FAF9F6' },
    { name: 'Sơn Dulux Trắng Tuyết', description: 'Trắng tinh khôi, sạch sẽ, phù hợp mọi phong cách', price: 780000, stock: 72, imageUrl: 'https://placehold.co/600x400/FFFFFF/000000?text=Dulux+Trắng+Tuyết', colorCode: '#FFFFFF' },
    { name: 'Sơn Dulux Kem Sáng', description: 'Trắng kem dịu nhẹ, ấm áp và sang trọng', price: 820000, stock: 60, imageUrl: 'https://placehold.co/600x400/FFFDD0/333?text=Dulux+Kem+Sáng', colorCode: '#FFFDD0' },
    { name: 'Sơn Dulux Xám Tro Hiện Đại', description: 'Xám trung tính, phong cách tối giản cực chất', price: 750000, stock: 68, imageUrl: 'https://placehold.co/600x400/808080/fff?text=Dulux+Xám+Tro', colorCode: '#808080' },
    { name: 'Sơn Dulux Xanh Ngọc Lam', description: 'Xanh dương đậm sang trọng, mang hơi thở biển cả', price: 1350000, stock: 38, imageUrl: 'https://placehold.co/600x400/2A5D84/fff?text=Dulux+Xanh+Ngọc', colorCode: '#2A5D84' },
    { name: 'Sơn Dulux Xanh Mint Mát Mẻ', description: 'Xanh bạc hà tươi mát, lý tưởng cho phòng trẻ em', price: 965000, stock: 45, imageUrl: 'https://placehold.co/600x400/98FF98/333?text=Dulux+Mint', colorCode: '#98FF98' },
    { name: 'Sơn Dulux Hồng Phấn Ngọt Ngào', description: 'Hồng phấn nhẹ nhàng, nữ tính cho phòng ngủ', price: 890000, stock: 42, imageUrl: 'https://placehold.co/600x400/FFD1DC/333?text=Dulux+Hồng+Phấn', colorCode: '#FFD1DC' },
    { name: 'Sơn Dulux Nâu Đất Trầm Ấm', description: 'Tông nâu đất cổ điển, ấm cúng và gần gũi', price: 980000, stock: 50, imageUrl: 'https://placehold.co/600x400/6B4C37/fff?text=Dulux+Nâu+Đất', colorCode: '#6B4C37' },
    { name: 'Sơn Dulux Vàng Kem Sunshine', description: 'Vàng kem tươi sáng, năng động và vui vẻ', price: 1150000, stock: 35, imageUrl: 'https://placehold.co/600x400/FFFACD/333?text=Dulux+Vàng+Kem', colorCode: '#FFFACD' },
    { name: 'Sơn Dulux Xanh Lá Nhẹ', description: 'Xanh lá cây dịu dàng, mang lại sự thư giãn', price: 920000, stock: 48, imageUrl: 'https://placehold.co/600x400/90EE90/333?text=Dulux+Xanh+Lá', colorCode: '#90EE90' },

    { name: 'Sơn Dulux Trắng Phấn', description: 'Trắng hơi hướng phấn, thanh lịch và nhẹ nhàng', price: 810000, stock: 65, imageUrl: 'https://placehold.co/600x400/F5F5F5/666?text=Dulux+Trắng+Phấn', colorCode: '#F5F5F5' },
    { name: 'Sơn Dulux Xám Nhạt Tối Giản', description: 'Xám nhạt hiện đại, dễ phối đồ nội thất', price: 740000, stock: 70, imageUrl: 'https://placehold.co/600x400/A9A9A9/fff?text=Dulux+Xám+Nhạt', colorCode: '#A9A9A9' },
    { name: 'Sơn Dulux Xanh Dương Nhạt', description: 'Xanh dương bầu trời nhẹ, thoáng đãng', price: 1050000, stock: 40, imageUrl: 'https://placehold.co/600x400/87CEEB/333?text=Dulux+Xanh+Dương+Nhạt', colorCode: '#87CEEB' },
    { name: 'Sơn Dulux Be Nhạt Ấm Áp', description: 'Be nhẹ ấm, phù hợp phòng khách gia đình', price: 880000, stock: 58, imageUrl: 'https://placehold.co/600x400/F5F5DC/333?text=Dulux+Be+Nhạt', colorCode: '#F5F5DC' },
    { name: 'Sơn Dulux Đỏ Gạch Sang Trọng', description: 'Đỏ gạch đậm, tạo điểm nhấn mạnh mẽ', price: 1250000, stock: 30, imageUrl: 'https://placehold.co/600x400/B22222/fff?text=Dulux+Đỏ+Gạch', colorCode: '#B22222' },
    { name: 'Sơn Dulux Cam Đất', description: 'Cam đất ấm áp, phong cách vintage', price: 990000, stock: 47, imageUrl: 'https://placehold.co/600x400/D2691E/fff?text=Dulux+Cam+Đất', colorCode: '#D2691E' },
    { name: 'Sơn Dulux Tím Pastel', description: 'Tím pastel mơ màng, lãng mạn', price: 950000, stock: 41, imageUrl: 'https://placehold.co/600x400/E6E6FA/333?text=Dulux+Tím+Pastel', colorCode: '#E6E6FA' },
    { name: 'Sơn Dulux Xanh Navy Đậm', description: 'Xanh navy sâu lắng, cực kỳ đẳng cấp', price: 1420000, stock: 28, imageUrl: 'https://placehold.co/600x400/001F3F/fff?text=Dulux+Navy', colorCode: '#001F3F' },
    { name: 'Sơn Dulux Vàng Nhạt', description: 'Vàng nhạt rực rỡ, mang năng lượng tích cực', price: 1080000, stock: 52, imageUrl: 'https://placehold.co/600x400/FFFFE0/333?text=Dulux+Vàng+Nhạt', colorCode: '#FFFFE0' },
    { name: 'Sơn Dulux Xám Bạc', description: 'Xám bạc kim loại, hiện đại công nghiệp', price: 860000, stock: 62, imageUrl: 'https://placehold.co/600x400/C0C0C0/333?text=Dulux+Xám+Bạc', colorCode: '#C0C0C0' },

    { name: 'Sơn Dulux Trắng Sáng', description: 'Trắng sáng rực rỡ cho không gian mở', price: 790000, stock: 75, imageUrl: 'https://placehold.co/600x400/F8F8FF/333?text=Dulux+Trắng+Sáng', colorCode: '#F8F8FF' },
    { name: 'Sơn Dulux Kem Đậm', description: 'Kem đậm ấm cúng, phong cách cổ điển', price: 840000, stock: 54, imageUrl: 'https://placehold.co/600x400/FFE4C4/333?text=Dulux+Kem+Đậm', colorCode: '#FFE4C4' },

    { name: 'Sơn Dulux Xanh Lá Mạ', description: 'Xanh lá mạ tươi mới, gần gũi thiên nhiên', price: 930000, stock: 44, imageUrl: 'https://placehold.co/600x400/32CD32/fff?text=Dulux+Xanh+Mạ', colorCode: '#32CD32' },
    { name: 'Sơn Dulux Hồng Sen', description: 'Hồng sen nhẹ nhàng, thanh tao', price: 910000, stock: 39, imageUrl: 'https://placehold.co/600x400/FFC0CB/333?text=Dulux+Hồng+Sen', colorCode: '#FFC0CB' },
    { name: 'Sơn Dulux Nâu Cafe', description: 'Nâu cafe trầm ấm, cổ điển', price: 1020000, stock: 46, imageUrl: 'https://placehold.co/600x400/6F4E37/fff?text=Dulux+Nâu+Cafe', colorCode: '#6F4E37' },
    { name: 'Sơn Dulux Xám Đậm', description: 'Xám đậm mạnh mẽ, phong cách urban', price: 820000, stock: 59, imageUrl: 'https://placehold.co/600x400/696969/fff?text=Dulux+Xám+Đậm', colorCode: '#696969' },
    { name: 'Sơn Dulux Vàng Mustard', description: 'Vàng mustard nổi bật, cá tính', price: 1180000, stock: 33, imageUrl: 'https://placehold.co/600x400/FFDB58/333?text=Dulux+Mustard', colorCode: '#FFDB58' },
    { name: 'Sơn Dulux Xanh Biển', description: 'Xanh biển sâu, thư giãn tuyệt đối', price: 1280000, stock: 37, imageUrl: 'https://placehold.co/600x400/20B2AA/fff?text=Dulux+Xanh+Biển', colorCode: '#20B2AA' },
    { name: 'Sơn Dulux Tím Lavender', description: 'Tím lavender dịu dàng, thư thái', price: 970000, stock: 43, imageUrl: 'https://placehold.co/600x400/E6E6FA/333?text=Dulux+Lavender', colorCode: '#E6E6FA' },
    { name: 'Sơn Dulux Đỏ Rượu Vang', description: 'Đỏ rượu vang sang trọng, ấm cúng', price: 1320000, stock: 31, imageUrl: 'https://placehold.co/600x400/800000/fff?text=Dulux+Đỏ+Rượu', colorCode: '#800000' },
    { name: 'Sơn Dulux Be Cát', description: 'Be cát nhẹ, phong cách sa mạc hiện đại', price: 870000, stock: 56, imageUrl: 'https://placehold.co/600x400/F4A460/333?text=Dulux+Be+Cát', colorCode: '#F4A460' },
    { name: 'Sơn Dulux Trắng Ngọc Trai', description: 'Trắng ngọc trai óng ánh, cao cấp', price: 950000, stock: 51, imageUrl: 'https://placehold.co/600x400/EAE0D5/333?text=Dulux+Ngọc+Trai', colorCode: '#EAE0D5' },
    {
      name: 'Sơn Dulux Xanh Lá Olive',
      description: 'Xanh olive trầm ấm, mang cảm giác gần gũi thiên nhiên',
      price: 980000,
      stock: 41,
      imageUrl: 'https://placehold.co/600x400/6B8E23/ffffff?text=Dulux+Olive',
      colorCode: '#6B8E23'
    },
    {
      name: 'Sơn Dulux Hồng Cam San Hô',
      description: 'Hồng cam tươi trẻ, tạo điểm nhấn năng động cho không gian',
      price: 920000,
      stock: 37,
      imageUrl: 'https://placehold.co/600x400/FF7F50/333333?text=Dulux+San+Hô',
      colorCode: '#FF7F50'
    },
    {
      name: 'Sơn Dulux Xám Xi Măng',
      description: 'Xám xi măng công nghiệp, cực hợp phong cách loft',
      price: 810000,
      stock: 63,
      imageUrl: 'https://placehold.co/600x400/778899/ffffff?text=Dulux+Xi+Măng',
      colorCode: '#778899'
    },
    {
      name: 'Sơn Dulux Vàng Mật Ong',
      description: 'Vàng mật ong ấm áp, mang lại cảm giác dễ chịu',
      price: 1050000,
      stock: 44,
      imageUrl: 'https://placehold.co/600x400/DAA520/333333?text=Dulux+Mật+Ong',
      colorCode: '#DAA520'
    },
    {
      name: 'Sơn Dulux Trắng Kem Vân',
      description: 'Trắng kem có hiệu ứng vân nhẹ, sang trọng tinh tế',
      price: 960000,
      stock: 52,
      imageUrl: 'https://placehold.co/600x400/FAF0E6/333333?text=Dulux+Kem+Vân',
      colorCode: '#FAF0E6'
    },
    {
      name: 'Sơn Dulux Xanh Dương Thiên Thanh',
      description: 'Xanh dương nhạt như bầu trời, thoáng đãng và thư giãn',
      price: 1120000,
      stock: 39,
      imageUrl: 'https://placehold.co/600x400/ADD8E6/333333?text=Dulux+Thiên+Thanh',
      colorCode: '#ADD8E6'
    },
    {
      name: 'Sơn Dulux Nâu Gỗ Óc Chó',
      description: 'Nâu gỗ óc chó đậm, phong cách cổ điển cao cấp',
      price: 1180000,
      stock: 34,
      imageUrl: 'https://placehold.co/600x400/5C3317/ffffff?text=Dulux+Óc+Chó',
      colorCode: '#5C3317'
    },
    {
      name: 'Sơn Dulux Tím Than',
      description: 'Tím than trầm lắng, bí ẩn và đẳng cấp',
      price: 1030000,
      stock: 46,
      imageUrl: 'https://placehold.co/600x400/4B0082/ffffff?text=Dulux+Tím+Than',
      colorCode: '#4B0082'
    },
    {
      name: 'Sơn Dulux Xám Ngọc Trai',
      description: 'Xám ngọc trai óng ánh, hiện đại và thanh lịch',
      price: 890000,
      stock: 58,
      imageUrl: 'https://placehold.co/600x400/B0C4DE/333333?text=Dulux+Ngọc+Trai',
      colorCode: '#B0C4DE'
    },
    {
      name: 'Sơn Dulux Đỏ Đô',
      description: 'Đỏ đô trầm ấm, sang trọng cho không gian cổ điển',
      price: 1240000,
      stock: 32,
      imageUrl: 'https://placehold.co/600x400/800020/ffffff?text=Dulux+Đỏ+Đô',
      colorCode: '#800020'
    },
    {
      name: 'Sơn Dulux Be Cát Sa Mạc',
      description: 'Be cát nhạt, phong cách sa mạc tối giản',
      price: 870000,
      stock: 55,
      imageUrl: 'https://placehold.co/600x400/F4EBD0/333333?text=Dulux+Sa+Mạc',
      colorCode: '#F4EBD0'
    },
    {
      name: 'Sơn Dulux Xanh Rêu',
      description: 'Xanh rêu tự nhiên, mang hơi thở rừng xanh',
      price: 940000,
      stock: 48,
      imageUrl: 'https://placehold.co/600x400/556B2F/ffffff?text=Dulux+Rêu',
      colorCode: '#556B2F'
    },
    {
      name: 'Sơn Dulux Hồng Đào',
      description: 'Hồng đào nhẹ nhàng, nữ tính và tươi trẻ',
      price: 910000,
      stock: 43,
      imageUrl: 'https://placehold.co/600x400/FFDAB9/333333?text=Dulux+Hồng+Đào',
      colorCode: '#FFDAB9'
    },
    {
      name: 'Sơn Dulux Vàng Chanh',
      description: 'Vàng chanh rực rỡ, tràn đầy năng lượng',
      price: 1080000,
      stock: 36,
      imageUrl: 'https://placehold.co/600x400/FFF44F/333333?text=Dulux+Vàng+Chanh',
      colorCode: '#FFF44F'
    },
    {
      name: 'Sơn Dulux Xám Khói',
      description: 'Xám khói nhẹ, phong cách hiện đại tinh tế',
      price: 830000,
      stock: 67,
      imageUrl: 'https://placehold.co/600x400/708090/ffffff?text=Dulux+Khói',
      colorCode: '#708090'
    },
    {
      name: 'Sơn Dulux Nâu Mocha',
      description: 'Nâu mocha ấm áp như cà phê, rất dễ chịu',
      price: 990000,
      stock: 49,
      imageUrl: 'https://placehold.co/600x400/967969/ffffff?text=Dulux+Mocha',
      colorCode: '#967969'
    },
    {
      name: 'Sơn Dulux Trắng Vân Mây',
      description: 'Trắng vân mây nhẹ, tạo cảm giác rộng rãi',
      price: 920000,
      stock: 53,
      imageUrl: 'https://placehold.co/600x400/FDFD96/333333?text=Dulux+Vân+Mây',
      colorCode: '#FDFD96'
    },
    {
      name: 'Sơn Dulux Xanh Lam Đậm',
      description: 'Xanh lam đậm cổ điển, mang vẻ quý phái',
      price: 1290000,
      stock: 35,
      imageUrl: 'https://placehold.co/600x400/483D8B/ffffff?text=Dulux+Lam+Đậm',
      colorCode: '#483D8B'
    },
    {
      name: 'Sơn Dulux Cam Đất Terracotta',
      description: 'Cam đất terracotta, phong cách Địa Trung Hải',
      price: 1010000,
      stock: 40,
      imageUrl: 'https://placehold.co/600x400/E2725B/333333?text=Dulux+Terracotta',
      colorCode: '#E2725B'
    },
    {
      name: 'Sơn Dulux Tím Hoa Oải Hương',
      description: 'Tím hoa oải hương dịu dàng, thư giãn tuyệt đối',
      price: 975000,
      stock: 45,
      imageUrl: 'https://placehold.co/600x400/C3B1E1/333333?text=Dulux+Oải+Hương',
      colorCode: '#C3B1E1'
    }
  ];

  // 3. Insert dữ liệu vào DB
  await prisma.product.createMany({
    data: products,
  });

  // 1. Tạo mẫu Admin Account
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@paint.com' },
    update: {},
    create: {
      email: 'admin@paint.com',
      password: adminPassword,
      fullName: 'System Administrator',
      role: Role.ADMIN, // Set role ADMIN
    },
  });

  // 2. Tạo mẫu Normal User
  const userPassword = await hashPassword('user123');
  const user = await prisma.user.upsert({
    where: { email: 'user@paint.com' },
    update: {},
    create: {
      email: 'user@paint.com',
      password: userPassword,
      fullName: 'Normal Customer',
      role: Role.USER, // Default role
    },
  });

  console.log({ admin, user });

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