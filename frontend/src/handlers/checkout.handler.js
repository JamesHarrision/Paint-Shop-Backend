// src/handlers/checkout.handler.js
import { orderApi, paymentApi } from '../api.js';
import { CheckoutTemplate } from '../templates/cart.js';
import { formatPrice } from './cart.handler.js';

export const initCheckoutHandler = async (orderId) => {
    const container = document.querySelector('#checkout-container');
    if (!container) return;

    window.toggleLoader(true);
    try {
        const { data } = await orderApi.getDetail(orderId);
        const order = data.data;

        container.innerHTML = CheckoutTemplate(order, formatPrice);

        const btnPay = document.querySelector('#btn-pay-vnpay');
        if (btnPay) {
            btnPay.onclick = async () => {
                try {
                    btnPay.innerText = 'Đang chuyển hướng...';
                    const res = await paymentApi.createUrl(order.id);
                    window.location.href = res.data.data.paymentUrl;
                } catch (err) {
                    alert('❌ Lỗi tạo phiên thanh toán: ' + err.message);
                    btnPay.innerText = 'Thanh Toán VNPay';
                }
            };
        }

    } catch (err) {
        console.error('Lỗi lấy đơn hàng:', err);
        container.innerHTML = '<div class="py-24 text-center font-black uppercase text-terracotta">Không tìm thấy đơn hàng</div>';
    } finally {
        window.toggleLoader(false);
    }
};
