// src/templates/collections.js
import { state } from '../state.js';

export const CollectionsPageTemplate = () => {
  return `
    <section class="py-24 bg-cream min-h-screen">
        <div class="container mx-auto px-6 max-w-6xl">
            <div class="flex justify-between items-end mb-12 border-b-4 border-charcoal pb-4">
                <div>
                    <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                        Bộ sưu tập <span class="text-terracotta italic">Cộng đồng</span>
                    </h2>
                    <p class="text-xs uppercase font-bold tracking-[0.3em] mt-2 opacity-60">
                        Khám phá những bảng màu sáng tạo nhất
                    </p>
                </div>
                ${state.user ? `
                    <button onclick="window.showAddCollectionModal()" class="btn-retro">Tạo Bộ Sưu Tập</button>
                ` : ''}
            </div>

            <!-- Tabs -->
            ${state.user ? `
            <div class="flex gap-4 mb-8">
                <button id="tab-public" class="px-6 py-2 border-2 border-charcoal bg-charcoal text-cream font-black uppercase tracking-widest text-[10px] transition-all">Tất cả</button>
                <button id="tab-my" class="px-6 py-2 border-2 border-charcoal text-charcoal font-black uppercase tracking-widest text-[10px] transition-all hover:bg-charcoal/10">Của tôi</button>
            </div>
            ` : ''}

            <!-- Loading State -->
            <div id="collections-loader" class="py-24 text-center">
                <div class="w-12 h-12 border-4 border-charcoal border-t-terracotta animate-spin mx-auto mb-4"></div>
                <p class="font-black uppercase text-xs tracking-widest">Đang tải dữ liệu...</p>
            </div>

            <!-- Collections Grid -->
            <div id="collections-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hidden">
                <!-- Data will be populated here -->
            </div>
            
            <!-- Empty State -->
            <div id="collections-empty" class="hidden text-center py-24">
                <p class="font-black uppercase text-2xl opacity-20">Chưa có bộ sưu tập nào</p>
            </div>
        </div>
    </section>

    <!-- Modal Create/Edit Collection -->
    ${state.user ? `
    <div id="collection-modal" class="fixed inset-0 z-[10005] bg-cream/90 flex items-center justify-center hidden">
        <div class="bg-white border-4 border-charcoal p-8 max-w-lg w-full mx-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <button onclick="window.closeCollectionModal()" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-charcoal hover:bg-terracotta hover:text-white transition-all font-black">&times;</button>
            <h3 id="collection-modal-title" class="text-2xl font-black uppercase mb-6">Tạo <span class="text-terracotta italic">Bộ sưu tập</span></h3>
            
            <form id="collection-form" class="space-y-6">
                <input type="hidden" id="col-id">
                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Tên bộ sưu tập</label>
                    <input type="text" id="col-name" required class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold">
                </div>
                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Mô tả ngắn</label>
                    <input type="text" id="col-shortDesc" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold">
                </div>
                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Ảnh bìa (Thumbnail)</label>
                    <input type="file" id="col-thumbnail" accept="image/*" class="w-full text-xs">
                </div>
                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Chi tiết (Rich text HTML)</label>
                    <textarea id="col-longDesc" rows="4" class="w-full border-2 border-charcoal p-2 outline-none focus:border-terracotta"></textarea>
                </div>
                <button type="submit" id="btn-col-submit" class="btn-retro w-full">Lưu thay đổi</button>
            </form>
        </div>
    </div>
    ` : ''}
  `;
};

export const renderCollectionCard = (col, isMyTab) => {
    const defaultThumb = 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800';
    let thumbUrl = defaultThumb;
    if (col.thumbnail) {
        thumbUrl = col.thumbnail.startsWith('http') ? col.thumbnail : `http://localhost:3000/${col.thumbnail}`;
    }
    
    return `
        <div class="card-retro group flex flex-col relative">
            <div onclick="window.navigate('collections/${col.id}')" class="cursor-pointer absolute inset-0 z-10"></div>
            <div class="h-48 mb-6 overflow-hidden border-2 border-charcoal relative">
                <img src="${thumbUrl}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0">
                <div class="absolute inset-0 bg-charcoal/20 group-hover:bg-transparent transition-all duration-700"></div>
            </div>
            <div class="flex-1">
                <h3 class="text-xl font-black uppercase mb-2 group-hover:text-terracotta transition-colors">${col.name}</h3>
                <p class="text-xs font-bold text-slate-500 mb-4 line-clamp-2">${col.shortDesc || 'Chưa có mô tả'}</p>
                
                <div class="flex justify-between items-center text-[10px] uppercase font-black tracking-widest opacity-60 border-t border-slate-200 pt-4">
                    <span>Tác giả: ${col.user?.fullName || 'Ẩn danh'}</span>
                    <span>${col._count?.items || 0} mục</span>
                </div>
            </div>
            
            ${isMyTab ? `
            <div class="mt-6 flex gap-2 border-t border-charcoal pt-4 relative z-20">
                <button onclick="window.editCollection('${col.id}')" class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-charcoal hover:bg-charcoal hover:text-white transition-all relative z-20">Sửa</button>
                <button onclick="window.deleteCollection('${col.id}')" class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all relative z-20">Xóa</button>
            </div>
            ` : ''}
        </div>
    `;
};
