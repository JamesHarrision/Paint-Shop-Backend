// src/templates/collection_detail.js
import { state } from '../state.js';

export const CollectionDetailTemplate = (collection) => {
    if (!collection) return '';

    const defaultThumb = 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800';
    let thumbUrl = defaultThumb;
    if (collection.thumbnail) {
        thumbUrl = collection.thumbnail.startsWith('http') ? collection.thumbnail : `${import.meta.env.VITE_IMAGE_BASE_URL}/${collection.thumbnail}`;
    }

    const isOwner = state.user?.userId === collection.userId;
    const isAdmin = state.user?.role === 'ADMIN';
    const canEdit = isOwner || isAdmin;

    const items = collection.items || [];

    return `
    <section class="py-24 bg-cream min-h-screen">
        <div class="container mx-auto px-6 max-w-6xl">
            
            <!-- Breadcrumb & Header -->
            <div class="mb-12">
                <button onclick="window.history.back()" class="text-xs uppercase font-black tracking-widest hover:text-terracotta transition-colors mb-6 flex items-center gap-2">
                    <span>&larr;</span> Quay lại
                </button>
                <div class="flex flex-col md:flex-row gap-12 items-start">
                    
                    <!-- Thumbnail -->
                    <div class="w-full md:w-1/3 aspect-square border-4 border-charcoal overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                        <img src="${thumbUrl}" class="w-full h-full object-cover">
                    </div>

                    <!-- Info -->
                    <div class="w-full md:w-2/3">
                        <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">${collection.name}</h1>
                        <p class="text-sm font-bold text-slate-500 mb-6">${collection.shortDesc || 'Chưa có mô tả ngắn'}</p>
                        
                        <div class="flex items-center gap-4 text-[10px] uppercase font-black tracking-widest opacity-60 mb-8 border-y-2 border-charcoal/10 py-4">
                            <span>Tác giả: ${collection.user?.fullName || 'Ẩn danh'}</span>
                            <span>&bull;</span>
                            <span>${items.length} mục</span>
                        </div>

                        ${collection.longDesc ? `
                            <div class="prose prose-sm font-medium text-charcoal/80 mb-8">
                                ${collection.longDesc}
                            </div>
                        ` : ''}

                        ${canEdit ? `
                            <button onclick="window.showAddItemModal()" class="btn-retro">Thêm Sản Phẩm</button>
                        ` : ''}
                    </div>
                </div>
            </div>

            <!-- Items List -->
            <div class="mt-24">
                <h3 class="text-2xl font-black uppercase mb-8 pb-4 border-b-4 border-charcoal">Danh sách <span class="text-terracotta italic">Sản phẩm</span></h3>
                
                ${items.length === 0 ? `
                    <div class="text-center py-12 border-2 border-dashed border-charcoal/20">
                        <p class="font-black uppercase text-xl opacity-20">Chưa có sản phẩm nào trong bộ sưu tập</p>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${items.map(item => renderCollectionItemCard(item, canEdit)).join('')}
                    </div>
                `}
            </div>

        </div>
    </section>

    <!-- Add Item Modal -->
    ${canEdit ? `
    <div id="add-item-modal" class="fixed inset-0 z-[10005] bg-cream/90 flex items-center justify-center hidden">
        <div class="bg-white border-4 border-charcoal p-8 max-w-md w-full mx-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <button onclick="document.querySelector('#add-item-modal').classList.add('hidden')" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border-2 border-charcoal hover:bg-terracotta hover:text-white transition-all font-black">&times;</button>
            <h3 class="text-2xl font-black uppercase mb-6">Thêm <span class="text-terracotta italic">Sản Phẩm</span></h3>
            
            <form id="add-item-form" class="space-y-6">
                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Chọn Sản phẩm</label>
                    <select id="item-product-id" required class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold">
                        <option value="">Đang tải danh sách sản phẩm...</option>
                    </select>
                </div>
                <button type="submit" class="btn-retro w-full">Xác nhận Thêm</button>
            </form>
        </div>
    </div>
    ` : ''}
    `;
};

const renderCollectionItemCard = (item, canEdit) => {
    const p = item.product;
    if (!p) return '';
    
    const thumbUrl = p.imageUrl ? (p.imageUrl.startsWith('http') ? p.imageUrl : `${import.meta.env.VITE_IMAGE_BASE_URL}/${p.imageUrl}`) : 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800';
    
    return `
        <div onclick="if(!event.target.closest('button')) window.navigate('products/${p.id}')"
             class="card-retro group flex flex-col relative cursor-pointer hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all">
            <div class="h-48 mb-4 overflow-hidden border-2 border-charcoal">
                <img src="${thumbUrl}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0">
            </div>
            <div class="flex-1">
                <h4 class="font-black uppercase text-lg mb-1 group-hover:text-terracotta transition-colors">${p.name}</h4>
                <div class="flex justify-between items-center mt-4">
                    <p class="text-charcoal font-black text-xl">${p.price.toLocaleString('vi-VN')}đ</p>
                    <button onclick="event.stopPropagation(); window.navigate('products/${p.id}')" class="px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 border-charcoal hover:bg-charcoal hover:text-white transition-all">Xem ngay</button>
                </div>
                
                ${canEdit ? `
                    <button onclick="event.stopPropagation(); window.removeCollectionItem('${item.collectionId}', ${p.id})" 
                            class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all bg-white shadow-[2px_2px_0px_0px_rgba(239,68,68,1)] z-20">
                        &times;
                    </button>
                ` : ''}
            </div>
        </div>
    `;
};
