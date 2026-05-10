// src/templates/auth.js
export const LoginTemplate = () => `
  <section class="py-24 container mx-auto px-6 flex justify-center">
    <div class="card-retro w-full max-w-md !p-12">
      <h2 class="text-5xl font-black uppercase mb-12 text-center">Gia Nhập</h2>
      <form id="login-form" class="space-y-8">
        <div>
          <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Đường truyền Email</label>
          <input type="email" id="login-email" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold" required>
        </div>
        <div>
          <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Mã khóa bảo mật</label>
          <input type="password" id="login-password" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold" required>
        </div>
        <button type="submit" class="btn-retro w-full mt-4">Kích hoạt phiên bản</button>
      </form>
      <div class="mt-12 pt-8 border-t border-slate-100 flex flex-col gap-6 text-center">
        <p class="text-[10px] font-black uppercase tracking-widest cursor-pointer text-terracotta hover:underline" onclick="window.navigate('forgot-password')">Vấn đề về mật mã? Khôi phục tại đây</p>
        <p class="text-[10px] font-black uppercase tracking-widest cursor-pointer text-slate-400 hover:text-charcoal transition-colors" onclick="window.navigate('register')">Chưa có thông tin? Gia nhập ngay</p>
      </div>
    </div>
  </section>
`;

export const RegisterTemplate = () => `
  <section class="py-24 container mx-auto px-6 flex justify-center">
    <div class="card-retro w-full max-w-md !p-12">
      <h2 class="text-5xl font-black uppercase mb-12 text-center">Gia Nhập</h2>
      <form id="register-form" class="space-y-6">
        <div>
          <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Họ tên đầy đủ</label>
          <input type="text" id="reg-name" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold" required>
        </div>
        <div>
          <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Email</label>
          <input type="email" id="reg-email" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold" required>
        </div>
        <div>
          <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Mật khẩu</label>
          <input type="password" id="reg-password" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold" required>
        </div>
        <button type="submit" class="btn-retro w-full mt-4">Đăng ký thành viên</button>
      </form>
      <p class="text-center mt-6 text-xs font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-charcoal" onclick="window.navigate('login')">Đã có tài khoản? Đăng nhập</p>
    </div>
  </section>
`;

export const ForgotPasswordTemplate = () => `
  <section class="py-24 container mx-auto px-6 flex justify-center">
    <div class="card-retro w-full max-w-md !p-12">
      <h2 class="text-4xl font-black uppercase mb-8 text-center leading-none">Khôi phục <br> <span class="text-terracotta">Truy cập</span></h2>
      <p class="text-xs text-slate-500 uppercase font-black text-center mb-10 tracking-widest leading-relaxed">
        Nhập email của bạn, chúng tôi sẽ gửi mã khôi phục tài khoản.
      </p>
      <form id="forgot-form" class="space-y-8">
        <div>
          <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Email đăng ký</label>
          <input type="email" id="forgot-email" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold" required>
        </div>
        <button type="submit" class="btn-retro w-full">Gửi mã khôi phục</button>
      </form>
      <p class="text-center mt-8 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-charcoal opacity-40" onclick="window.navigate('login')">Quay lại đăng nhập</p>
    </div>
  </section>
`;
export const ResetPasswordTemplate = () => `
  <section class="py-24 container mx-auto px-6 flex justify-center">
    <div class="card-retro w-full max-w-md !p-12">
      <h2 class="text-4xl font-black uppercase mb-8 text-center leading-none">Mật mã <br> <span class="text-terracotta">Mới</span></h2>
      <p class="text-xs text-slate-500 uppercase font-black text-center mb-10 tracking-widest leading-relaxed">
        Thiết lập lại lớp bảo mật cho tài khoản của bạn.
      </p>
      <form id="reset-form" class="space-y-8">
        <div>
          <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Mật khẩu mới</label>
          <input type="password" id="reset-password" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold" required>
        </div>
        <div>
          <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Xác nhận mật khẩu</label>
          <input type="password" id="reset-confirm" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold" required>
        </div>
        <button type="submit" class="btn-retro w-full">Cập nhật mật mã</button>
      </form>
    </div>
  </section>
`;
