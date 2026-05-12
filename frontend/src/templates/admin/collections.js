// src/templates/admin/collections.js

export const AdminCollectionsTemplate = () => `
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 pb-8 border-b-4 border-black">
        <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-1">Quản trị hệ thống</p>
            <h2 class="text-5xl font-black uppercase tracking-tighter leading-none">
                Bộ sưu <span class="italic text-[#E2725B]">tập</span>
            </h2>
            <p class="text-sm font-bold text-black/40 mt-2">
                Tổng cộng <span id="admin-collection-count" class="font-black text-black bg-[#E2725B] text-white px-1.5">...</span> bộ sưu tập
            </p>
        </div>
        <div class="flex flex-col gap-2 w-full md:w-auto min-w-[260px]">
            <button onclick="window.showAddCollectionModal()"
                class="btn-brutal bg-[#E2725B] text-white text-[11px] w-full">
                + THÊM BỘ SƯU TẬP
            </button>
        </div>
    </div>

    <!-- Loader -->
    <div id="admin-collections-loader" class="py-20 text-center hidden">
        <div class="w-12 h-12 border-8 border-black border-t-[#E2725B] rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-[10px] font-black uppercase tracking-widest text-black/40">Đang tải dữ liệu...</p>
    </div>

    <!-- Table -->
    <div class="bg-white border-4 border-black shadow-[6px_6px_0px_#000] overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[850px]">
            <thead>
                <tr class="bg-black text-white uppercase text-[10px] font-black tracking-widest">
                    <th class="px-5 py-4 border-r border-white/10">Ảnh & Tên</th>
                    <th class="px-5 py-4 border-r border-white/10">Mô tả</th>
                    <th class="px-5 py-4 border-r border-white/10 text-center w-24">Số lượng</th>
                    <th class="px-5 py-4 border-r border-white/10">Người tạo</th>
                    <th class="px-5 py-4 text-center w-32">Thao tác</th>
                </tr>
            </thead>
            <tbody id="admin-collections-list" class="divide-y-2 divide-black/10 text-sm font-medium">
                <!-- Rendered via JS -->
            </tbody>
        </table>
    </div>

    <!-- Modal -->
    <div id="collection-modal" class="fixed inset-0 z-[10002] hidden">
        <div class="absolute inset-0 bg-black/60" onclick="document.querySelector('#collection-modal').classList.add('hidden')"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#F9F7F2] border-4 border-black shadow-[8px_8px_0px_#000] max-h-[90vh] overflow-y-auto">
            
            <!-- Modal Header -->
            <div class="flex justify-between items-start p-8 pb-0">
                <h2 id="collection-modal-title" class="text-3xl font-black uppercase tracking-tight leading-none">
                    TẠO <span class="italic text-[#E2725B] normal-case">Bộ sưu tập</span>
                </h2>
                <button onclick="document.querySelector('#collection-modal').classList.add('hidden')"
                    class="w-9 h-9 border-2 border-black flex items-center justify-center font-black text-xl hover:bg-black hover:text-white transition-colors shrink-0 leading-none">
                    ×
                </button>
            </div>

            <!-- Form -->
            <form id="admin-collection-form" class="p-8 space-y-6">
                <input type="hidden" id="col-id">
                <div>
                    <label class="form-label">Tên bộ sưu tập</label>
                    <input type="text" id="col-name" required class="input-brutal" placeholder="Ví dụ: Summer 2026">
                </div>
                <div>
                    <label class="form-label">Mô tả ngắn</label>
                    <input type="text" id="col-shortDesc" class="input-brutal" placeholder="Mô tả tóm tắt...">
                </div>
                <div>
                    <label class="form-label">Chi tiết</label>
                    <textarea id="col-longDesc" rows="4" class="input-brutal" placeholder="Mô tả chi tiết về bộ sưu tập này..."></textarea>
                </div>
                <div>
                    <label class="form-label">Ảnh bìa</label>
                    <input type="file" id="col-thumbnail" accept="image/*" 
                        class="w-full text-sm font-medium text-black/60 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:bg-white file:font-bold file:text-xs file:uppercase file:cursor-pointer hover:file:bg-black hover:file:text-white file:transition-colors">
                </div>

                <button type="submit" id="btn-col-submit"
                    class="btn-brutal w-full bg-[#E2725B] text-white uppercase tracking-widest mt-2">
                    LƯU THAY ĐỔI
                </button>
            </form>
        </div>
    </div>
`;
