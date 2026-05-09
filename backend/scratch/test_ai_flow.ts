import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000/api';
const adminCreds = {
  email: 'admin@paint.com',
  password: 'admin123'
};

async function runAITest() {
  console.log('🚀 Bắt đầu test flow AI Analyzer...');

  try {
    // 1. Đăng nhập
    console.log('\n1. Đăng nhập...');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, adminCreds);
    const token = loginRes.data.data.accessToken;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('✅ Đăng nhập thành công.');

    // 2. Chuẩn bị file ảnh để upload
    console.log('\n2. Chuẩn bị file ảnh test...');
    const imagePath = path.join(__dirname, '../uploads/1768982718853-170943574.jpg');
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Không tìm thấy file ảnh tại: ${imagePath}`);
    }

    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));

    // 3. Gọi API phân tích AI
    console.log('\n3. Đang gửi ảnh sang Backend để AI phân tích (Vui lòng đợi)...');
    const aiRes = await axios.post(`${BASE_URL}/ai/analyze`, formData, {
      headers: {
        ...config.headers,
        ...formData.getHeaders()
      }
    });

    const result = aiRes.data.data;
    console.log('✅ Phân tích thành công!');
    console.log('\n--- KẾT QUẢ AI ---');
    console.log('Màu chủ đạo (RGB):', result.base_color_rgb);
    console.log('Số lượng màu trong Palette:', result.palette.length);
    
    // In ra các màu và sản phẩm khớp (nếu có)
    result.palette.forEach((item: any, index: number) => {
      const matchStatus = item.matchedProduct 
        ? `🔥 Khớp với: ${item.matchedProduct.name} (${item.matchedProduct.matchScore}%)`
        : '☁️ Không tìm thấy sản phẩm khớp';
      console.log(`[Color ${index + 1}] Hex: ${item.hex} | ${matchStatus}`);
    });

    // 4. Kiểm tra lịch sử
    console.log('\n4. Kiểm tra lịch sử phân tích...');
    const historyRes = await axios.get(`${BASE_URL}/ai/history`, config);
    console.log(`✅ Lấy lịch sử thành công. Có ${historyRes.data.data.length} lượt phân tích trong DB.`);

    console.log('\n=========================================');
    console.log('🎉 TEST AI FLOW THÀNH CÔNG RỰC RỠ! 🎉');
    console.log('=========================================');

  } catch (error: any) {
    console.error('\n❌ TEST AI THẤT BẠI!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
      console.log('\n💡 Gợi ý: Hãy đảm bảo Python AI Service đang chạy ở port 8000.');
    } else {
      console.error('Message:', error.message);
    }
    process.exit(1);
  }
}

runAITest();
