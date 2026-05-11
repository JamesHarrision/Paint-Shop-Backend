// src/components/Header.js
import { state } from '../state.js';

export const Header = () => {
  const user = state.user;
  
  return `
    <header class="bg-charcoal text-cream py-6 px-10 border-b-4 border-terracotta sticky top-0 z-[10001] shadow-2xl">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center gap-12">
          <h1 onclick="window.navigate('home')" class="text-3xl font-black uppercase tracking-tighter cursor-pointer group">
            Paint <span class="text-terracotta italic group-hover:not-italic transition-all">Shop</span>
          </h1>
          <nav class="hidden md:flex gap-8 uppercase text-[10px] font-black tracking-widest opacity-60">
            <button onclick="window.navigate('home')" class="hover:text-terracotta hover:opacity-100 transition-all">Trang chủ</button>
            <button onclick="window.navigate('products')" class="hover:text-terracotta hover:opacity-100 transition-all">Sản phẩm</button>
            <button onclick="window.navigate('collections')" class="hover:text-terracotta hover:opacity-100 transition-all">Bộ sưu tập</button>
            <button onclick="window.navigate('orders')" class="hover:text-terracotta hover:opacity-100 transition-all">Đơn hàng</button>
            <button onclick="window.navigate('ai')" class="hover:text-terracotta hover:opacity-100 transition-all text-teal">AI Color Lab</button>
          </nav>
        </div>
        <div class="flex items-center gap-6">
          ${user ? `
            <div class="flex items-center gap-4">
              <div class="hidden md:block text-right">
                <p class="text-[10px] font-black uppercase leading-none">${user.fullName}</p>
                <p class="text-[8px] opacity-40 uppercase tracking-widest mt-1">${user.role}</p>
              </div>
              <div class="relative group">
                <button onclick="window.navigate('profile')" class="w-10 h-10 border-2 border-cream rounded-full flex items-center justify-center font-black hover:bg-terracotta hover:border-terracotta transition-all shadow-retro-sm">
                  ${user.fullName.charAt(0)}
                </button>
                <!-- Dropdown đơn giản khi hover -->
                <div class="absolute right-0 top-full pt-4 hidden group-hover:block w-48">
                    <div class="bg-white border-2 border-charcoal p-4 shadow-retro text-charcoal">
                        <button onclick="window.navigate('profile')" class="w-full text-left text-[10px] font-black uppercase hover:text-terracotta py-2">Hồ sơ cá nhân</button>
                        <button onclick="window.navigate('orders')" class="w-full text-left text-[10px] font-black uppercase hover:text-terracotta py-2">Đơn hàng của tôi</button>
                        ${user.role === 'ADMIN' ? `
                            <button onclick="window.navigate('admin')" class="w-full text-left text-[10px] font-black uppercase text-terracotta py-2 border-t border-slate-100 mt-2 pt-2">Bảng quản trị</button>
                        ` : ''}
                        <button id="btn-logout" class="w-full text-left text-[10px] font-black uppercase text-red-500 py-2 border-t border-slate-100 mt-2 pt-2">Đăng xuất</button>
                    </div>
                </div>
              </div>
            </div>
          ` : `
            <div class="flex gap-4">
              <button onclick="window.navigate('login')" class="text-[10px] font-black uppercase tracking-widest hover:text-terracotta transition-all">Đăng nhập</button>
              <button onclick="window.navigate('register')" class="px-6 py-2 bg-terracotta text-white font-black uppercase text-[10px] tracking-widest shadow-retro-sm hover:scale-105 transition-all">Gia nhập</button>
            </div>
          `}
          <button onclick="window.navigate('cart')" class="relative p-2 hover:text-terracotta transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span id="cart-count" class="absolute -top-1 -right-1 bg-terracotta text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-charcoal">0</span>
          </button>
        </div>
      </div>
    </header>
  `;
};
