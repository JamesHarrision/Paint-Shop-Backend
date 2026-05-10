import { orderApi } from '../api.js';
import { OrdersTemplate } from '../templates/cart.js';
import { formatPrice } from './cart.handler.js';

export const renderOrdersPage = async (app, page = 1) => {
    app.innerHTML = '<div class="flex items-center justify-center h-[60vh]"><div class="w-8 h-8 border-4 border-charcoal border-t-terracotta animate-spin"></div></div>';
    try {
        const { data } = await orderApi.getMyOrders({ page, limit: 5 });
        app.innerHTML = OrdersTemplate(data.data, formatPrice, data.pagination);

        window.changeOrderPage = (newPage) => {
            renderOrdersPage(app, newPage);
            window.scrollTo(0, 0);
        };
    } catch (err) {
        console.error(err);
        app.innerHTML = `<div class="p-24 text-center"><h2 class="text-4xl font-black text-red-500 uppercase mb-4">Lỗi nạp đơn hàng</h2><p class="text-slate-500">${err.message}</p></div>`;
    }
};
