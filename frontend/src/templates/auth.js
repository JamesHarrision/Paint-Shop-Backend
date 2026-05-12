// src/templates/auth.js
export const LoginTemplate = () => `
  <section class="py-24 container mx-auto px-6 flex justify-center">
    <div class="card-brutal w-full max-w-md bg-white">
      <h2 class="text-5xl font-black uppercase mb-12 text-center tracking-tighter">Đăng Nhập</h2>
      <form id="login-form" class="space-y-8">
        <div>
          <label class="block text-xs font-black uppercase tracking-widest mb-2 italic">Tài khoản Email</label>
          <input type="email" id="login-email" class="input-brutal" placeholder="your@email.com" required>
        </div>
        <div>
          <label class="block text-xs font-black uppercase tracking-widest mb-2 italic">Mật mã bảo mật</label>
          <input type="password" id="login-password" class="input-brutal" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn-brutal w-full mt-4 bg-[#C5FF2E] text-xl">Kích hoạt phiên bản</button>
      </form>
      <div class="mt-12 pt-8 border-t-4 border-black flex flex-col gap-6 text-center">
        <p class="text-xs font-black uppercase tracking-widest cursor-pointer text-[#FF4D4D] hover:underline" onclick="window.navigate('forgot-password')">Quên mật khẩu?</p>
        <p class="text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-black hover:text-white p-2 transition-colors border-2 border-black" onclick="window.navigate('register')">Chưa có thông tin? Gia nhập ngay</p>
      </div>
    </div>
  </section>
`;

export const RegisterTemplate = () => `
  <section class="py-24 container mx-auto px-6 flex justify-center">
    <div class="card-brutal w-full max-w-md bg-white">
      <h2 class="text-5xl font-black uppercase mb-12 text-center tracking-tighter">Gia Nhập</h2>
      <form id="register-form" class="space-y-6">
        <div>
          <label class="block text-xs font-black uppercase tracking-widest mb-2 italic">Họ tên đầy đủ</label>
          <input type="text" id="reg-name" class="input-brutal" placeholder="NGUYEN VAN A" required>
        </div>
        <div>
          <label class="block text-xs font-black uppercase tracking-widest mb-2 italic">Email đăng ký</label>
          <input type="email" id="reg-email" class="input-brutal" placeholder="your@email.com" required>
        </div>
        <div>
          <label class="block text-xs font-black uppercase tracking-widest mb-2 italic">Thiết lập mật khẩu</label>
          <input type="password" id="reg-password" class="input-brutal" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn-brutal w-full mt-4 bg-[#3B82F6] text-white text-xl">Đăng ký thành viên</button>
      </form>
      <p class="text-center mt-8 text-xs font-black uppercase tracking-widest cursor-pointer hover:underline" onclick="window.navigate('login')">Đã có tài khoản? Đăng nhập</p>
    </div>
  </section>
`;

export const ForgotPasswordTemplate = () => `
  <section class="py-24 container mx-auto px-6 flex justify-center">
    <div class="card-brutal w-full max-w-md bg-white">
      <h2 class="text-4xl font-black uppercase mb-8 text-center leading-none tracking-tighter">Khôi phục <span class="bg-[#FF4D4D] text-white px-2">Truy cập</span></h2>
      <p class="text-xs font-bold text-center mb-10 tracking-widest leading-relaxed uppercase italic">
        Nhập email của bạn, chúng tôi sẽ gửi mã khôi phục tài khoản.
      </p>
      <form id="forgot-form" class="space-y-8">
        <div>
          <label class="block text-xs font-black uppercase tracking-widest mb-2">Email đăng ký</label>
          <input type="email" id="forgot-email" class="input-brutal" required>
        </div>
        <button type="submit" class="btn-brutal w-full bg-[#C5FF2E] text-lg">Gửi mã khôi phục</button>
      </form>
      <p class="text-center mt-8 text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-black hover:text-white p-2 border-2 border-black transition-colors" onclick="window.navigate('login')">Quay lại đăng nhập</p>
    </div>
  </section>
`;

export const ResetPasswordTemplate = () => `
  <section class="py-24 container mx-auto px-6 flex justify-center">
    <div class="card-brutal w-full max-w-md bg-white">
      <h2 class="text-4xl font-black uppercase mb-8 text-center leading-none tracking-tighter">Mật mã <span class="bg-[#3B82F6] text-white px-2">Mới</span></h2>
      <p class="text-xs font-bold text-center mb-10 tracking-widest leading-relaxed uppercase italic">
        Thiết lập lại lớp bảo mật cho tài khoản của bạn.
      </p>
      <form id="reset-form" class="space-y-8">
        <div>
          <label class="block text-xs font-black uppercase tracking-widest mb-2">Mật khẩu mới</label>
          <input type="password" id="reset-password" class="input-brutal" required>
        </div>
        <div>
          <label class="block text-xs font-black uppercase tracking-widest mb-2">Xác nhận mật khẩu</label>
          <input type="password" id="reset-confirm" class="input-brutal" required>
        </div>
        <button type="submit" class="btn-brutal w-full bg-[#C5FF2E] text-lg">Cập nhật mật mã</button>
      </form>
    </div>
  </section>
`;
