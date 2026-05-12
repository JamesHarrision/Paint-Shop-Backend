// src/components/AdminSidebar.js

// src/components/AdminSidebar.js

export const AdminSidebar = (activeTab = 'users') => {
    const menuItems = [
        { id: 'users', label: 'Người dùng', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { id: 'products', label: 'Sản phẩm', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4' },
        { id: 'collections', label: 'Bộ sưu tập', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { id: 'orders', label: 'Đơn hàng', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' }
    ];

    return `
    <aside class="w-full md:w-80 bg-white border-r-4 border-black flex flex-col z-10 h-auto md:h-screen sticky top-0">
      <div class="p-8 md:p-10 border-b-4 border-black bg-black text-white">
        <h1 class="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">ADMIN <span class="bg-[#C5FF2E] text-black px-2 not-italic block text-lg mt-2 shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">Console</span></h1>
      </div>
      <nav class="flex-1 p-6 md:p-8 space-y-3 md:space-y-4">
        ${menuItems.map(item => `
          <a 
            href="#/admin/${item.id}"
            class="w-full flex items-center gap-4 px-6 py-4 font-black uppercase text-[10px] tracking-widest transition-all border-4 ${activeTab === item.id ? 'bg-[#3B82F6] text-white border-black shadow-[6px_6px_0px_#000] translate-x-[-2px] translate-y-[-2px]' : 'border-transparent hover:border-black hover:bg-gray-50'}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="${item.icon}" />
            </svg>
            <span class="hidden md:inline">${item.label}</span>
            <span class="md:hidden">${item.label.charAt(0)}</span>
          </a>
        `).join('')}
      </nav>
      <div class="p-6 md:p-8 border-t-4 border-black bg-[#C5FF2E]/10">
        <button onclick="window.navigate('home')" class="btn-brutal w-full bg-white text-black text-[10px] !py-3 hover:bg-[#C5FF2E]">QUAY LẠI CỬA HÀNG</button>
      </div>
    </aside>
  `;
};

