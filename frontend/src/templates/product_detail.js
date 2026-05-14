// src/templates/product_detail.js
import { formatPrice } from '../handlers/cart.handler.js';

export const ProductDetailTemplate = (product) => {
    if (!product) return '';

    const thumbUrl = product.imageUrl ? (product.imageUrl.startsWith('http') ? product.imageUrl : `${import.meta.env.VITE_IMAGE_BASE_URL}/${product.imageUrl}`) : 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800';
    const bgColor = product.colorCode || '#FFFFFF';

    return `
    <section class="py-12 md:py-24 min-h-screen container mx-auto">
        <div class="px-6 max-w-6xl mx-auto">
            
            <button onclick="window.history.back()" class="bg-black text-white px-4 py-1 font-black uppercase text-[10px] tracking-widest hover:bg-[#E2725B] transition-colors mb-8 inline-block shadow-[4px_4px_0px_#000]">
                &larr; QUAY LẠI
            </button>
            
            <div class="flex flex-col lg:flex-row gap-8 md:gap-12 bg-white border-4 border-black shadow-[12px_12px_0px_#000] p-6 md:p-16 relative overflow-hidden">
                <!-- Color Background Accent -->
                <div class="absolute top-0 right-0 w-64 h-64 rounded-bl-full opacity-20 pointer-events-none" style="background-color: ${bgColor}"></div>

                <!-- Product Image -->
                <div class="w-full lg:w-1/2">
                    <div class="aspect-[4/5] border-4 border-black overflow-hidden shadow-[8px_8px_0px_#000] relative group bg-gray-100">
                        <img src="${thumbUrl}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0">
                        <div class="absolute bottom-6 left-6 flex items-center gap-4 bg-white border-2 border-black p-2 shadow-[4px_4px_0px_#000]">
                            <div class="w-6 h-6 border-2 border-black" style="background-color: ${bgColor}"></div>
                            <span class="font-black uppercase text-[10px] tracking-widest">${product.colorCode || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                <!-- Product Info -->
                <div class="w-full lg:w-1/2 flex flex-col justify-center relative z-10">
                    <div class="mb-8">
                        <span class="inline-block px-4 py-1 bg-[#20B2AA] text-white text-[12px] font-black uppercase tracking-widest mb-6 border-2 border-black shadow-[4px_4px_0px_#000]">Catalog 2026</span>
                        <h1 class="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 leading-[1.1] md:leading-[0.9]">${product.name}</h1>
                        <div class="flex items-center gap-4 mb-6">
                            <div class="bg-[#F9F7F2] border-2 border-black px-2 py-1 flex items-center gap-1 shadow-[2px_2px_0px_#000]">
                                <span class="font-black text-lg md:text-xl text-[#E2725B]">★ ${product.averageRating || 0}</span>
                            </div>
                            <span class="text-[10px] uppercase font-bold text-gray-400 border-b-2 border-gray-200">(${product.reviewCount || 0} REVIEWS)</span>
                        </div>
                        <p class="text-4xl md:text-5xl font-black tracking-tighter text-white bg-[#E2725B] px-4 py-2 border-4 border-black shadow-[6px_6px_0px_#000] inline-block mt-4">${formatPrice(product.price)}</p>
                    </div>

                    <div class="font-bold text-gray-800 text-lg mb-8 border-l-8 border-black pl-6">
                        <p>${product.description || 'Chưa có mô tả chi tiết cho sản phẩm này. Xin vui lòng liên hệ bộ phận hỗ trợ.'}</p>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-6 mt-4">
                        <div class="flex items-center border-4 border-black bg-white shadow-[4px_4px_0px_#000] flex-shrink-0">
                            <button onclick="updateDetailQty(-1)" class="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-black text-2xl hover:bg-black hover:text-white transition-colors">-</button>
                            <input type="number" id="detail-qty" value="1" min="1" class="w-14 h-12 md:w-16 md:h-14 text-center font-black bg-transparent border-x-4 border-black outline-none text-xl">
                            <button onclick="updateDetailQty(1)" class="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-black text-2xl hover:bg-black hover:text-white transition-colors">+</button>
                        </div>
                        <button onclick="window.addToCartFromDetail(${product.id})" class="btn-brutal bg-[#E2725B] text-xl md:text-2xl flex-1 px-8 whitespace-nowrap">
                            THÊM VÀO GIỎ
                        </button>
                    </div>
                </div>
            </div>

            <!-- Review Section -->
            <div class="mt-20 md:mt-24">
                <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 md:mb-12">Đánh giá <span class="bg-[#20B2AA] text-white px-3 border-2 border-black">Sản phẩm</span></h2>
                
                <div class="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 md:p-10 mb-16">
                    <div id="review-form-container" class="hidden animate-fade-in">
                        <form id="form-review" class="space-y-6">
                            <div class="flex items-center gap-6">
                                <span class="font-black uppercase text-sm">Điểm số:</span>
                                <div class="relative">
                                    <select id="review-rating" class="input-brutal !py-2 !px-4 !w-auto cursor-pointer font-black text-xl">
                                        <option value="5">★★★★★</option>
                                        <option value="4">★★★★</option>
                                        <option value="3">★★★</option>
                                        <option value="2">★★</option>
                                        <option value="1">★</option>
                                    </select>
                                </div>
                            </div>
                            <textarea id="review-comment" rows="4" placeholder="Cảm nghĩ của bạn về sản phẩm..." 
                                      class="input-brutal text-lg resize-none !p-4"></textarea>
                            <button type="submit" class="btn-brutal bg-[#20B2AA] text-white text-lg px-12">GỬI ĐÁNH GIÁ</button>
                        </form>
                    </div>
                    
                    <div id="review-list" class="mt-12 space-y-12">
                        <!-- Reviews will be loaded here -->
                        <div class="flex justify-center py-12">
                            <div class="loader-box"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
    `;
};
