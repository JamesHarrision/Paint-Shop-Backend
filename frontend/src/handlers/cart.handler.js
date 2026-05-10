import { state } from '../state.js';
import { productApi, orderApi, paymentApi } from '../api.js';
import { navigate } from '../router.js';
import { showToast } from '../ui.js';

export const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export const addToCart = (productId) => {
    const item = state.cart.find(i => i.productId === productId);
    if (item) {
      item.quantity += 1;
    } else {
      state.cart.push({ productId, quantity: 1 });
    }
    state.setCart([...state.cart]);
    showToast('🎨 Đã thêm vào bộ sưu tập của bạn!');
};

window.addToCart = addToCart;

export const renderCartDetails = async (renderCheckoutFn) => {
    if (state.cart.length === 0) return;
    const itemsDiv = document.querySelector('#cart-items');
    const summaryDiv = document.querySelector('#cart-summary');
    let total = 0;
    
    summaryDiv.classList.remove('hidden');

    const itemsHtml = await Promise.all(state.cart.map(async (item) => {
        try {
            const { data } = await productApi.getById(item.productId);
            const product = data.data;
            total += Number(product.price) * item.quantity;
            return `
                <div class="flex flex-col md:flex-row items-center gap-10 card-retro">
                    <img src="${product.imageUrl || 'https://via.placeholder.com/300x400'}" class="w-32 h-40 border-2 border-charcoal grayscale-[0.2] object-cover">
                    <div class="flex-1 text-center md:text-left">
                        <span class="text-[10px] uppercase font-black text-terracotta tracking-widest mb-2 block">Premium Product</span>
                        <h4 class="text-2xl font-black uppercase mb-2">${product.name}</h4>
                        <p class="text-2xl font-black">${formatPrice(product.price)}</p>
                    </div>
                    <div class="text-center border-t-2 md:border-t-0 md:border-l-2 border-charcoal pt-6 md:pt-0 md:pl-10 w-full md:w-auto">
                        <p class="text-[10px] uppercase font-black opacity-40 mb-2">Số lượng</p>
                        <p class="text-4xl font-black">x${item.quantity}</p>
                    </div>
                </div>
            `;
        } catch (e) { return ''; }
    }));
    
    itemsDiv.innerHTML = itemsHtml.join('');
    document.querySelector('#cart-total').innerText = formatPrice(total);

    document.querySelector('#btn-checkout').onclick = async () => {
        if (!state.user) return navigate('login');
        try {
            window.toggleLoader(true);
            const { data } = await orderApi.create({ items: state.cart });
            state.setCart([]);
            renderCheckoutFn(data.data);
        } catch (err) {
            showToast('❌ Đặt hàng thất bại: ' + (err.response?.data?.message || err.message), 'error');
        } finally {
            window.toggleLoader(false);
        }
    };
};

export const initCheckoutHandler = (order) => {
    document.querySelector('#btn-pay-vnpay').onclick = async () => {
        try {
            const { data } = await paymentApi.createUrl(order.id);
            window.location.href = data.data.paymentUrl;
        } catch (err) {
            alert('❌ Lỗi tạo phiên thanh toán: ' + err.message);
        }
    };
};
