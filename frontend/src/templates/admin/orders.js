// src/templates/admin/orders.js

export const AdminOrdersTemplate = () => `
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 pb-8 border-b-4 border-black">
        <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-2">Quản trị hệ thống</p>
            <h2 class="text-5xl font-black uppercase tracking-tighter leading-none">Đơn hàng</h2>
            <p class="text-sm font-bold text-black/50 mt-3">
                Vận hành: <span id="admin-order-count" class="text-black font-black bg-[#E2725B] text-white px-2 py-0.5">...</span> kiện hàng
            </p>
        </div>
        <div class="flex w-full md:w-auto min-w-[280px]">
            <input type="text" id="admin-order-search" placeholder="Mã đơn / Tên khách..."
                class="admin-input flex-1 text-sm">
            <button id="btn-admin-order-search"
                class="bg-black text-white px-6 font-black uppercase text-[11px] tracking-widest border-4 border-l-0 border-black hover:bg-[#E2725B] transition-colors">
                TÌM
            </button>
        </div>
    </div>

    <!-- Table -->
    <div class="bg-white border-4 border-black shadow-[6px_6px_0px_#000] overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[950px]">
            <thead>
                <tr class="bg-black text-white uppercase text-[11px] font-black tracking-widest">
                    <th class="px-6 py-4 border-r-2 border-white/10 w-28">Mã đơn</th>
                    <th class="px-6 py-4 border-r-2 border-white/10">Khách hàng</th>
                    <th class="px-6 py-4 border-r-2 border-white/10 w-36">Tổng tiền</th>
                    <th class="px-6 py-4 border-r-2 border-white/10 w-36 text-center">Thanh toán</th>
                    <th class="px-6 py-4 border-r-2 border-white/10 w-36 text-center">Trạng thái</th>
                    <th class="px-6 py-4 text-center w-40">Xử lý</th>
                </tr>
            </thead>
            <tbody id="admin-order-list" class="divide-y-4 divide-black text-sm font-bold">
                <!-- Rendered via JS -->
            </tbody>
        </table>
    </div>
    <div id="admin-order-pagination" class="mt-8"></div>
`;
