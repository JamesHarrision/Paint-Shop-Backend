import { Pagination } from '../components/Pagination.js';

export const ProductListTemplate = (products = [], formatPrice, pagination) => `
  <section class="py-24 container mx-auto px-6">
    <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
            <span class="text-xs font-black uppercase tracking-widest text-terracotta">Catalog 2026</span>
            <h2 class="text-6xl font-black uppercase mt-2">Bộ sưu tập <br> <span class="font-serif italic capitalize text-4xl">Sơn cao cấp</span></h2>
        </div>
        <p class="text-slate-500 max-w-xs text-sm">Được chọn lọc khắt khe từ những chuyên gia màu sắc hàng đầu thế giới.</p>
    </div>

    ${products.length === 0 ? `
        <div class="py-24 text-center border-4 border-dashed border-slate-200">
            <p class="text-xl font-black uppercase text-slate-300 italic tracking-widest">Đang cập nhật sản phẩm mới...</p>
        </div>
    ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          ${products.map(p => `
            <div class="group relative card-retro flex flex-col p-0 overflow-hidden hover:-translate-y-2 transition-all">
              <div class="aspect-[4/5] overflow-hidden border-b-2 border-charcoal bg-slate-100">
                <img src="${p.imageUrl || 'https://via.placeholder.com/400x500?text=Paint+Shop'}" alt="${p.name}" class="w-full h-full object-cover transition-transform group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0">
              </div>
              <div class="p-6 flex flex-col flex-1">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-black uppercase text-sm tracking-tight leading-none">${p.name}</h3>
                    <div class="w-6 h-6 rounded-full border border-charcoal shadow-retro-sm shrink-0" style="background-color: ${p.colorCode || '#ccc'}"></div>
                </div>
                <div class="flex justify-between items-end mt-auto">
                  <span class="text-xl font-black">${formatPrice ? formatPrice(p.price) : p.price}</span>
                  <button onclick="window.addToCart(${p.id})" class="w-10 h-10 bg-charcoal text-white flex items-center justify-center hover:bg-terracotta transition-colors shadow-retro-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
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
    <section class="py-24 container mx-auto px-6">
        <div class="flex flex-col lg:flex-row gap-12">
            <!-- Sidebar Filters -->
            <aside class="lg:w-1/4 space-y-12">
                <div>
                    <h2 class="text-4xl font-black uppercase italic leading-none mb-8">Tìm <br> <span class="not-italic text-terracotta">Kiếm</span></h2>
                    <div class="relative">
                        <input type="text" id="filter-search" placeholder="Tên sản phẩm..." class="w-full bg-white border-4 border-charcoal p-4 outline-none focus:bg-slate-50 transition-colors font-bold shadow-retro-sm">
                    </div>
                </div>

                <div>
                    <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Khoảng giá</h3>
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <input type="number" id="filter-min-price" placeholder="Từ" class="w-1/2 bg-white border-2 border-charcoal p-3 outline-none text-xs font-bold">
                            <span class="font-black">-</span>
                            <input type="number" id="filter-max-price" placeholder="Đến" class="w-1/2 bg-white border-2 border-charcoal p-3 outline-none text-xs font-bold">
                        </div>
                    </div>
                </div>

                <button id="btn-apply-filter" class="w-full py-4 bg-charcoal text-cream font-black uppercase text-[10px] tracking-widest hover:bg-terracotta transition-all shadow-retro">Áp dụng lọc</button>
            </aside>

            <!-- Product Grid Container -->
            <div class="lg:w-3/4" id="products-container">
                <div class="flex items-center justify-center h-[60vh]">
                    <div class="w-8 h-8 border-4 border-charcoal border-t-terracotta animate-spin"></div>
                </div>
            </div>
        </div>
    </section>
`;
