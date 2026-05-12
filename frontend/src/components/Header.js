// src/components/Header.js
import { state } from '../state.js';

export const Header = () => {
  const user = state.user;
  
  return `
    <header class="bg-white border-b-4 border-black sticky top-0 z-[10001] py-4">
      <div class="container mx-auto px-6 flex justify-between items-center">
        <div class="flex items-center gap-12">
          <h1 onclick="window.navigate('home')" class="text-3xl font-black uppercase tracking-tighter cursor-pointer hover:skew-x-[-10deg] transition-transform">
            Paint <span class="bg-[#C5FF2E] px-2 border-2 border-black">Shop</span>
          </h1>
          <nav class="hidden lg:flex gap-8 uppercase text-[12px] font-bold tracking-widest">
            <button onclick="window.navigate('home')" class="hover:underline decoration-4 underline-offset-4 decoration-[#C5FF2E]">Trang chủ</button>
            <button onclick="window.navigate('products')" class="hover:underline decoration-4 underline-offset-4 decoration-[#3B82F6]">Sản phẩm</button>
            <button onclick="window.navigate('collections')" class="hover:underline decoration-4 underline-offset-4 decoration-[#FF4D4D]">Bộ sưu tập</button>
            <button onclick="window.navigate('ai')" class="px-3 py-1 bg-[#C5FF2E] border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000] transition-all">AI Lab</button>
          </nav>
        </div>
        <div class="flex items-center gap-6">
          ${user ? `
            <div class="flex items-center gap-4">
              <div class="hidden md:block text-right">
                <p class="text-[12px] font-black uppercase leading-none">${user.fullName}</p>
                <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">${user.role}</p>
              </div>
              <div class="relative group">
                <button onclick="window.navigate('profile')" class="w-12 h-12 border-4 border-black bg-white flex items-center justify-center font-black text-xl shadow-[4px_4px_0px_#000] group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                  ${user.fullName.charAt(0)}
                </button>
                <!-- Dropdown -->
                <div class="absolute right-0 top-full pt-4 hidden group-hover:block w-56">
                    <div class="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_#000]">
                        <button onclick="window.navigate('profile')" class="w-full text-left text-[12px] font-black uppercase hover:bg-gray-100 p-2">Hồ sơ cá nhân</button>
                        <button onclick="window.navigate('orders')" class="w-full text-left text-[12px] font-black uppercase hover:bg-gray-100 p-2">Đơn hàng của tôi</button>
                        ${user.role === 'ADMIN' ? `
                            <button onclick="window.navigate('admin')" class="w-full text-left text-[12px] font-black uppercase text-[#FF4D4D] p-2 border-t-2 border-black mt-2 pt-2">Bảng quản trị</button>
                        ` : ''}
                        <button id="btn-logout" class="w-full text-left text-[12px] font-black uppercase text-gray-500 p-2 border-t-2 border-black mt-2 pt-2 hover:bg-black hover:text-white transition-colors">Đăng xuất</button>
                    </div>
                </div>
              </div>
            </div>
          ` : `
            <div class="flex gap-4">
              <button onclick="window.navigate('login')" class="text-[12px] font-black uppercase tracking-widest hover:underline decoration-4 decoration-[#C5FF2E] transition-all">Đăng nhập</button>
              <button onclick="window.navigate('register')" class="btn-brutal text-[12px]">Gia nhập</button>
            </div>
          `}
          <button onclick="window.navigate('cart')" class="relative p-2 border-4 border-black bg-white shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span id="cart-count" class="absolute -top-2 -right-2 bg-[#FF4D4D] text-white text-[10px] font-black w-6 h-6 border-2 border-black flex items-center justify-center">0</span>
          </button>
        </div>
      </div>
    </header>
  `;
};
