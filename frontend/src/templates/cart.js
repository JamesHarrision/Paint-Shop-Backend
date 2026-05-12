// src/templates/cart.js
export const CartTemplate = () => `
  <section class="py-12 md:py-24 container mx-auto px-6 max-w-4xl">
    <h2 class="text-4xl md:text-6xl font-black uppercase mb-12 md:mb-16 tracking-tighter">Bộ sưu tập <span class="bg-[#E2725B] text-white px-2 border-2 border-black shadow-[4px_4px_0px_#000]">Đã chọn</span></h2>
    <div id="cart-items" class="space-y-6 md:space-y-8">
        <!-- Rendered via JS -->
    </div>
    <div id="cart-summary" class="mt-16 hidden animate-fade-in">
        <div class="card-brutal flex flex-col md:flex-row justify-between items-center bg-black text-white !p-8 md:!p-12">
            <div class="text-center md:text-left">
                <p class="text-[10px] uppercase tracking-widest font-bold mb-2 text-[#20B2AA]">Tổng giá trị đơn hàng</p>
                <p class="text-4xl md:text-5xl font-black" id="cart-total">Đang tính...</p>
            </div>
            <button id="btn-checkout" class="btn-brutal bg-[#E2725B] text-white text-lg md:text-xl px-12 mt-8 md:mt-0 w-full md:w-auto">Thanh toán ngay</button>
        </div>
    </div>
  </section>
`;

export const CheckoutTemplate = (order, formatPrice) => `
    <section class="py-12 md:py-24 container mx-auto px-6 max-w-2xl text-center">
        <div class="w-20 h-20 md:w-24 md:h-24 bg-[#20B2AA] border-4 border-black flex items-center justify-center mx-auto mb-8 shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h2 class="text-4xl md:text-6xl font-black uppercase mb-4 tracking-tighter">Hoàn tất!</h2>
        <p class="text-sm md:text-lg font-bold uppercase tracking-widest text-gray-500 mb-12 italic">Lệnh đặt hàng: #<span class="text-black border-b-4 border-black">${order.id}</span></p>
        
        <div class="card-brutal !p-8 md:!p-12 mb-12 bg-white">
            <p class="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-4">Tổng số tiền cần thanh toán</p>
            <p class="text-4xl md:text-6xl font-black text-black mb-12 tracking-tighter">${formatPrice(order.totalAmount)}</p>
            
            <div class="grid grid-cols-1 gap-6">
                <button id="btn-pay-vnpay" class="btn-brutal bg-white w-full flex items-center justify-center gap-4 py-6">
                    <img src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo-vnpay.png" class="h-6 md:h-8">
                    <span class="text-lg md:text-xl text-black">Cổng VNPAY</span>
                </button>
                <button onclick="window.navigate('orders')" class="font-black uppercase text-[10px] tracking-widest hover:underline decoration-4 decoration-[#E2725B] mt-4">Thanh toán sau (COD)</button>
            </div>
        </div>
    </section>
`;

import { Pagination } from '../components/Pagination.js';

// src/templates/orders.js
export const OrdersTemplate = (orders, formatPrice, pagination) => `
    <section class="py-12 md:py-24 container mx-auto px-6 max-w-5xl">
        <h2 class="text-4xl md:text-6xl font-black uppercase mb-12 md:mb-16 tracking-tighter">Lịch sử <span class="bg-[#20B2AA] text-white px-2 border-2 border-black">Giao dịch</span></h2>
        <div class="space-y-10 md:space-y-12">
            ${orders.length === 0 ? '<div class="card-brutal text-center py-24 uppercase font-black tracking-widest text-gray-300 italic text-xl bg-white">Chưa có lịch sử giao dịch...</div>' : ''}
            ${orders.map(o => `
                <div class="card-brutal !p-0 overflow-hidden flex flex-col md:flex-row bg-white">
                    <div class="md:w-1/3 bg-black text-white p-8 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-black">
                        <div>
                            <p class="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Mã đơn hàng</p>
                            <p class="font-black text-2xl md:text-3xl tracking-tighter">#${o.id}</p>
                        </div>
                        <div class="mt-8 flex flex-col items-start gap-4">
                            <span class="px-4 py-2 border-2 border-white text-[10px] font-black uppercase tracking-widest ${
                                o.status === 'PENDING' ? 'bg-white text-black' :
                                o.status === 'PROCESSING' ? 'bg-[#20B2AA] text-white' :
                                o.status === 'SHIPPED' ? 'bg-[#E2725B] text-white' :
                                o.status === 'DELIVERED' ? 'bg-white text-black' :
                                'bg-[#FF4D4D] text-white'
                            }">
                                ${o.status === 'PENDING' ? 'Chờ xác nhận' :
                                o.status === 'PROCESSING' ? 'Đang pha màu' :
                                o.status === 'SHIPPED' ? 'Đang giao' :
                                o.status === 'DELIVERED' ? 'Đã giao' :
                                'Đã hủy'}
                            </span>
                            <span class="px-4 py-2 border-2 border-white text-[10px] font-black uppercase tracking-widest ${
                                o.paymentStatus === 'PAID' ? 'bg-[#20B2AA] text-white' :
                                o.paymentStatus === 'REFUNDED' ? 'bg-gray-500 text-white' : 'bg-transparent text-white'
                            }">
                                ${o.paymentStatus === 'PAID' ? 'Đã thanh toán' :
                                o.paymentStatus === 'REFUNDED' ? 'Đã hoàn tiền' : 'Chờ thanh toán'
                            }
                            </span>
                        </div>
                    </div>
                    <div class="md:w-2/3 p-8 flex flex-col justify-between">
                        <div class="flex gap-4 flex-wrap mb-8">
                            ${o.items.map(i => `
                                <div class="relative w-12 h-12 md:w-16 md:h-16 border-2 border-black shadow-[2px_2px_0px_#000]">
                                    <img src="${i.product.imageUrl}" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" title="${i.product.name}">
                                    <span class="absolute -bottom-2 -right-2 bg-black text-white text-[8px] px-1 font-bold">x${i.quantity}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="flex justify-between items-end">
                            <div>
                                <p class="text-[10px] uppercase font-black text-gray-400 mb-1">Giá trị tổng</p>
                                <p class="text-3xl md:text-4xl font-black tracking-tighter">${formatPrice(o.totalAmount)}</p>
                            </div>
                            <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-2 border-black px-2 py-1">${new Date(o.createdAt).toLocaleDateString('vi-VN')}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        ${pagination ? Pagination(pagination, 'changeOrderPage') : ''}
    </section>
`;
