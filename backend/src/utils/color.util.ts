import chroma from "chroma-js";

// /**
//  * Tính khoảng cách màu chuẩn mắt người (Delta E - CIE2000)
//  * Sử dụng thuật toán CMC l:c (1984) hoặc CIE2000 mặc định của chroma-js
//  * @param hex1 Mã màu gốc (VD: #ffffff)
//  * @param hex2 Mã màu so sánh
//  * @returns number (Càng nhỏ càng giống, < 2.3 là rất giống)
//  */

export const calculateColorDistance = (hex1: string, hex2: string) => {
  try {
    // chroma.deltaE mặc định dùng thuật toán CIE76 (đơn giản, nhanh)
    // Nếu muốn chính xác tuyệt đối như các hãng sơn, có thể dùng cmc hoặc cie2000 nếu thư viện hỗ trợ sâu,
    // nhưng mặc định của chroma-js là đủ tốt hơn RGB gấp nhiều lần.

    return chroma.deltaE(hex1, hex2);    
  } catch (error: any) {
    console.log('Calculated color distance error');
    return Infinity;
  }
}

//Hàm phụ trợ để kiểm tra xem màu có hợp lệ không
export const isValidHex = (hex: string) => {
  return chroma.valid(hex);
}

