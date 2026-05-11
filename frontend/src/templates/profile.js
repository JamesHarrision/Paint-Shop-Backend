// src/templates/profile.js
export const ProfileTemplate = (user) => {
  if (!user) return `
    <section class="py-24 text-center">
        <div class="w-12 h-12 border-4 border-charcoal border-t-terracotta animate-spin mx-auto mb-4"></div>
        <p class="font-black uppercase text-xs tracking-widest">Đang nạp hồ sơ...</p>
    </section>
  `;

  return `
  <section class="py-24 container mx-auto px-6 max-w-4xl">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="md:col-span-1">
            <div class="card-retro text-center !p-10 !bg-charcoal text-cream">
                <div class="w-24 h-24 bg-terracotta rounded-full mx-auto mb-6 border-4 border-cream shadow-retro-sm flex items-center justify-center text-4xl font-black uppercase">
                    ${user.fullName?.charAt(0) || '?'}
                </div>
                <h3 class="text-2xl font-black uppercase mb-2 leading-none">${user.fullName || 'Người dùng'}</h3>
                <p class="text-[10px] uppercase tracking-widest opacity-60">${user.role}</p>
                <div class="mt-10 pt-10 border-t border-cream/20 flex flex-col gap-4">
                    <button id="btn-show-edit" class="text-[10px] font-black uppercase tracking-widest hover:text-terracotta transition-all">Sửa thông tin</button>
                    <button id="btn-show-pass" class="text-[10px] font-black uppercase tracking-widest hover:text-terracotta transition-all">Đổi mật khẩu</button>
                </div>
            </div>
        </div>

        <div class="md:col-span-2 space-y-10">
            <div id="profile-view" class="card-retro">
                <h4 class="text-xs font-black uppercase tracking-widest text-terracotta mb-8">Thông tin cá nhân</h4>
                <div class="space-y-6">
                    <div class="border-b border-slate-200 pb-4">
                        <p class="text-[10px] uppercase font-black text-slate-400 mb-1">Email định danh</p>
                        <p class="text-xl font-bold">${user.email}</p>
                    </div>
                    <div class="border-b border-slate-200 pb-4">
                        <p class="text-[10px] uppercase font-black text-slate-400 mb-1">Họ tên khách hàng</p>
                        <p class="text-xl font-bold">${user.fullName}</p>
                    </div>
                    <div class="pb-4">
                        <p class="text-[10px] uppercase font-black text-slate-400 mb-1">Ngày gia nhập</p>
                        <p class="text-lg font-bold text-slate-600">${user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div id="profile-edit" class="card-retro hidden">
                <h4 class="text-xs font-black uppercase tracking-widest text-terracotta mb-8">Chỉnh sửa hồ sơ</h4>
                <form id="update-profile-form" class="space-y-8">
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Họ tên mới</label>
                        <input type="text" id="edit-name" value="${user.fullName}" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold" required>
                    </div>
                    <div class="flex gap-4">
                        <button type="submit" class="btn-retro !shadow-none">Lưu thay đổi</button>
                        <button type="button" id="btn-cancel-edit" class="px-6 py-2 uppercase font-black text-[10px] tracking-widest border-2 border-charcoal hover:bg-slate-100 transition-all">Hủy</button>
                    </div>
                </form>
            </div>

            <div id="password-edit" class="card-retro hidden">
                <h4 class="text-xs font-black uppercase tracking-widest text-terracotta mb-8">Thiết lập mật khẩu mới</h4>
                <form id="change-pass-form" class="space-y-6">
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Mật khẩu hiện tại</label>
                        <input type="password" id="current-pass" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold" required>
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest mb-2">Mật khẩu mới</label>
                        <input type="password" id="new-pass" class="w-full bg-transparent border-b-2 border-charcoal p-2 focus:border-terracotta outline-none font-bold" required>
                    </div>
                    <div class="flex gap-4">
                        <button type="submit" class="btn-retro !shadow-none">Cập nhật mã khóa</button>
                        <button type="button" id="btn-cancel-pass" class="px-6 py-2 uppercase font-black text-[10px] tracking-widest border-2 border-charcoal hover:bg-slate-100 transition-all">Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </section>
  `;
};
