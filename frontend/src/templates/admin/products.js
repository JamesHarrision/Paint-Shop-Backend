// src/templates/admin/products.js

export const AdminProductsTemplate = () => `
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 pb-8 border-b-4 border-black">
        <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-1">Quản trị hệ thống</p>
            <h2 class="text-5xl font-black uppercase tracking-tighter leading-none">
                Sản <span class="italic text-[#E2725B]">phẩm</span>
            </h2>
            <p class="text-sm font-bold text-black/40 mt-2">
                Kho <span id="admin-product-count" class="font-black text-black bg-[#E2725B] text-white px-1.5">...</span> mặt hàng
            </p>
        </div>
        <div class="flex flex-col gap-2 w-full md:w-auto min-w-[260px]">
            <div class="flex">
                <input type="text" id="admin-product-search" placeholder="Tên sản phẩm..."
                    class="search-input flex-1">
                <button id="btn-admin-product-search"
                    class="bg-black text-white px-5 font-black uppercase text-[10px] tracking-widest border-3 border-black hover:bg-[#E2725B] transition-colors shrink-0">
                    TÌM
                </button>
            </div>
            <button onclick="window.showAddProductModal()"
                class="btn-brutal bg-[#E2725B] text-white text-[11px] w-full">
                + THÊM SẢN PHẨM MỚI
            </button>
        </div>
    </div>

    <!-- Table -->
    <div class="bg-white border-4 border-black shadow-[6px_6px_0px_#000] overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[850px]">
            <thead>
                <tr class="bg-black text-white uppercase text-[10px] font-black tracking-widest">
                    <th class="px-5 py-4 border-r border-white/10 w-20">Ảnh</th>
                    <th class="px-5 py-4 border-r border-white/10">Tên sản phẩm</th>
                    <th class="px-5 py-4 border-r border-white/10 w-32">Giá</th>
                    <th class="px-5 py-4 border-r border-white/10 w-24 text-center">Tồn kho</th>
                    <th class="px-5 py-4 border-r border-white/10 w-16 text-center">Màu</th>
                    <th class="px-5 py-4 text-center w-32">Thao tác</th>
                </tr>
            </thead>
            <tbody id="admin-product-list" class="divide-y-2 divide-black/10 text-sm font-medium">
                <!-- Rendered via JS -->
            </tbody>
        </table>
    </div>
    <div id="admin-product-pagination" class="mt-6"></div>

    <!-- Modal -->
    <div id="add-product-modal" class="fixed inset-0 z-[10002] hidden">
        <div class="absolute inset-0 bg-black/60" onclick="window.closeAddProductModal()"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#F9F7F2] border-4 border-black shadow-[8px_8px_0px_#000] max-h-[90vh] overflow-y-auto">

            <!-- Modal Header -->
            <div class="flex justify-between items-start p-8 pb-0">
                <h2 id="product-modal-title" class="text-3xl font-black uppercase tracking-tight leading-none">
                    TẠO <span class="italic text-[#E2725B] normal-case">Sản phẩm</span>
                </h2>
                <button onclick="window.closeAddProductModal()"
                    class="w-9 h-9 border-2 border-black flex items-center justify-center font-black text-xl hover:bg-black hover:text-white transition-colors shrink-0 leading-none">
                    ×
                </button>
            </div>

            <!-- Form -->
            <form id="add-product-form" class="p-8 space-y-6">
                <input type="hidden" name="id" id="product-id">

                <div>
                    <label class="form-label">Tên sản phẩm</label>
                    <input type="text" name="name" required class="input-brutal">
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label class="form-label">Giá bán (VND)</label>
                        <input type="number" name="price" required class="input-brutal">
                    </div>
                    <div>
                        <label class="form-label">Tồn kho</label>
                        <input type="number" name="stock" required class="input-brutal">
                    </div>
                </div>
                <div>
                    <label class="form-label">Mã màu (HEX)</label>
                    <input type="text" name="colorCode" placeholder="#E2725B" class="input-brutal">
                </div>
                <div>
                    <label class="form-label">Mô tả ngắn</label>
                    <input type="text" name="description" class="input-brutal">
                </div>
                <div>
                    <label class="form-label">Chi tiết</label>
                    <textarea name="details" rows="3" class="input-brutal"></textarea>
                </div>
                <div>
                    <label class="form-label">Ảnh bìa</label>
                    <input type="file" name="image" accept="image/*"
                        class="w-full text-sm font-medium text-black/60 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:bg-white file:font-bold file:text-xs file:uppercase file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-colors">
                </div>

                <button type="submit" id="btn-product-submit"
                    class="btn-brutal w-full bg-[#E2725B] text-white uppercase tracking-widest mt-2">
                    LƯU THAY ĐỔI
                </button>
            </form>
        </div>
    </div>
`;
