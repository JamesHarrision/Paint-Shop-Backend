// src/templates/home.js
export const HomeTemplate = () => `
  <section class="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] border-b-4 border-black">
    <!-- Left: Content -->
    <div class="p-12 lg:p-24 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white">
      <div class="animate-fade-in">
        <span class="bg-[#3B82F6] text-white px-4 py-1 border-2 border-black font-black uppercase text-[12px] tracking-widest mb-6 inline-block shadow-[4px_4px_0px_#000]">
          Sáng tạo vô hạn
        </span>
        <h1 class="text-7xl lg:text-[10rem] font-black uppercase leading-[0.8] mb-8 tracking-tighter">
          Nghệ <span class="bg-[#C5FF2E] px-4 border-4 border-black shadow-[10px_10px_0px_#000]">Thuật</span> <br/>
          <span class="text-outline">Màu Sắc</span>
        </h1>
        <p class="text-xl font-bold text-black max-w-md mb-12 leading-relaxed border-l-8 border-[#FF4D4D] pl-6">
          Cuộc cách mạng hóa không gian sống của bạn bằng sức mạnh của AI. Chụp ảnh, phân tích và khoác lên lớp áo mới cho tổ ấm của bạn ngay hôm nay.
        </p>
        <div class="flex flex-wrap gap-6">
          <button onclick="window.navigate('ai')" class="btn-brutal bg-[#C5FF2E] text-xl px-12">Khám phá AI Lab</button>
          <button onclick="window.navigate('products')" class="btn-brutal bg-white text-lg">Xem sản phẩm</button>
        </div>
      </div>
    </div>
    
    <!-- Right: Image / Visual -->
    <div class="relative bg-[#FF4D4D] overflow-hidden flex items-center justify-center p-12">
      <div class="relative z-10 w-full h-full border-4 border-black shadow-[20px_20px_0px_#000] overflow-hidden bg-white">
        <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=2000" 
             class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-110">
        
        <div class="absolute top-0 left-0 bg-black text-white px-6 py-2 font-black uppercase text-xl">
          TỔ ẤM MỚI
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute top-10 right-10 w-32 h-32 bg-[#C5FF2E] border-4 border-black rounded-full animate-bounce"></div>
      <div class="absolute bottom-20 left-10 w-24 h-24 bg-[#3B82F6] border-4 border-black rotate-45 animate-pulse"></div>
    </div>
  </section>

  <!-- Marquee Ticker -->
  <div class="bg-black text-white py-4 overflow-hidden whitespace-nowrap border-b-4 border-black">
    <div class="inline-block animate-marquee uppercase font-black text-4xl tracking-tighter">
      PAINT SHOP AI • CÔNG NGHỆ PHỐI MÀU THÔNG MINH • THIẾT KẾ KHÔNG GIAN SỐNG • SÁNG TẠO KHÔNG GIỚI HẠN • 
      PAINT SHOP AI • CÔNG NGHỆ PHỐI MÀU THÔNG MINH • THIẾT KẾ KHÔNG GIAN SỐNG • SÁNG TẠO KHÔNG GIỚI HẠN • 
    </div>
  </div>

  <div id="products-container" class="container section-padding">
      <h2 class="text-6xl font-black mb-12 text-center uppercase tracking-tighter">Bộ sưu tập nổi bật</h2>
      <div class="flex justify-center py-24">
          <div class="loader-box"></div>
      </div>
  </div>

  <style>
    .text-outline {
      color: white;
      -webkit-text-stroke: 3px black;
    }
    
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    
    .animate-marquee {
      animation: marquee 20s linear infinite;
    }
  </style>
`;
