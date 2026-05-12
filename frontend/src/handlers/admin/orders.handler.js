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
            <tr class="hover:bg-black/[0.02] transition-colors group">
                <td class="px-6 py-6 border-r border-black/10 font-black text-black/30">#${o.id}</td>
                <td class="px-6 py-6 border-r border-black/10">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-black text-white flex items-center justify-center font-black text-xs shrink-0">
                            ${o.user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div class="overflow-hidden">
                            <p class="font-black uppercase tracking-tight truncate" title="${o.user.fullName}">${o.user.fullName}</p>
                            <p class="text-[10px] font-bold text-black/40 truncate italic">${o.user.email}</p>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-6 border-r border-black/10 font-black text-black leading-none">
                    ${new Intl.NumberFormat('vi-VN').format(o.totalAmount)}<span class="text-[10px] ml-1 opacity-40">VND</span>
                </td>
                <td class="px-6 py-6 border-r border-black/10">
                    <div class="flex justify-center">
                        <select onchange="window.updatePaymentStatus(${o.id}, this.value)" 
                            class="text-[9px] font-black uppercase tracking-widest border-2 border-black px-3 py-1.5 outline-none cursor-pointer transition-colors ${
                                o.paymentStatus === 'PAID' ? 'bg-[#C5FF2E] text-black' : 
                                o.paymentStatus === 'REFUNDED' ? 'bg-black text-white' : 'bg-white text-black'
                            }">
                            <option value="UNPAID" ${o.paymentStatus === 'UNPAID' ? 'selected' : ''}>CHỜ THANH TOÁN</option>
                            <option value="PAID" ${o.paymentStatus === 'PAID' ? 'selected' : ''}>ĐÃ THANH TOÁN</option>
                            <option value="REFUNDED" ${o.paymentStatus === 'REFUNDED' ? 'selected' : ''}>ĐÃ HOÀN TIỀN</option>
                        </select>
                    </div>
                </td>
                <td class="px-6 py-6 border-r border-black/10">
                    <div class="flex justify-center">
                        <select onchange="window.updateOrderStatus(${o.id}, this.value)" 
                            class="text-[9px] font-black uppercase tracking-widest border-2 border-black px-3 py-1.5 outline-none cursor-pointer transition-colors ${
                                o.status === 'DELIVERED' ? 'bg-[#20B2AA] text-white' : 
                                o.status === 'CANCELLED' ? 'bg-[#FF4D4D] text-white' : 'bg-[#E2725B] text-white'
                            }">
                            <option value="PENDING" ${o.status === 'PENDING' ? 'selected' : ''}>CHỜ XỬ LÝ</option>
                            <option value="PROCESSING" ${o.status === 'PROCESSING' ? 'selected' : ''}>ĐANG XỬ LÝ</option>
                            <option value="SHIPPED" ${o.status === 'SHIPPED' ? 'selected' : ''}>ĐANG GIAO</option>
                            <option value="DELIVERED" ${o.status === 'DELIVERED' ? 'selected' : ''}>ĐÃ GIAO HÀNG</option>
                            <option value="CANCELLED" ${o.status === 'CANCELLED' ? 'selected' : ''}>ĐÃ HỦY ĐƠN</option>
                        </select>
                    </div>
                </td>
                <td class="px-6 py-6 text-center">
                    <button onclick="window.navigate('checkout', { id: '${o.id}' })"
                        class="w-10 h-10 inline-flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none" 
                        title="Xem chi tiết">
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

    } catch (err) {
        list.innerHTML = '<tr><td colspan="6" class="p-10 text-center text-red-500 font-bold italic">Lỗi nạp đơn hàng</td></tr>';
    }
};

// Đăng ký hàm cập nhật trạng thái toàn cục (để ngoài để không bị khởi tạo lại nhiều lần)
window.updateOrderStatus = async (orderId, status) => {
    try {
        window.toggleLoader(true);
        await orderApi.updateStatus(orderId, status);
        showToast('✅ Cập nhật trạng thái thành công!');
        renderAdminOrders(1); // Nên lấy page hiện tại, tạm thời dùng page 1
    } catch (err) {
        showToast('❌ Lỗi: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
        window.toggleLoader(false);
    }
};

window.updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
        window.toggleLoader(true);
        await orderApi.updatePaymentStatus(orderId, paymentStatus);
        showToast('✅ Cập nhật thanh toán thành công!');
        renderAdminOrders(1);
    } catch (err) {
        showToast('❌ Lỗi: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
        window.toggleLoader(false);
    }
};
