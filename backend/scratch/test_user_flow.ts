import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const adminCreds = {
  email: 'admin@paint.com',
  password: 'admin123'
};

async function runUserTest() {
  console.log('🚀 Bắt đầu test flow Quản lý User (Admin)...');

  try {
    // 1. Đăng nhập Admin
    console.log('\n1. Đăng nhập Admin...');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, adminCreds);
    const token = loginRes.data.data.accessToken;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('✅ Đăng nhập Admin thành công.');

    // 2. Lấy danh sách toàn bộ User
    console.log('\n2. Lấy danh sách toàn bộ người dùng...');
    const listRes = await axios.get(`${BASE_URL}/users`, config);
    console.log(`✅ Lấy thành công. Có ${listRes.data.data.length} người dùng trong hệ thống.`);

    // 3. Tạo một user mới để test việc xóa
    console.log('\n3. Tạo một user mới để test...');
    const tempUser = {
      email: `user_to_delete_${Date.now()}@example.com`,
      password: 'password123',
      fullName: 'User To Delete'
    };
    const regRes = await axios.post(`${BASE_URL}/auth/register`, tempUser);
    const newUserId = regRes.data.data.id;
    console.log(`✅ Đăng ký User mới thành công. ID: ${newUserId}`);

    // 4. Lấy chi tiết User vừa tạo
    console.log(`\n4. Lấy chi tiết User ID ${newUserId}...`);
    const detailRes = await axios.get(`${BASE_URL}/users/${newUserId}`, config);
    console.log(`✅ Lấy chi tiết thành công. Tên: ${detailRes.data.data.fullName}`);

    // 5. Xóa User vừa tạo
    console.log(`\n5. Xóa User ID ${newUserId}...`);
    const delRes = await axios.delete(`${BASE_URL}/users/${newUserId}`, config);
    console.log(`✅ ${delRes.data.message}`);

    // 6. Kiểm tra lại xem User đã bị xóa chưa
    console.log('\n6. Kiểm tra lại sau khi xóa...');
    try {
      await axios.get(`${BASE_URL}/users/${newUserId}`, config);
      console.log('❌ Lỗi: User vẫn còn tồn tại!');
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        console.log('✅ Kiểm tra: User đã thực sự bị xóa (404 Not Found).');
      } else {
        throw err;
      }
    }

    console.log('\n=========================================');
    console.log('🎉 TEST ADMIN USER MANAGEMENT THÀNH CÔNG! 🎉');
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

runUserTest();
