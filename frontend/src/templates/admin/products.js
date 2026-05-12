// src/templates/admin/products.js

export const AdminProductsTemplate = () => `
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 pb-8 border-b-4 border-black">
        <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-2">Quản trị hệ thống</p>
            <h2 class="text-5xl font-black uppercase tracking-tighter leading-none">Sản phẩm</h2>
            <p class="text-sm font-bold text-black/50 mt-3">
                Kho: <span id="admin-product-count" class="text-black font-black bg-[#E2725B] text-white px-2 py-0.5">...</span> mặt hàng
            </p>
        </div>
        <div class="flex flex-col gap-3 w-full md:w-auto min-w-[280px]">
            <div class="flex w-full">
                <input type="text" id="admin-product-search" placeholder="Tên sản phẩm..."
                    class="admin-input flex-1 text-sm">
                <button id="btn-admin-product-search"
                    class="bg-black text-white px-6 font-black uppercase text-[11px] tracking-widest border-4 border-l-0 border-black hover:bg-[#E2725B] transition-colors">
                    TÌM
                </button>
            </div>
            <button onclick="window.showAddProductModal()"
                class="w-full bg-[#E2725B] text-white border-4 border-black px-6 py-3 font-black uppercase text-[11px] tracking-widest shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all">
                + THÊM SẢN PHẨM MỚI
            </button>
        </div>
    </div>

    <!-- Table -->
    <div class="bg-white border-4 border-black shadow-[6px_6px_0px_#000] overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[850px]">
            <thead>
                <tr class="bg-black text-white uppercase text-[11px] font-black tracking-widest">
                    <th class="px-6 py-4 border-r-2 border-white/10 w-24">Ảnh</th>
                    <th class="px-6 py-4 border-r-2 border-white/10">Tên sản phẩm</th>
                    <th class="px-6 py-4 border-r-2 border-white/10 w-36">Giá</th>
                    <th class="px-6 py-4 border-r-2 border-white/10 w-28 text-center">Tồn kho</th>
                    <th class="px-6 py-4 border-r-2 border-white/10 w-20 text-center">Màu</th>
                    <th class="px-6 py-4 text-center w-36">Thao tác</th>
                </tr>
            </thead>
            <tbody id="admin-product-list" class="divide-y-4 divide-black text-sm font-bold">
                <!-- Rendered via JS -->
            </tbody>
        </table>
    </div>
    <div id="admin-product-pagination" class="mt-8"></div>

    <!-- Modal -->
    <div id="add-product-modal" class="fixed inset-0 z-[10002] hidden">
        <div class="absolute inset-0 bg-black/70" onclick="window.closeAddProductModal()"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white border-4 border-black shadow-[12px_12px_0px_#000] max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center px-8 py-6 border-b-4 border-black bg-black text-white">
                <h2 id="product-modal-title" class="text-2xl font-black uppercase tracking-tighter">Quản lý sản phẩm</h2>
                <button onclick="window.closeAddProductModal()" class="text-4xl font-black leading-none hover:text-[#E2725B] transition-colors">&times;</button>
            </div>
            <form id="add-product-form" class="p-8 space-y-6">
                <input type="hidden" name="id" id="product-id">
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="admin-label">Tên sản phẩm</label>
                        <input type="text" name="name" required class="admin-input">
                    </div>
                    <div class="space-y-2">
                        <label class="admin-label">Giá bán (VND)</label>
                        <input type="number" name="price" required class="admin-input">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="admin-label">Tồn kho</label>
                        <input type="number" name="stock" required class="admin-input">
                    </div>
                    <div class="space-y-2">
                        <label class="admin-label">Mã màu (HEX)</label>
                        <input type="text" name="colorCode" placeholder="#E2725B" class="admin-input">
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="admin-label">Mô tả</label>
                    <textarea name="description" rows="3" class="admin-input resize-none"></textarea>
                </div>
                <div class="space-y-2">
                    <label class="admin-label">Hình ảnh</label>
                    <div class="border-4 border-black bg-[#F5F5F0] p-4">
                        <input type="file" name="image" accept="image/*" class="w-full text-sm font-bold">
                    </div>
                </div>
                <button type="submit" id="btn-product-submit"
                    class="w-full bg-[#E2725B] text-white border-4 border-black px-6 py-4 font-black uppercase text-base tracking-widest shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all mt-4">
                    ĐĂNG SẢN PHẨM
                </button>
            </form>
        </div>
    </div>
`;
