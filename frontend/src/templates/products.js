import { Pagination } from '../components/Pagination.js';

export const ProductListTemplate = (products = [], formatPrice, pagination) => `
  <section class="py-12 px-0 md:px-6">
    <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b-4 border-black pb-8">
        <div>
            <span class="bg-[#20B2AA] text-white px-3 py-1 border-2 border-black font-bold uppercase text-[10px] tracking-widest mb-2 inline-block shadow-[2px_2px_0px_#000]">Catalog 2026</span>
            <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tighter">Bộ sưu tập <span class="bg-[#E2725B] text-white px-2 border-2 border-black shadow-[4px_4px_0px_#000]">Sơn Cao Cấp</span></h2>
        </div>
        <p class="font-bold max-w-xs text-sm uppercase italic hidden md:block">Được chọn lọc khắt khe từ những chuyên gia màu sắc hàng đầu.</p>
    </div>

    ${products.length === 0 ? `
        <div class="py-24 text-center border-4 border-dashed border-black bg-white">
            <p class="text-2xl font-black uppercase italic tracking-widest text-gray-300">Đang cập nhật sản phẩm mới...</p>
        </div>
    ` : `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          ${products.map(p => `
            <div class="group relative bg-white border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col p-0 overflow-hidden hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#000] transition-all cursor-pointer">
              <div onclick="window.navigate('products/${p.id}')" class="absolute inset-0 z-10"></div>
              <div class="aspect-[4/5] overflow-hidden border-b-4 border-black bg-gray-50 relative">
                <img src="${p.imageUrl || 'https://via.placeholder.com/400x500?text=Paint+Shop'}" alt="${p.name}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105">
                <div class="absolute top-4 left-4 w-8 h-8 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]" style="background-color: ${p.colorCode || '#ccc'}"></div>
              </div>
              <div class="p-6 flex flex-col flex-1 relative z-20">
                <h3 class="font-black uppercase text-lg tracking-tight mb-4">${p.name}</h3>
                <div class="flex justify-between items-end mt-auto">
                  <span class="text-2xl font-black">${formatPrice ? formatPrice(p.price) : p.price}</span>
                  <button onclick="window.addToCart(${p.id})" class="w-12 h-12 bg-[#E2725B] text-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        ${pagination ? Pagination(pagination, 'changeUserProductPage') : ''}
    `}
  </section>
`;

export const ProductsPageTemplate = () => `
    <section class="py-12 container mx-auto px-6">
        <div class="flex flex-col lg:grid lg:grid-cols-12 gap-12">
            <!-- Sidebar Filters -->
            <aside class="lg:col-span-3 space-y-8 bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000]">
                <div>
                    <h2 class="text-2xl font-black uppercase tracking-tighter mb-8 border-b-4 border-[#20B2AA] inline-block">Bộ lọc</h2>
                    <div class="space-y-6">
                        <div>
                            <label class="block font-black uppercase text-[10px] tracking-widest mb-2 italic">Tìm kiếm</label>
                            <input type="text" id="filter-search" placeholder="Tên sản phẩm..."
                                   class="input-brutal">
                        </div>
                        <div>
                            <label class="block font-black uppercase text-[10px] tracking-widest mb-2 italic">Khoảng giá</label>
                            <div class="flex flex-col gap-2">
                                <input type="number" id="filter-min-price" placeholder="Từ (VND)"
                                       class="input-brutal">
                                <input type="number" id="filter-max-price" placeholder="Đến (VND)"
                                       class="input-brutal">
                            </div>
                        </div>
                        <button id="btn-apply-filter" class="btn-brutal w-full !py-3 bg-[#E2725B] text-white">Áp dụng</button>
                    </div>

                </div>
            </aside>

            <!-- Product Grid Container -->
            <div class="lg:col-span-9" id="products-container">
                <div class="flex flex-col items-center justify-center h-[50vh] bg-white border-4 border-black border-dashed">
                    <div class="loader-box mb-6"></div>
                    <p class="font-black uppercase tracking-widest text-gray-400 text-xs">Đang nạp dữ liệu...</p>
                </div>
            </div>
        </div>
    </section>
`;
