// src/components/AdminSidebar.js

export const AdminSidebar = (activeTab = 'users') => {
    const menuItems = [
        { id: 'users', label: 'Người dùng', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { id: 'products', label: 'Sản phẩm', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4' },
        { id: 'collections', label: 'Bộ sưu tập', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { id: 'orders', label: 'Đơn hàng', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' }
    ];

    return `
    <aside class="w-full md:w-72 bg-black text-white flex flex-col z-10 h-auto md:h-screen sticky top-0 border-r-4 border-black">
      <!-- Header -->
      <div class="px-8 py-10 border-b-4 border-white/10">
        <p class="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Hệ thống</p>
        <h1 class="text-3xl font-black uppercase tracking-tighter leading-none">
          ADMIN<br>
          <span class="text-[#E2725B]">CONSOLE</span>
        </h1>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-4 py-6 space-y-1">
        ${menuItems.map(item => `
          <a href="#/admin/${item.id}"
            class="w-full flex items-center gap-4 px-5 py-3.5 font-black uppercase text-[11px] tracking-widest transition-all rounded-none
              ${activeTab === item.id
                ? 'bg-[#E2725B] text-white border-l-4 border-white shadow-[4px_4px_0px_rgba(255,255,255,0.15)]'
                : 'text-white/60 hover:text-white hover:bg-white/10 border-l-4 border-transparent'
              }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="${item.icon}" />
            </svg>
            <span class="hidden md:inline">${item.label}</span>
          </a>
        `).join('')}
      </nav>

      <!-- Footer -->
      <div class="px-4 py-6 border-t-4 border-white/10">
        <button onclick="window.navigate('home')"
          class="w-full text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white border-2 border-white/20 hover:border-white/60 px-4 py-3 transition-all text-left flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Về cửa hàng
        </button>
      </div>
    </aside>
  `;
};
