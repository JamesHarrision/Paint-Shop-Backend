// src/handlers/admin/orders.handler.js
import { orderApi } from '../../api.js';
import { Pagination } from '../../components/Pagination.js';
import { showToast } from '../../ui.js';

let orderSearch = '';

export const renderAdminOrders = async (page = 1) => {
    const list = document.querySelector('#admin-order-list');
    const paginationContainer = document.querySelector('#admin-order-pagination');
    const searchBtn = document.querySelector('#btn-admin-order-search');
    const searchInput = document.querySelector('#admin-order-search');

    if (!list) return;

    if (searchBtn && !searchBtn.onclick) {
        searchBtn.onclick = () => {
            orderSearch = searchInput.value;
            renderAdminOrders(1);
        };
        searchInput.onkeypress = (e) => { if (e.key === 'Enter') searchBtn.click(); };
    }

    try {
        const { data } = await orderApi.getAll({ page, limit: 10, search: orderSearch });
        const orders = data.data;
        const countEl = document.querySelector('#admin-order-count');
        if (countEl) countEl.innerText = data.pagination.total;

        list.innerHTML = orders.map(o => `
            <tr class="border-b border-slate-200 hover:bg-slate-50 transition-all font-bold text-sm text-charcoal">
                <td class="p-6 text-slate-400 font-black">#${o.id}</td>
                <td class="p-6">
                    <p class="font-black truncate w-32" title="${o.user.fullName}">${o.user.fullName}</p>
                    <p class="text-[10px] text-slate-400 font-normal italic">${o.user.email}</p>
                </td>
                <td class="p-6 font-black text-slate-600">${new Intl.NumberFormat('vi-VN').format(o.totalAmount)}đ</td>
                <td class="p-6">
                    <span class="px-3 py-1 text-[10px] border-2 border-charcoal ${o.paymentStatus === 'PAID' ? 'bg-teal text-white border-teal shadow-retro-sm' : 'text-slate-400'}">
                        ${o.paymentStatus === 'PAID' ? 'ĐÃ TRẢ' : 'CHỜ'}
                    </span>
                </td>
                <td class="p-6 text-center">
                    <select onchange="window.updateOrderStatus(${o.id}, this.value)" class="bg-white border-2 border-charcoal text-[10px] font-black uppercase px-2 py-2 outline-none cursor-pointer focus:bg-cream transition-colors shadow-retro-sm">
                        <option value="PENDING" ${o.status === 'PENDING' ? 'selected' : ''}>Chờ xử lý</option>
                        <option value="PROCESSING" ${o.status === 'PROCESSING' ? 'selected' : ''}>Đang pha màu</option>
                        <option value="SHIPPING" ${o.status === 'SHIPPING' ? 'selected' : ''}>Đang giao</option>
                        <option value="DELIVERED" ${o.status === 'DELIVERED' ? 'selected' : ''}>Đã giao</option>
                        <option value="CANCELLED" ${o.status === 'CANCELLED' ? 'selected' : ''}>Đã hủy</option>
                    </select>
                </td>
                <td class="p-6 text-center">
                    <button class="text-charcoal hover:scale-125 transition-transform" title="Xem chi tiết">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </td>
            </tr>
        `).join('');

        if (paginationContainer) {
            paginationContainer.innerHTML = Pagination(data.pagination, 'changeAdminOrderPage');
        }

        // Đăng ký hàm cập nhật trạng thái toàn cục
        window.updateOrderStatus = async (orderId, status) => {
            try {
                window.toggleLoader(true);
                await orderApi.updateStatus(orderId, status);
                showToast('✅ Cập nhật trạng thái thành công!');
                renderAdminOrders(page);
            } catch (err) {
                showToast('❌ Lỗi: ' + (err.response?.data?.message || err.message), 'error');
            } finally {
                window.toggleLoader(false);
            }
        };

    } catch (err) {
        list.innerHTML = '<tr><td colspan="6" class="p-10 text-center text-red-500 font-bold italic">Lỗi nạp đơn hàng</td></tr>';
    }
};
