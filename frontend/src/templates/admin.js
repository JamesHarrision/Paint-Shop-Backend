// src/templates/admin.js

export const AdminSidebar = (activeTab = 'users') => `
    <aside class="w-full md:w-64 bg-charcoal text-cream p-8 flex flex-col border-r-4 border-terracotta">
        <h2 class="text-3xl font-black uppercase italic mb-12 tracking-tighter">Admin <span class="text-terracotta text-sm not-italic">v1.0</span></h2>
        
        <nav class="flex flex-col gap-2">
            <button onclick="window.switchAdminTab('users')" class="flex items-center gap-4 p-4 ${activeTab === 'users' ? 'bg-terracotta text-white' : 'hover:bg-white/10 text-cream/60 hover:text-cream'} font-black uppercase text-[10px] tracking-widest shadow-retro-sm transition-all">
                Người dùng
            </button>
            <button onclick="window.switchAdminTab('products')" class="flex items-center gap-4 p-4 ${activeTab === 'products' ? 'bg-terracotta text-white' : 'hover:bg-white/10 text-cream/60 hover:text-cream'} font-black uppercase text-[10px] tracking-widest shadow-retro-sm transition-all">
                Sản phẩm
            </button>
            <button onclick="window.switchAdminTab('collections')" class="flex items-center gap-4 p-4 ${activeTab === 'collections' ? 'bg-terracotta text-white' : 'hover:bg-white/10 text-cream/60 hover:text-cream'} font-black uppercase text-[10px] tracking-widest shadow-retro-sm transition-all">
                Bộ sưu tập
            </button>
            <button onclick="window.switchAdminTab('orders')" class="flex items-center gap-4 p-4 ${activeTab === 'orders' ? 'bg-terracotta text-white' : 'hover:bg-white/10 text-cream/60 hover:text-cream'} font-black uppercase text-[10px] tracking-widest shadow-retro-sm transition-all">
                Đơn hàng
            </button>
        </nav>
        
        <div class="mt-auto pt-8 border-t border-cream/10">
            <p class="text-[8px] uppercase tracking-widest text-cream/40 mb-2">Đang đăng nhập</p>
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-terracotta rounded-full flex items-center justify-center font-black text-xs border border-cream shadow-retro-sm">A</div>
                <span class="text-[10px] font-black uppercase truncate">Administrator</span>
            </div>
        </div>
    </aside>
`;

export const AdminUsersTemplate = () => `
    <div class="flex justify-between items-end mb-12">
        <div>
            <h2 class="text-5xl font-black uppercase leading-none italic">Quản lý <br> <span class="not-italic text-terracotta">Người dùng</span></h2>
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mt-4">Tổng số hệ thống: <span id="admin-user-count" class="text-charcoal border-b border-charcoal">...</span></p>
        </div>
        <button class="px-6 py-2 border-2 border-charcoal font-black uppercase text-[10px] tracking-widest hover:bg-charcoal hover:text-white transition-all shadow-retro-sm">Xuất báo cáo</button>
    </div>

    <div class="card-retro !p-0 overflow-hidden bg-white shadow-retro">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-charcoal text-cream uppercase text-[10px] font-black tracking-widest">
                        <th class="p-6 border-r border-cream/20">ID</th>
                        <th class="p-6 border-r border-cream/20">Người dùng</th>
                        <th class="p-6 border-r border-cream/20">Email</th>
                        <th class="p-6 border-r border-cream/20">Quyền hạn</th>
                        <th class="p-6 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody id="admin-user-list">
                    <!-- Rendered via JS -->
                </tbody>
            </table>
        </div>
    </div>
    <div id="admin-user-pagination"></div>
`;

