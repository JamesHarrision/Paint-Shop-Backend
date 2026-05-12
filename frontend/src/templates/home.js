// src/templates/home.js
export const HomeTemplate = () => `
  <section class="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] border-b-4 border-black">
    <!-- Left: Content -->
    <div class="p-8 md:p-16 lg:p-24 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white">
      <div class="animate-fade-in">
        <span class="bg-[#20B2AA] text-white px-4 py-1 border-2 border-black font-black uppercase text-[12px] tracking-widest mb-6 inline-block shadow-[4px_4px_0px_#000]">
          Sáng tạo vô hạn
        </span>
        <h1 class="text-5xl md:text-7xl lg:text-[8rem] font-black uppercase leading-[1.1] mb-10 tracking-tighter">
          Nghệ <span class="bg-[#E2725B] text-white px-4 border-4 border-black shadow-[8px_8px_0px_#000]">Thuật</span> <br/>
          <span class="text-outline">Màu Sắc</span>
        </h1>
        <p class="text-lg md:text-xl font-bold text-black max-w-md mb-12 leading-relaxed border-l-8 border-[#E2725B] pl-6">
          Cuộc cách mạng hóa không gian sống của bạn bằng sức mạnh của AI. Chụp ảnh, phân tích và khoác lên lớp áo mới cho tổ ấm của bạn ngay hôm nay.
        </p>
        <div class="flex flex-wrap gap-6">
          <button onclick="window.navigate('ai')" class="btn-brutal bg-[#E2725B] text-lg md:text-xl px-10">Khám phá Python Lab</button>
          <button onclick="window.navigate('products')" class="btn-brutal bg-white text-black text-lg px-10">Xem sản phẩm</button>
        </div>
      </div>
    </div>
    
    <!-- Right: Image / Visual -->
    <div class="relative bg-[#F9F7F2] overflow-hidden flex items-center justify-center p-8 md:p-16">
      <div class="relative z-10 w-full h-full border-4 border-black shadow-[16px_16px_0px_#000] overflow-hidden bg-white aspect-square md:aspect-auto md:h-full">
        <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=2000" 
             class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105">
        
        <div class="absolute top-0 left-0 bg-black text-white px-6 py-2 font-black uppercase text-lg">
          TỔ ẤM MỚI
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute top-10 right-10 w-24 h-24 bg-[#E2725B] border-4 border-black rounded-full animate-bounce hidden md:block"></div>
      <div class="absolute bottom-20 left-10 w-20 h-20 bg-[#20B2AA] border-4 border-black rotate-45 animate-pulse hidden md:block"></div>
    </div>
  </section>

  <!-- Marquee Ticker -->
  <div class="marquee-container">
    <div class="marquee-track">
      <span>PAINT SHOP AI • CÔNG NGHỆ PHỐI MÀU THÔNG MINH • THIẾT KẾ KHÔNG GIAN SỐNG • SÁNG TẠO KHÔNG GIỚI HẠN</span>
      <span>PAINT SHOP AI • CÔNG NGHỆ PHỐI MÀU THÔNG MINH • THIẾT KẾ KHÔNG GIAN SỐNG • SÁNG TẠO KHÔNG GIỚI HẠN</span>
      <span>PAINT SHOP AI • CÔNG NGHỆ PHỐI MÀU THÔNG MINH • THIẾT KẾ KHÔNG GIAN SỐNG • SÁNG TẠO KHÔNG GIỚI HẠN</span>
      <span>PAINT SHOP AI • CÔNG NGHỆ PHỐI MÀU THÔNG MINH • THIẾT KẾ KHÔNG GIAN SỐNG • SÁNG TẠO KHÔNG GIỚI HẠN</span>
      <span>PAINT SHOP AI • CÔNG NGHỆ PHỐI MÀU THÔNG MINH • THIẾT KẾ KHÔNG GIAN SỐNG • SÁNG TẠO KHÔNG GIỚI HẠN</span>
      <span>PAINT SHOP AI • CÔNG NGHỆ PHỐI MÀU THÔNG MINH • THIẾT KẾ KHÔNG GIAN SỐNG • SÁNG TẠO KHÔNG GIỚI HẠN</span>
      <span>PAINT SHOP AI • CÔNG NGHỆ PHỐI MÀU THÔNG MINH • THIẾT KẾ KHÔNG GIAN SỐNG • SÁNG TẠO KHÔNG GIỚI HẠN</span>
      <span>PAINT SHOP AI • CÔNG NGHỆ PHỐI MÀU THÔNG MINH • THIẾT KẾ KHÔNG GIAN SỐNG • SÁNG TẠO KHÔNG GIỚI HẠN</span>
    </div>
  </div>


  <div id="products-container" class="container section-padding">
      <h2 class="text-4xl md:text-6xl font-black mb-12 text-center uppercase tracking-tighter">Bộ sưu tập nổi bật</h2>
      <div class="flex justify-center py-24">
          <div class="loader-box"></div>
      </div>
  </div>

  <style>
    .text-outline {
      color: transparent;
      -webkit-text-stroke: 3px black;
    }
    
    @media (max-width: 768px) {
      .text-outline {
        -webkit-text-stroke: 1.5px black;
      }
    }
  </style>
`;
