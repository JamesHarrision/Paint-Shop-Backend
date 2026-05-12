// src/templates/admin/orders.js

export const AdminOrdersTemplate = () => `
    <div class="flex flex-col md:flex-row justify-between items-center mb-16 gap-12">
        <div>
            <h2 class="text-6xl font-black uppercase tracking-tighter">Quản trị <span class="bg-[#FF4D4D] text-white px-2 border-2 border-black">Đơn hàng</span></h2>
            <p class="text-sm font-black uppercase tracking-widest text-gray-500 mt-6 italic border-l-4 border-black pl-4">Vận hành: <span id="admin-order-count" class="text-black bg-[#C5FF2E] px-2">...</span> kiện hàng</p>
        </div>
        <div class="flex items-center gap-0 w-full md:w-auto">
            <input type="text" id="admin-order-search" placeholder="Mã đơn / Tên khách..." class="input-brutal !w-64">
            <button id="btn-admin-order-search" class="btn-brutal bg-black text-white px-8 !shadow-none">TÌM</button>
        </div>
    </div>

    <div class="card-brutal !p-0 overflow-hidden bg-white">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-black text-white uppercase text-[12px] font-black tracking-widest">
                        <th class="p-6 border-r-2 border-white/20">Mã vận đơn</th>
                        <th class="p-6 border-r-2 border-white/20">Khách hàng</th>
                        <th class="p-6 border-r-2 border-white/20">Tổng giá trị</th>
                        <th class="p-6 border-r-2 border-white/20">Thanh toán</th>
                        <th class="p-6 border-r-2 border-white/20 text-center">Trạng thái</th>
                        <th class="p-6 text-center">Xử lý</th>
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
