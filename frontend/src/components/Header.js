// src/components/Header.js
import { state } from '../state.js';

export const Header = () => {
  const user = state.user;
  
  return `
    <header class="bg-white border-b-4 border-black sticky top-0 z-[10001] py-4">
      <div class="container flex justify-between items-center">
        <div class="flex items-center gap-8 lg:gap-12">
          <h1 onclick="window.navigate('home')" class="text-2xl md:text-3xl font-black uppercase tracking-tighter cursor-pointer hover:skew-x-[-5deg] transition-transform">
            Paint <span class="bg-[#E2725B] text-white px-2 border-2 border-black">Shop</span>
          </h1>
          <nav class="hidden lg:flex gap-8 uppercase text-[12px] font-bold tracking-widest">
            <button onclick="window.navigate('home')" class="hover:underline decoration-4 underline-offset-4 decoration-[#E2725B]">Trang chủ</button>
            <button onclick="window.navigate('products')" class="hover:underline decoration-4 underline-offset-4 decoration-[#20B2AA]">Sản phẩm</button>
            <button onclick="window.navigate('collections')" class="hover:underline decoration-4 underline-offset-4 decoration-[#E2725B]">Bộ sưu tập</button>
            <button onclick="window.navigate('ai')" class="px-3 py-1 bg-[#20B2AA] text-white border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000] transition-all">AI Lab</button>
          </nav>
        </div>
        <div class="flex items-center gap-4 md:gap-6">
          ${user ? `
            <div class="flex items-center gap-4">
              <div class="hidden md:block text-right">
                <p class="text-[12px] font-black uppercase leading-none">${user.fullName}</p>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">${user.role}</p>
              </div>
              <div class="relative group">
                <button onclick="window.navigate('profile')" class="w-10 h-10 md:w-12 md:h-12 border-4 border-black bg-white flex items-center justify-center font-black text-lg md:text-xl shadow-[4px_4px_0px_#000] group-hover:bg-[#E2725B] group-hover:text-white transition-all">
                  ${user.fullName.charAt(0)}
                </button>
                <!-- Dropdown -->
                <div class="absolute right-0 top-full pt-4 hidden group-hover:block w-56">
                    <div class="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_#000]">
                        <button onclick="window.navigate('profile')" class="w-full text-left text-[12px] font-black uppercase hover:bg-gray-50 p-2">Hồ sơ cá nhân</button>
                        <button onclick="window.navigate('orders')" class="w-full text-left text-[12px] font-black uppercase hover:bg-gray-50 p-2">Đơn hàng của tôi</button>
                        ${user.role === 'ADMIN' ? `
                            <button onclick="window.navigate('admin')" class="w-full text-left text-[12px] font-black uppercase text-[#E2725B] p-2 border-t-2 border-black mt-2 pt-2">Bảng quản trị</button>
                        ` : ''}
                        <button id="btn-logout" class="w-full text-left text-[12px] font-black uppercase text-gray-500 p-2 border-t-2 border-black mt-2 pt-2 hover:bg-black hover:text-white transition-colors">Đăng xuất</button>
                    </div>
                </div>
              </div>
            </div>
          ` : `
            <div class="flex gap-2 md:gap-4">
              <button onclick="window.navigate('login')" class="text-[10px] md:text-[12px] font-black uppercase tracking-widest hover:underline decoration-4 decoration-[#E2725B] transition-all">Đăng nhập</button>
              <button onclick="window.navigate('register')" class="btn-brutal !py-2 !px-4 text-[10px] md:text-[12px]">Gia nhập</button>
            </div>
          `}
          <button onclick="window.navigate('cart')" class="relative p-2 border-2 md:border-4 border-black bg-white shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000] md:hover:shadow-[6px_6px_0px_#000] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span id="cart-count" class="absolute -top-2 -right-2 bg-[#E2725B] text-white text-[10px] font-black w-5 h-5 md:w-6 md:h-6 border-2 border-black flex items-center justify-center">0</span>
          </button>
        </div>
      </div>
    </header>
  `;
};
