// src/templates/auth.js
export const LoginTemplate = () => `
  <section class="min-h-[80vh] flex items-center justify-center py-16 px-6">
    <div class="w-full max-w-sm">
      <h2 class="text-5xl font-black uppercase tracking-tighter mb-12">ĐĂNG NHẬP</h2>
      <form id="login-form" class="space-y-8">
        <div>
          <label class="form-label">Tài khoản Email</label>
          <input type="email" id="login-email" class="input-brutal" placeholder="your@email.com" required>
        </div>
        <div>
          <label class="form-label">Mật mã bảo mật</label>
          <input type="password" id="login-password" class="input-brutal" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn-brutal w-full bg-[#E2725B] text-white text-base uppercase tracking-widest mt-4">
          Đăng nhập
        </button>
      </form>
      <div class="mt-10 space-y-4">
        <p class="text-[10px] font-black uppercase tracking-widest text-[#E2725B] cursor-pointer hover:underline"
           onclick="window.navigate('forgot-password')">Quên mật khẩu?</p>
        <button onclick="window.navigate('register')"
          class="text-[10px] font-black uppercase tracking-widest text-[#E2725B] cursor-pointer hover:underline">
          Chưa có tài khoản? đăng ký ngay
        </button>
      </div>
    </div>
  </section>
`;

export const RegisterTemplate = () => `
  <section class="min-h-[80vh] flex items-center justify-center py-16 px-6">
    <div class="w-full max-w-sm">
      <h2 class="text-5xl font-black uppercase tracking-tighter mb-12">đăng ký</h2>
      <form id="register-form" class="space-y-8">
        <div>
          <label class="form-label">Họ tên đầy đủ</label>
          <input type="text" id="reg-name" class="input-brutal" placeholder="NGUYEN VAN A" required>
        </div>
        <div>
          <label class="form-label">Email đăng ký</label>
          <input type="email" id="reg-email" class="input-brutal" placeholder="your@email.com" required>
        </div>
        <div>
          <label class="form-label">Thiết lập mật khẩu</label>
          <input type="password" id="reg-password" class="input-brutal" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn-brutal w-full bg-[#E2725B] text-white text-base uppercase tracking-widest mt-4">
          Đăng ký thành viên
        </button>
      </form>
      <p class="mt-8 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:underline"
         onclick="window.navigate('login')">Đã có tài khoản? Đăng nhập</p>
    </div>
  </section>
`;

export const ForgotPasswordTemplate = () => `
  <section class="min-h-[80vh] flex items-center justify-center py-16 px-6">
    <div class="w-full max-w-sm">
      <h2 class="text-4xl font-black uppercase tracking-tighter mb-3">KHÔI PHỤC</h2>
      <p class="text-sm text-black/50 font-medium mb-10 leading-relaxed">
        Nhập email đăng ký, chúng tôi sẽ gửi mã xác nhận về hộp thư của bạn.
      </p>
      <form id="forgot-form" class="space-y-8">
        <div>
          <label class="form-label">Email đăng ký</label>
          <input type="email" id="forgot-email" class="input-brutal" required>
        </div>
        <button type="submit" class="btn-brutal w-full bg-[#E2725B] text-white text-base uppercase tracking-widest mt-4">
          Gửi mã khôi phục
        </button>
      </form>
      <button onclick="window.navigate('login')"
        class="mt-6 text-[10px] font-black uppercase tracking-widest hover:underline">
        ← Quay lại đăng nhập
      </button>
    </div>
  </section>
`;

export const ResetPasswordTemplate = () => `
  <section class="min-h-[80vh] flex items-center justify-center py-16 px-6">
    <div class="w-full max-w-sm">
      <h2 class="text-4xl font-black uppercase tracking-tighter mb-3">MẬT MÃ MỚI</h2>
      <p class="text-sm text-black/50 font-medium mb-10 leading-relaxed">
        Thiết lập lại lớp bảo mật cho tài khoản của bạn.
      </p>
      <form id="reset-form" class="space-y-8">
        <div>
          <label class="form-label">Mật khẩu mới</label>
          <input type="password" id="reset-password" class="input-brutal" required>
        </div>
        <div>
          <label class="form-label">Xác nhận mật khẩu</label>
          <input type="password" id="reset-confirm" class="input-brutal" required>
        </div>
        <button type="submit" class="btn-brutal w-full bg-[#E2725B] text-white text-base uppercase tracking-widest mt-4">
          Cập nhật mật mã
        </button>
      </form>
    </div>
  </section>
`;
