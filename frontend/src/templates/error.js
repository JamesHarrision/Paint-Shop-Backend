// src/templates/error.js

export const Error404Template = () => {
    return `
      <section class="py-24 bg-cream min-h-[70vh] flex items-center justify-center text-center">
          <div class="container mx-auto px-6 max-w-xl">
              <h1 class="text-[120px] font-black leading-none text-charcoal opacity-20 relative inline-block">
                  404
                  <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-terracotta text-2xl uppercase tracking-[0.5em] font-black w-full block bg-cream py-2">
                      Not Found
                  </span>
              </h1>
              <h2 class="text-3xl font-black uppercase mt-8 mb-4">Trang không tồn tại</h2>
              <p class="text-xs uppercase font-bold tracking-widest opacity-60 mb-12">
                  Có vẻ như đường dẫn này không tồn tại hoặc đã bị xóa. Hãy kiểm tra lại URL.
              </p>
              <button onclick="window.navigate('home')" class="btn-retro">
                  Về trang chủ
              </button>
          </div>
      </section>
    `;
};
  
export const Error403Template = () => {
    return `
      <section class="py-24 bg-cream min-h-[70vh] flex items-center justify-center text-center">
          <div class="container mx-auto px-6 max-w-xl">
              <h1 class="text-[120px] font-black leading-none text-charcoal opacity-20 relative inline-block">
                  403
                  <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 text-2xl uppercase tracking-[0.5em] font-black w-full block bg-cream py-2">
                      Forbidden
                  </span>
              </h1>
              <h2 class="text-3xl font-black uppercase mt-8 mb-4">Từ chối truy cập</h2>
              <p class="text-xs uppercase font-bold tracking-widest opacity-60 mb-12">
                  Bạn không có quyền truy cập vào khu vực này. Vui lòng đăng nhập với tài khoản hợp lệ.
              </p>
              <div class="flex justify-center gap-4">
                  <button onclick="window.navigate('login')" class="btn-retro">Đăng nhập</button>
                  <button onclick="window.navigate('home')" class="px-6 py-2 border-2 border-charcoal text-charcoal font-black uppercase tracking-widest text-[10px] transition-all hover:bg-charcoal/10">Trang chủ</button>
              </div>
          </div>
      </section>
    `;
};