export const AdminProductsTemplate = () => `
    <div class="flex justify-between items-end mb-12">
        <div>
            <h2 class="text-5xl font-black uppercase leading-none italic">Quản lý <br> <span class="not-italic text-terracotta">Sản phẩm</span></h2>
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mt-4">Tồn kho hiện tại: <span id="admin-product-count" class="text-charcoal border-b border-charcoal">...</span> mẫu sơn</p>
        </div>
        <button onclick="window.showAddProductModal()" class="px-8 py-3 bg-charcoal text-cream font-black uppercase text-[10px] tracking-widest hover:bg-terracotta transition-all shadow-retro">Thêm sản phẩm mới</button>
    </div>

    <div class="card-retro !p-0 overflow-hidden bg-white shadow-retro">
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
            
            <form id="add-product-form" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="md:col-span-2">
                    <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Tên sản phẩm</label>
                    <input type="text" name="name" class="w-full bg-white border-2 border-charcoal p-3 focus:bg-terracotta/10 outline-none font-bold" required>
                </div>
                
                <div class="md:col-span-2">
                    <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Mô tả chi tiết</label>
                    <textarea name="description" rows="3" class="w-full bg-white border-2 border-charcoal p-3 focus:bg-terracotta/10 outline-none font-bold"></textarea>
                </div>

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Giá niêm yết (VNĐ)</label>
                    <input type="number" name="price" class="w-full bg-white border-2 border-charcoal p-3 focus:bg-terracotta/10 outline-none font-bold" required>
                </div>

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Số lượng tồn kho</label>
                    <input type="number" name="stock" class="w-full bg-white border-2 border-charcoal p-3 focus:bg-terracotta/10 outline-none font-bold" required>
                </div>

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Mã màu (HEX)</label>
                    <input type="text" name="colorCode" placeholder="#E2725B" class="w-full bg-white border-2 border-charcoal p-3 focus:bg-terracotta/10 outline-none font-bold">
                </div>

                <div>
                    <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Hình ảnh sản phẩm</label>
                    <input type="file" name="image" accept="image/*" class="w-full text-xs font-bold uppercase cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-2 file:border-charcoal file:bg-charcoal file:text-cream file:font-black file:uppercase file:text-[10px] hover:file:bg-terracotta transition-all">
                </div>

                <div class="md:col-span-2 pt-4">
                    <button type="submit" class="btn-retro w-full py-4 text-sm">Xác nhận thêm vào hệ thống</button>
                </div>
            </form>
        </div>
    </div>
`;

export const AdminOrdersTemplate = () => `
    <div class="flex justify-between items-end mb-12">
        <div>
            <h2 class="text-5xl font-black uppercase leading-none italic">Quản lý <br> <span class="not-italic text-terracotta">Đơn hàng</span></h2>
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mt-4">Tổng số đơn hàng: <span id="admin-order-count" class="text-charcoal border-b border-charcoal">...</span> vận đơn</p>
        </div>
    </div>

    <div class="card-retro !p-0 overflow-hidden bg-white shadow-retro">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-charcoal text-cream uppercase text-[10px] font-black tracking-widest">
                        <th class="p-6 border-r border-cream/20">Mã đơn</th>
                        <th class="p-6 border-r border-cream/20">Khách hàng</th>
                        <th class="p-6 border-r border-cream/20">Giá trị</th>
                        <th class="p-6 border-r border-cream/20">Thanh toán</th>
                        <th class="p-6 border-r border-cream/20">Trạng thái</th>
                        <th class="p-6 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody id="admin-order-list">
                    <!-- Rendered via JS -->
                </tbody>
            </table>
        </div>
    </div>
    <div id="admin-order-pagination"></div>
`;

export const AdminTemplate = (activeTab = 'users') => `
  <section class="min-h-screen bg-slate-100 flex flex-col md:flex-row">
    ${AdminSidebar(activeTab)}
    <main class="flex-1 p-8 md:p-16" id="admin-main-content">
        ${activeTab === 'users' ? AdminUsersTemplate() : AdminProductsTemplate()}
    </main>
  </section>
`;
