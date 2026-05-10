// src/templates/home.js
export const HomeTemplate = () => `
  <section class="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] border-b-2 border-charcoal">
    <!-- Left: Content -->
    <div class="p-12 lg:p-24 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-charcoal">
      <h1 class="text-7xl lg:text-9xl font-black uppercase leading-[0.8] mb-8 tracking-tighter">
        Phối <br> <span class="text-terracotta">Màu</span> <br> <span class="italic font-normal lowercase text-5xl lg:text-7xl">thông minh</span>
      </h1>
      <p class="text-lg font-medium text-slate-600 max-w-md mb-12 leading-relaxed">
        Cuộc cách mạng hóa không gian sống của bạn bằng sức mạnh của Trí tuệ nhân tạo. Chụp ảnh, phân tích và khoác lên lớp áo mới cho tổ ấm.
      </p>
      <div class="flex flex-wrap gap-6">
        <button onclick="window.navigate('ai')" class="btn-retro text-lg px-12">Khám phá AI Lab</button>
        <button onclick="window.navigate('products')" class="px-10 py-4 font-black uppercase tracking-widest text-xs border-2 border-charcoal hover:bg-charcoal hover:text-white transition-all">Xem sản phẩm</button>
      </div>
    </div>
    <!-- Right: Image -->
    <div class="relative bg-slate-200 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
      <div class="absolute inset-0 bg-terracotta/10 mix-blend-multiply"></div>
      <div class="absolute bottom-12 right-12 bg-white border-2 border-charcoal p-6 shadow-retro max-w-xs animate-bounce-slow">
        <p class="text-xs font-black uppercase mb-2">Cảm hứng hôm nay</p>
        <p class="font-serif italic text-xl italic">"Màu sắc là ngôn ngữ của linh hồn không gian."</p>
      </div>
    </div>
  </section>

  <div id="products-container" class="bg-white">
      <div class="py-24 text-center">
          <div class="w-12 h-12 border-4 border-charcoal border-t-terracotta animate-spin mx-auto mb-4"></div>
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Đang nạp bộ sưu tập...</p>
      </div>
  </div>
`;
