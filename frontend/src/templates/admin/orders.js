// src/templates/admin/orders.js

export const AdminOrdersTemplate = () => `
    <div class="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
            <h2 class="text-5xl font-black uppercase leading-none italic text-charcoal">Quản lý <span class="not-italic text-terracotta">Đơn hàng</span></h2>
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mt-4 italic">Tổng số đơn hàng: <span id="admin-order-count" class="text-charcoal border-b border-charcoal">...</span> vận đơn</p>
        </div>
        <div class="flex items-center gap-2">
            <input type="text" id="admin-order-search" placeholder="Mã đơn/Tên khách..." class="px-4 py-3 border-2 border-charcoal outline-none font-bold text-sm w-64 shadow-retro-sm">
            <button id="btn-admin-order-search" class="px-6 py-3 bg-charcoal text-cream font-black uppercase text-[10px] tracking-widest hover:bg-terracotta transition-all shadow-retro">Tìm</button>
        </div>
    </div>

    <div class="card-retro !p-0 overflow-hidden bg-white shadow-retro border-4 border-charcoal">
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
