// src/templates/admin/products.js

export const AdminProductsTemplate = () => `
    <div class="flex flex-col md:flex-row justify-between items-center mb-16 gap-12">
        <div>
            <h2 class="text-6xl font-black uppercase tracking-tighter">Quản trị <span class="bg-[#3B82F6] text-white px-2 border-2 border-black">Sản phẩm</span></h2>
            <p class="text-sm font-black uppercase tracking-widest text-gray-500 mt-6 italic border-l-4 border-black pl-4">Kho hàng: <span id="admin-product-count" class="text-black bg-[#C5FF2E] px-2">...</span> mặt hàng</p>
        </div>
        <div class="flex flex-col gap-6 w-full md:w-auto">
            <div class="flex items-center gap-0">
                <input type="text" id="admin-product-search" placeholder="Tên sản phẩm..." class="input-brutal !w-64">
                <button id="btn-admin-product-search" class="btn-brutal bg-black text-white px-8 !shadow-none">TÌM</button>
            </div>
            <button onclick="window.showAddProductModal()" class="btn-brutal bg-[#C5FF2E] w-full">+ THÊM SẢN PHẨM MỚI</button>
        </div>
    </div>

    <div class="card-brutal !p-0 overflow-hidden bg-white">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-black text-white uppercase text-[12px] font-black tracking-widest">
                        <th class="p-6 border-r-2 border-white/20 w-24">Hình ảnh</th>
                        <th class="p-6 border-r-2 border-white/20">Tên Sản Phẩm</th>
                        <th class="p-6 border-r-2 border-white/20">Giá</th>
                        <th class="p-6 border-r-2 border-white/20">Tồn kho</th>
                        <th class="p-6 border-r-2 border-white/20 text-center">Màu</th>
                        <th class="p-6 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody id="admin-product-list" class="font-bold">
                    <!-- Rendered via JS -->
                </tbody>
            </table>
        </div>
    </div>
    <div id="admin-product-pagination" class="mt-12"></div>

    <!-- Modal -->
    <div id="add-product-modal" class="fixed inset-0 z-[10002] hidden">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white border-4 border-black shadow-[12px_12px_0px_#3B82F6] p-12 max-h-[90vh] overflow-y-auto animate-fade-in">
            <div class="flex justify-between items-center mb-10 border-b-4 border-black pb-6">
                <h2 id="product-modal-title" class="text-4xl font-black uppercase tracking-tighter italic">Quản lý <span class="bg-[#C5FF2E] text-black px-2 not-italic">Product</span></h2>
                <button onclick="window.closeAddProductModal()" class="text-5xl font-black hover:text-[#FF4D4D] transition-colors leading-none">&times;</button>
            </div>
            
            <form id="add-product-form" class="space-y-6">
                <input type="hidden" name="id" id="product-id">
                <div class="grid grid-cols-2 gap-8">
                    <div class="space-y-2">
                        <label class="text-xs uppercase font-black tracking-widest italic">Tên sản phẩm</label>
                        <input type="text" name="name" required class="input-brutal">
                    </div>
                    <div class="space-y-2">
                        <label class="text-xs uppercase font-black tracking-widest italic">Giá bán (VND)</label>
                        <input type="number" name="price" required class="input-brutal">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-8">
                    <div class="space-y-2">
                        <label class="text-xs uppercase font-black tracking-widest italic">Số lượng tồn kho</label>
                        <input type="number" name="stock" required class="input-brutal">
                    </div>
                    <div class="space-y-2">
                        <label class="text-xs uppercase font-black tracking-widest italic">Mã màu (HEX)</label>
                        <input type="text" name="colorCode" placeholder="#000000" class="input-brutal">
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="text-xs uppercase font-black tracking-widest italic">Mô tả chi tiết</label>
                    <textarea name="description" rows="3" class="input-brutal resize-none"></textarea>
                </div>

                <div class="space-y-2">
                    <label class="text-xs uppercase font-black tracking-widest italic">Hình ảnh đại diện</label>
                    <div class="border-4 border-black p-4 bg-gray-50">
                        <input type="file" name="image" accept="image/*" class="w-full font-bold text-xs">
                    </div>
                </div>

                <button type="submit" id="btn-product-submit" class="btn-brutal bg-[#C5FF2E] w-full text-xl mt-8">ĐĂNG SẢN PHẨM NGAY</button>
            </form>
        </div>
    </div>
`;
