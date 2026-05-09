import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const testUser = {
  email: `test_user_${Date.now()}@example.com`,
  password: 'password123',
  fullName: 'Test User'
};

async function runTest() {
  console.log('🚀 Bắt đầu test flow Item Collection...');

  try {
    // 1. Đăng ký tài khoản mới
    console.log('\n1. Đăng ký tài khoản test...');
    await axios.post(`${BASE_URL}/auth/register`, testUser);
    console.log('✅ Đăng ký thành công.');

    // 2. Đăng nhập để lấy token
    console.log('\n2. Đăng nhập...');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    const token = loginRes.data.data.accessToken;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('✅ Đăng nhập thành công, đã lấy Token.');

    // 3. Tạo bộ sưu tập mới
    console.log('\n3. Tạo bộ sưu tập...');
    const collRes = await axios.post(`${BASE_URL}/collections`, {
      name: 'Bộ sưu tập Test',
      description: 'Dùng để test automation'
    }, config);
    const collectionId = collRes.data.data.id;
    console.log(`✅ Tạo thành công Collection ID: ${collectionId}`);

    // 4. Thêm sản phẩm vào bộ sưu tập (Dùng Product ID 58)
    const productId = 58; 
    console.log(`\n4. Thêm sản phẩm ID ${productId} vào bộ sưu tập...`);
    const addItemRes = await axios.post(`${BASE_URL}/collections/${collectionId}/items`, {
      productId
    }, config);
    console.log('✅ Thêm sản phẩm thành công.');

    // 5. Kiểm tra chi tiết bộ sưu tập xem có sản phẩm chưa
    console.log('\n5. Kiểm tra chi tiết bộ sưu tập...');
    const detailRes = await axios.get(`${BASE_URL}/collections/${collectionId}`, config);
    const items = detailRes.data.data.items;
    const itemExists = items.some((item: any) => item.productId === productId);
    if (itemExists) {
      console.log('✅ Kiểm tra: Sản phẩm ĐÃ có trong bộ sưu tập.');
    } else {
      throw new Error('❌ Lỗi: Không tìm thấy sản phẩm trong bộ sưu tập!');
    }

    // 6. Xóa sản phẩm khỏi bộ sưu tập
    console.log(`\n6. Xóa sản phẩm ID ${productId} khỏi bộ sưu tập...`);
    await axios.delete(`${BASE_URL}/collections/${collectionId}/items/${productId}`, config);
    console.log('✅ Xóa sản phẩm thành công.');

    // 7. Kiểm tra lại bộ sưu tập
    console.log('\n7. Kiểm tra lại bộ sưu tập sau khi xóa...');
    const detailRes2 = await axios.get(`${BASE_URL}/collections/${collectionId}`, config);
    if (detailRes2.data.data.items.length === 0) {
      console.log('✅ Kiểm tra: Bộ sưu tập hiện tại đã trống.');
    } else {
      console.log('⚠️ Cảnh báo: Bộ sưu tập vẫn còn sản phẩm.');
    }

    // 8. Dọn dẹp: Xóa bộ sưu tập
    console.log('\n8. Dọn dẹp: Xóa bộ sưu tập test...');
    await axios.delete(`${BASE_URL}/collections/${collectionId}`, config);
    console.log('✅ Đã dọn dẹp sạch sẽ.');

    console.log('\n=========================================');
    console.log('🎉 TẤT CẢ CÁC BƯỚC TEST ĐỀU THÀNH CÔNG! 🎉');
    console.log('=========================================');

  } catch (error: any) {
    console.error('\n❌ TEST THẤT BẠI!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Message:', error.message);
    }
    process.exit(1);
  }
}

runTest();
