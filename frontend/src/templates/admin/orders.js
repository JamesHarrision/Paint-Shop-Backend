// src/templates/admin/orders.js

export const AdminOrdersTemplate = () => `
    <div class="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-8 md:gap-12">
        <div class="text-center md:text-left">
            <h2 class="text-4xl md:text-6xl font-black uppercase tracking-tighter">Quản trị <span class="bg-[#3B82F6] text-white px-2 border-2 border-black">Đơn hàng</span></h2>
            <p class="text-[10px] md:text-sm font-black uppercase tracking-widest text-gray-500 mt-6 italic border-l-4 border-black pl-4">Vận hành: <span id="admin-order-count" class="text-black bg-[#C5FF2E] px-2">...</span> kiện hàng</p>
        </div>
        <div class="flex items-center gap-0 w-full md:w-auto">
            <input type="text" id="admin-order-search" placeholder="Mã đơn / Tên khách..." class="input-brutal !w-full md:!w-64 !p-3 text-sm">
            <button id="btn-admin-order-search" class="btn-brutal bg-black text-white px-8 !shadow-none !py-3">TÌM</button>
        </div>
    </div>

    <div class="card-brutal !p-0 overflow-hidden bg-white">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                    <tr class="bg-black text-white uppercase text-[10px] md:text-[12px] font-black tracking-widest">
                        <th class="p-4 md:p-6 border-r-2 border-white/20">Mã vận đơn</th>
                        <th class="p-4 md:p-6 border-r-2 border-white/20">Khách hàng</th>
                        <th class="p-4 md:p-6 border-r-2 border-white/20">Tổng giá trị</th>
                        <th class="p-4 md:p-6 border-r-2 border-white/20">Thanh toán</th>
                        <th class="p-4 md:p-6 border-r-2 border-white/20 text-center">Trạng thái</th>
                        <th class="p-4 md:p-6 text-center">Xử lý</th>
                    </tr>
                </thead>
                <tbody id="admin-order-list" class="font-bold text-sm">
                    <!-- Rendered via JS -->
                </tbody>
            </table>
        </div>
    </div>
    <div id="admin-order-pagination" class="mt-12"></div>
`;
