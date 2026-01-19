from fastapi import FastAPI, UploadFile, File, HTTPException
from sklearn.cluster import KMeans
from PIL import Image
import numpy as np
import io
import colorsys

app = FastAPI()

def rgb_to_hex(rgb):
    """Chuyển đổi RGB tuple sang mã Hex."""
    return '#{:02x}{:02x}{:02x}'.format(int(rgb[0]), int(rgb[1]), int(rgb[2]))

def get_dominant_color(image_bytes):
    """
    Sử dụng K-Means để tìm màu chủ đạo của bức ảnh.
    """
    try:
        # 1. Đọc ảnh và convert sang RGB
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        # 2. Resize ảnh để xử lý nhanh hơn (không cần độ phân giải gốc)
        image = image.resize((150, 150))
        
        # 3. Chuyển đổi thành mảng numpy các pixels
        image_array = np.array(image)
        pixels = image_array.reshape((-1, 3))
        
        # 4. Dùng K-Means với k=1 để tìm màu phổ biến nhất
        kmeans = KMeans(n_clusters=1, n_init=10)
        kmeans.fit(pixels)
        
        # Trả về màu trung tâm (màu chủ đạo)
        dominant_color = kmeans.cluster_centers_[0]
        return dominant_color
    except Exception as e:
        print(f"Error processing image: {e}")
        raise HTTPException(status_code=400, detail="Invalid image file")

def generate_palette(base_rgb):
    """
    Tạo bảng màu dựa trên Color Theory (Lý thuyết màu sắc).
    """
    r, g, b = base_rgb
    # Chuyển sang hệ màu HSV để dễ tính toán phối màu
    h, s, v = colorsys.rgb_to_hsv(r/255, g/255, b/255)
    
    palette = []
    
    # 1. Màu chủ đạo (Base)
    palette.append({
        "type": "Dominant",
        "hex": rgb_to_hex(base_rgb),
        "note": "Màu chủ đạo từ căn phòng"
    })
    
    # 2. Màu bổ túc (Complementary) - Đối diện trên vòng tròn màu (cộng thêm 0.5 hue)
    h_comp = (h + 0.5) % 1.0
    r_c, g_c, b_c = colorsys.hsv_to_rgb(h_comp, s, v)
    palette.append({
        "type": "Complementary",
        "hex": rgb_to_hex((r_c*255, g_c*255, b_c*255)),
        "note": "Màu tương phản, tạo điểm nhấn mạnh"
    })
    
    # 3. Màu tương đồng (Analogous) - Lân cận trên vòng tròn màu
    h_ana = (h + 0.1) % 1.0
    r_a, g_a, b_a = colorsys.hsv_to_rgb(h_ana, s, v)
    palette.append({
        "type": "Analogous",
        "hex": rgb_to_hex((r_a*255, g_a*255, b_a*255)),
        "note": "Màu hài hòa, tạo cảm giác dễ chịu"
    })

    # 4. Màu sáng hơn (Tint) - Tăng độ sáng (Value) hoặc giảm bão hòa
    r_t, g_t, b_t = colorsys.hsv_to_rgb(h, s * 0.5, min(v * 1.5, 1.0))
    palette.append({
        "type": "Light Tint",
        "hex": rgb_to_hex((r_t*255, g_t*255, b_t*255)),
        "note": "Màu nền, làm sáng không gian"
    })
    
    return palette

@app.get("/")
def health_check():
    return {"status": "AI Service is running"}

@app.post("/analyze")
async def analyze_room(file: UploadFile = File(...)):
    """
    API nhận file ảnh -> trả về bộ màu gợi ý JSON.
    """
    # Đọc bytes từ file upload
    content = await file.read()
    
    # Tìm màu chủ đạo
    dominant_rgb = get_dominant_color(content)
    
    # Tạo bảng màu gợi ý
    suggestion = generate_palette(dominant_rgb)
    
    return {
        "success": True,
        "base_color_rgb": [int(c) for c in dominant_rgb],
        "palette": suggestion
    }

if __name__ == "__main__":
    # Phải thêm host='0.0.0.0'
    app.run(host='0.0.0.0', port=8000)