import axios from "axios";
import FormData from "form-data";
import { prisma } from "../config/prisma";
import { calculateColorDistance } from "../utils/colorUtils";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';

export const analyzeRoomColor = async (imageBuffer: Buffer, fileName: string) => {
  try {

    console.log('--- BẮT ĐẦU GỌI AI SERVICE ---');
    console.log(`1. Target URL: ${AI_SERVICE_URL}/analyze`);
    console.log(`2. File Size: ${imageBuffer.length} bytes`);

    const formData = new FormData();
    // 'file' là key bắt buộc phải khớp với bên Python (main.py)
    formData.append('file', imageBuffer, { filename: fileName });

    // Lưu ý: Phải set headers từ formData để có đúng Boundary
    const headers = formData.getHeaders();
    console.log(`--- [AI Service] Sending to Python: ${AI_SERVICE_URL}/analyze ---`);

    const aiResponse = await axios.post(`${AI_SERVICE_URL}/analyze`, formData, {
      headers: {
        ...headers,
        'Content-Length': headers['content-length'],
      }
    });
    const aiData = aiResponse.data;

    const allProducts = await prisma.product.findMany({
      where: {
        colorCode: {not: null}
      }
    });

    const enhancedPalette = aiData.palette.map((colorItem: any) => {
      let bestMatchProduct = null;
      let minDistance = Infinity;

      for(const product of allProducts) {
        if(!product.colorCode) continue;
        const distance = calculateColorDistance(colorItem.hex, product.colorCode);
        if(distance < minDistance && distance < 10){
          bestMatchProduct = product;
          minDistance = distance;
        }
      }

      let matchScore = 0;
      if (minDistance < 10) {
          matchScore = Math.max(0, Math.round(100 - (minDistance * 10)));
      }

      return {
        ...colorItem,
        matchedProduct: bestMatchProduct 
        ? {
          id: bestMatchProduct.id,
          name: bestMatchProduct.name,
          price: bestMatchProduct.price,
          image: bestMatchProduct.imageUrl,
          colorCode: bestMatchProduct.colorCode,
          matchScore,
          deltaE: parseFloat(minDistance.toFixed(2))
        }
        : null
      }

    });

    return {
      base_color_rgb: aiData.base_color_rgb,
      palette: enhancedPalette
    }

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