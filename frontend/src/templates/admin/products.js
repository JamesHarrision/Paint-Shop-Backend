// src/templates/admin/products.js

export const AdminProductsTemplate = () => `
    <div class="flex justify-between items-end mb-12">
        <div>
            <h2 class="text-5xl font-black uppercase leading-none italic text-charcoal">Quản lý <br> <span class="not-italic text-terracotta">Sản phẩm</span></h2>
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mt-4 italic">Tồn kho hiện tại: <span id="admin-product-count" class="text-charcoal border-b border-charcoal">...</span> mẫu sơn</p>
        </div>
        <button onclick="window.showAddProductModal()" class="px-8 py-3 bg-charcoal text-cream font-black uppercase text-[10px] tracking-widest hover:bg-terracotta transition-all shadow-retro border-2 border-charcoal">Thêm sản phẩm mới</button>
    </div>

    <div class="card-retro !p-0 overflow-hidden bg-white shadow-retro border-4 border-charcoal">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-charcoal text-cream uppercase text-[10px] font-black tracking-widest">
                        <th class="p-6 border-r border-cream/20 w-20">Ảnh</th>
                        <th class="p-6 border-r border-cream/20">Tên sản phẩm</th>
                        <th class="p-6 border-r border-cream/20">Giá</th>
                        <th class="p-6 border-r border-cream/20">Kho</th>
                        <th class="p-6 border-r border-cream/20 text-center">Màu</th>
                        <th class="p-6 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody id="admin-product-list">
                    <!-- Rendered via JS -->
                </tbody>
            </table>
        </div>
    </div>
    <div id="admin-product-pagination"></div>

    <!-- Add Product Modal -->
    <div id="add-product-modal" class="fixed inset-0 z-[10002] hidden">
        <div class="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-cream border-4 border-charcoal shadow-retro p-10 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-start mb-8">
                <h2 class="text-4xl font-black uppercase italic leading-none">Tạo <br> <span class="not-italic text-terracotta">Sản phẩm mới</span></h2>
                <button onclick="window.closeAddProductModal()" class="text-4xl font-black hover:text-terracotta transition-colors">&times;</button>
            </div>
            
            <form id="add-product-form" class="space-y-6">
                <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-[10px] uppercase font-black tracking-widest">Tên sản phẩm</label>
                        <input type="text" name="name" required class="w-full bg-white border-2 border-charcoal p-3 outline-none focus:bg-slate-50 transition-colors font-bold text-sm">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] uppercase font-black tracking-widest">Giá niêm yết</label>
                        <input type="number" name="price" required class="w-full bg-white border-2 border-charcoal p-3 outline-none focus:bg-slate-50 transition-colors font-bold text-sm">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-[10px] uppercase font-black tracking-widest">Số lượng tồn</label>
                        <input type="number" name="stock" required class="w-full bg-white border-2 border-charcoal p-3 outline-none focus:bg-slate-50 transition-colors font-bold text-sm">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] uppercase font-black tracking-widest">Mã màu (Hex)</label>
                        <input type="text" name="colorCode" placeholder="#000000" class="w-full bg-white border-2 border-charcoal p-3 outline-none focus:bg-slate-50 transition-colors font-bold text-sm">
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="text-[10px] uppercase font-black tracking-widest">Mô tả sản phẩm</label>
                    <textarea name="description" rows="3" class="w-full bg-white border-2 border-charcoal p-3 outline-none focus:bg-slate-50 transition-colors font-bold text-sm"></textarea>
                </div>

                <div class="space-y-2">
                    <label class="text-[10px] uppercase font-black tracking-widest">Hình ảnh sản phẩm</label>
                    <input type="file" name="image" accept="image/*" class="w-full bg-white border-2 border-charcoal p-3 outline-none focus:bg-slate-50 transition-colors font-bold text-sm">
                </div>

                <button type="submit" class="w-full py-4 bg-charcoal text-cream font-black uppercase text-xs tracking-widest hover:bg-terracotta transition-all shadow-retro">Đăng sản phẩm ngay</button>
            </form>
        </div>
    </div>
`;
