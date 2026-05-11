// src/templates/product_detail.js
import { formatPrice } from '../handlers/cart.handler.js';

export const ProductDetailTemplate = (product) => {
    if (!product) return '';

    const thumbUrl = product.imageUrl ? (product.imageUrl.startsWith('http') ? product.imageUrl : `http://localhost:3000/${product.imageUrl}`) : 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800';
    const bgColor = product.colorCode || '#FFFFFF';

    return `
    <section class="py-24 bg-cream min-h-screen">
        <div class="container mx-auto px-6 max-w-5xl">
            
            <button onclick="window.history.back()" class="text-xs uppercase font-black tracking-widest hover:text-terracotta transition-colors mb-8 flex items-center gap-2">
                <span>&larr;</span> Quay lại
            </button>
            
            <div class="flex flex-col md:flex-row gap-12 bg-white border-4 border-charcoal shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 relative overflow-hidden">
                <!-- Color Background Accent -->
                <div class="absolute top-0 right-0 w-64 h-64 rounded-bl-full opacity-20 pointer-events-none" style="background-color: ${bgColor}"></div>

                <!-- Product Image -->
                <div class="w-full md:w-1/2">
                    <div class="aspect-[4/5] border-4 border-charcoal overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative group">
                        <img src="${thumbUrl}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        <div class="absolute bottom-4 right-4 w-12 h-12 rounded-full border-4 border-charcoal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style="background-color: ${bgColor}"></div>
                    </div>
                </div>

                <!-- Product Info -->
                <div class="w-full md:w-1/2 flex flex-col justify-center relative z-10">
                    <div class="mb-4">
                        <span class="inline-block px-3 py-1 bg-charcoal text-white text-[10px] font-black uppercase tracking-widest mb-4">Sơn Cao Cấp</span>
                        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 leading-tight">${product.name}</h1>
                        <p class="text-3xl font-black text-terracotta mb-6">${formatPrice(product.price)}đ</p>
                    </div>

                    <div class="prose prose-sm text-charcoal/80 font-medium mb-8">
                        <p>${product.description || 'Chưa có mô tả chi tiết cho sản phẩm này. Xin vui lòng liên hệ bộ phận hỗ trợ.'}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-8">
                        <div class="border-2 border-charcoal p-4 text-center">
                            <span class="block text-[10px] uppercase font-black opacity-50 mb-1">Dung tích</span>
                            <span class="font-bold">5 Lít</span>
                        </div>
                        <div class="border-2 border-charcoal p-4 text-center">
                            <span class="block text-[10px] uppercase font-black opacity-50 mb-1">Mã Màu</span>
                            <span class="font-bold uppercase">${product.colorCode || 'N/A'}</span>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <div class="flex items-center border-4 border-charcoal">
                            <button onclick="updateDetailQty(-1)" class="w-12 h-12 flex items-center justify-center font-black hover:bg-charcoal hover:text-white transition-colors">-</button>
                            <input type="number" id="detail-qty" value="1" min="1" class="w-16 h-12 text-center font-black bg-transparent border-x-4 border-charcoal outline-none">
                            <button onclick="updateDetailQty(1)" class="w-12 h-12 flex items-center justify-center font-black hover:bg-charcoal hover:text-white transition-colors">+</button>
                        </div>
                        <button onclick="window.addToCartFromDetail(${product.id})" class="flex-1 btn-retro text-lg">
                            Thêm Vào Giỏ
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </section>
    `;
};
