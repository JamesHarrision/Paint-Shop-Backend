// src/templates/cart.js
export const CartTemplate = () => `
  <section class="py-24 container mx-auto px-6 max-w-4xl">
    <h2 class="text-6xl font-black uppercase mb-16 italic">Bộ sưu tập <span class="not-italic">Đã chọn</span></h2>
    <div id="cart-items" class="space-y-8">
        <!-- Rendered via JS -->
    </div>
    <div id="cart-summary" class="mt-16 hidden">
        <div class="card-retro flex justify-between items-center !bg-charcoal text-cream">
            <div>
                <p class="text-[10px] uppercase tracking-widest opacity-60 mb-2">Tổng giá trị</p>
                <p class="text-4xl font-black" id="cart-total">Đang tính...</p>
            </div>
            <button id="btn-checkout" class="btn-retro !shadow-none hover:bg-terracotta !border-cream text-xs px-8">Thanh toán ngay</button>
        </div>
    </div>
  </section>
`;

export const CheckoutTemplate = (order, formatPrice) => `
    <section class="py-24 container mx-auto px-6 max-w-2xl text-center">
        <div class="w-20 h-20 bg-teal text-white flex items-center justify-center mx-auto mb-8 shadow-retro">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h2 class="text-5xl font-black uppercase mb-4">Hoàn tất!</h2>
        <p class="text-sm font-bold uppercase tracking-widest text-slate-500 mb-12">Lệnh đặt hàng: #<span class="text-charcoal border-b-2 border-charcoal">${order.id}</span></p>
        
        <div class="card-retro !p-12 mb-12">
            <p class="text-xs uppercase font-black tracking-widest text-slate-400 mb-4">Cần xử lý thanh toán</p>
            <p class="text-5xl font-black text-charcoal mb-12">${formatPrice(order.totalAmount)}</p>
            
            <div class="grid grid-cols-1 gap-6">
                <button id="btn-pay-vnpay" class="flex items-center justify-center gap-4 py-5 bg-white border-2 border-charcoal font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all shadow-retro">
                    <img src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo-vnpay.png" class="h-6">
                    Sử dụng Cổng VNPAY
                </button>
                <button onclick="window.navigate('orders')" class="font-black uppercase text-[10px] tracking-widest opacity-60 hover:opacity-100 transition-all">Thanh toán sau (COD)</button>
            </div>
        </div>
    </section>
`;

import { Pagination } from '../components/Pagination.js';

// src/templates/orders.js
export const OrdersTemplate = (orders, formatPrice, pagination) => `
    <section class="py-24 container mx-auto px-6 max-w-4xl">
        <h2 class="text-6xl font-black uppercase mb-16 italic">Lịch sử <span class="not-italic text-terracotta">Giao dịch</span></h2>
        <div class="space-y-10">
            ${orders.length === 0 ? '<div class="card-retro text-center py-24 uppercase font-black tracking-widest text-slate-400">Chưa có lịch sử...</div>' : ''}
            ${orders.map(o => `
                <div class="card-retro !p-0 overflow-hidden flex flex-col md:flex-row">
                    <div class="md:w-1/3 bg-charcoal text-cream p-8 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-charcoal">
                        <div>
                            <p class="text-[10px] uppercase tracking-widest opacity-60 mb-2">Mã đơn hàng</p>
                            <p class="font-black text-xl tracking-tighter">#${o.id}</p>
                        </div>
                        <div class="mt-8 flex flex-col items-start gap-3">
                            <span class="px-4 py-2 border-2 border-cream text-[10px] font-black uppercase tracking-widest ${
                                o.status === 'PENDING' ? '' :
                                o.status === 'PROCESSING' ? 'bg-blue-500 text-white border-blue-500' :
                                o.status === 'SHIPPED' ? 'bg-orange-500 text-white border-orange-500' :
                                o.status === 'DELIVERED' ? 'bg-teal text-white border-teal' :
                                'bg-red-500 text-white border-red-500'
                            }">
                                ${o.status === 'PENDING' ? 'Chờ xác nhận' :
                                  o.status === 'PROCESSING' ? 'Đang pha màu' :
                                  o.status === 'SHIPPED' ? 'Đang giao' :
                                  o.status === 'DELIVERED' ? 'Đã giao' :
                                  'Đã hủy'}
                            </span>
                            <span class="px-4 py-2 border-2 border-cream text-[10px] font-black uppercase tracking-widest ${
                                o.paymentStatus === 'PAID' ? 'bg-teal text-white border-teal' : 
                                o.paymentStatus === 'REFUNDED' ? 'bg-slate-400 text-white border-slate-400' : ''
                            }">
                                ${
                                    o.paymentStatus === 'PAID' ? 'Đã thanh toán' : 
                                    o.paymentStatus === 'REFUNDED' ? 'Đã hoàn tiền' : 'Chờ thanh toán'
                                }
                            </span>
                        </div>
                    </div>
                    <div class="md:w-2/3 p-8 flex flex-col justify-between">
                        <div class="flex gap-4 flex-wrap mb-8">
                            ${o.items.map(i => `
                                <img src="${i.product.imageUrl}" class="w-12 h-12 border-2 border-charcoal grayscale-[0.5] hover:grayscale-0 transition-all" title="${i.product.name}">
                            `).join('')}
                        </div>
                        <div class="flex justify-between items-end">
                            <div>
                                <p class="text-[10px] uppercase font-black text-slate-400 mb-1">Giá trị tổng</p>
                                <p class="text-3xl font-black">${formatPrice(o.totalAmount)}</p>
                            </div>
                            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">${new Date(o.createdAt).toLocaleDateString('vi-VN')}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        ${pagination ? Pagination(pagination, 'changeOrderPage') : ''}
    </section>
`;
