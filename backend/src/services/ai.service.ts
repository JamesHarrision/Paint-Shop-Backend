import axios from "axios";
import FormData from "form-data";
import redis from "../config/redis";
import { calculateColorDistance } from "../utils/color.util";
import { ProductRepository } from "../repositories/product.repository";
import { AnalysisRepository } from "../repositories/analysis.repository";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';
const REDIS_COLOR_KEY = 'product:color-lookup';

export class AiService {
  private productRepo = new ProductRepository();
  private analysisRepo = new AnalysisRepository();

  private async getAllProductsForAI() {
    const cachedData = await redis.get(REDIS_COLOR_KEY);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const { products } = await this.productRepo.findAndCount({
        page: 1,
        limit: 1000 // Lấy nhiều một chút để AI tra cứu
    });

    const productsWithColor = products.filter(p => p.colorCode !== null);

    if (productsWithColor.length > 0) {
      await redis.set(REDIS_COLOR_KEY, JSON.stringify(productsWithColor), 'EX', 3600);
    }

    return productsWithColor;
  }

  public analyzeRoomColor = async (filePath: string, userId: number) => {
    try {
      // 1. Tải ảnh từ Cloudinary/URL về Buffer
      const imageResponse = await axios.get(filePath, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(imageResponse.data, 'binary');

      const formData = new FormData();
      formData.append('file', imageBuffer, { filename: 'upload.jpg' });

      const headers = formData.getHeaders();
      
      // 2. Gọi Python AI Service
      const aiResponse = await axios.post(`${AI_SERVICE_URL}/analyze`, formData, {
        headers: {
          ...headers,
          'Content-Length': headers['content-length'],
        }
      });
      const aiData = aiResponse.data;

      // 3. Tra cứu sản phẩm phù hợp nhất cho bảng màu
      const allProducts = await this.getAllProductsForAI();

      const enhancedPalette = aiData.palette.map((colorItem: any) => {
        let bestMatchProduct = null;
        let minDistance = Infinity;

        for (const product of allProducts) {
          if (!product.colorCode) continue;
          const distance = calculateColorDistance(colorItem.hex, product.colorCode);
          if (distance < minDistance && distance < 10) {
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

      const finalResult = {
        base_color_rgb: aiData.base_color_rgb,
        palette: enhancedPalette
      }

      // 4. Lưu lịch sử phân tích
      await this.analysisRepo.create({
        userId: userId,
        imageUrl: filePath,
        result: finalResult as any
      });

      return finalResult;

    } catch (error: any) {
      console.error('!!! LỖI Ở AI SERVICE !!!', error.message);
      throw new Error(`AI analysis failed: ${error.message}`);
    }
  }

  public getHistoryByUserId = async (userId: number) => {
    return await this.analysisRepo.findAllByUserId(userId);
  }
}