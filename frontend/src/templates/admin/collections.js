// src/templates/admin/collections.js

export const AdminCollectionsTemplate = () => {
  return `
      <div>
        <div class="flex justify-between items-end mb-8 border-b-2 border-cream/20 pb-4">
          <div>
            <h2 class="text-3xl font-black text-terracotta italic">Quản lý <span class="text-terracotta italic">Bộ sưu tập</span></h2>
            <p class="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-60 text-cream">Danh sách toàn bộ bộ sưu tập</p>
          </div>
          <!-- Admin có thể tạo bộ sưu tập không? Có thì mở cái này -->
          <button onclick="window.showAddCollectionModal()" class="btn-retro">Thêm bộ sưu tập</button>
        </div>
        
        <div id="admin-collections-loader" class="py-12 text-center hidden">
          <div class="w-8 h-8 border-4 border-cream border-t-terracotta animate-spin mx-auto mb-4"></div>
        </div>
  
        <div class="bg-white text-charcoal border-4 border-charcoal shadow-retro overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr class="bg-charcoal text-cream text-[10px] uppercase tracking-widest font-black">
                <th class="p-4 border-r-2 border-cream/20">Ảnh & Tên</th>
                <th class="p-4 border-r-2 border-cream/20">Mô tả</th>
                <th class="p-4 border-r-2 border-cream/20 text-center">Số lượng</th>
                <th class="p-4 border-r-2 border-cream/20">Người tạo</th>
                <th class="p-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody id="admin-collections-list" class="text-sm font-bold">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>
    `;
};
