import axios from "axios";
import FormData from "form-data";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';

export const analyzeRoomColor = async (imageBuffer: Buffer, fileName: string) => {
  try {

    console.log('--- BẮT ĐẦU GỌI AI SERVICE ---');
    console.log(`1. Target URL: ${AI_SERVICE_URL}/analyze`);
    console.log(`2. File Size: ${imageBuffer.length} bytes`);

    // 1. Tạo form data giả lập
    const formData = new FormData();
    // 'file' là key bắt buộc phải khớp với bên Python (main.py)
    formData.append('file', imageBuffer, { filename: fileName });

    // 2. Gọi sang Python Service
    // Lưu ý: Phải set headers từ formData để có đúng Boundary
    const headers = formData.getHeaders();
    console.log(`--- [AI Service] Sending to Python: ${AI_SERVICE_URL}/analyze ---`);

    // 3. Gọi Axios
    const response = await axios.post(`${AI_SERVICE_URL}/analyze`, formData, {
      headers: {
        ...headers,
        'Content-Length': headers['content-length'],
      }
    });

    // 3. Trả về data (bảng màu)
    return response.data;

  } catch (error: any) {
    console.error('!!! LỖI Ở AI SERVICE !!!');
    // Log chi tiết lỗi axios để debug
    if (error.response) {
        // Server đã trả về status code khác 2xx (ví dụ 422, 500)
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
    } else if (error.request) {
        // Đã gửi request nhưng không nhận được hồi âm
        console.error('No response received from Python.');
    } else {
        console.error('Error config:', error.message);
    }
    throw new Error(`AI service error: ${error}`);
  }
}