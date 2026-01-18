import axios from "axios";
import FormData from "form-data";

const AI_SERVICE = process.env.AI_SERVICE_URL || 'http://ai_service:8000';

export const analyzeRoomColor = async (imageBuffer: Buffer, fileName: string) => {
  try {
    // 1. Tạo form data giả lập
    const formData = new FormData();
    // 'file' là key bắt buộc phải khớp với bên Python (main.py)
    formData.append('file', imageBuffer, { filename: fileName });

    // 2. Gọi sang Python Service
    // Lưu ý: Phải set headers từ formData để có đúng Boundary
    const response = await axios.post(`${AI_SERVICE}/analyze`, formData, {
      headers: {
        ...formData.getHeaders()
      }
    });

    // 3. Trả về data (bảng màu)
    return response.data;

  } catch (error: any) {
    throw new Error(`AI service error: ${error}`);
  }
}