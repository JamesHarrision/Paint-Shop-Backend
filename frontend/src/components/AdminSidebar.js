// src/components/AdminSidebar.js

export const AdminSidebar = (activeTab = 'users') => {
    const menuItems = [
        { id: 'users', label: 'Người dùng', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { id: 'products', label: 'Sản phẩm', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4' },
        { id: 'collections', label: 'Bộ sưu tập', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { id: 'orders', label: 'Đơn hàng', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' }
    ];

    return `
    <aside class="w-full md:w-80 bg-charcoal text-cream flex flex-col shadow-2xl z-10">
      <div class="p-10 border-b border-cream/10">
        <h1 class="text-3xl font-black uppercase tracking-tighter italic">Paint Shop <span class="text-terracotta not-italic font-serif block text-lg">Admin Console</span></h1>
      </div>
      <nav class="flex-1 p-6 space-y-2">
        ${menuItems.map(item => `
          <a 
            href="#/admin/${item.id}"
            class="w-full flex items-center gap-4 px-6 py-4 font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === item.id ? 'bg-terracotta text-white shadow-retro-sm' : 'hover:bg-cream/5 opacity-60 hover:opacity-100'}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.icon}" />
            </svg>
            ${item.label}
          </a>
        `).join('')}
      </nav>
      <div class="p-8 border-t border-cream/10 bg-black/20">
        <button onclick="window.navigate('home')" class="w-full py-4 border-2 border-cream/20 text-[10px] font-black uppercase tracking-widest hover:bg-cream hover:text-charcoal transition-all">Quay lại Cửa hàng</button>
      </div>
    </aside>
  `;
};
