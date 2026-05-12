// src/templates/profile.js
export const ProfileTemplate = (user) => {
  if (!user) return `
    <section class="py-24 text-center">
        <div class="loader-box mx-auto mb-6"></div>
        <p class="font-black uppercase text-xs tracking-widest">Đang nạp hồ sơ...</p>
    </section>
  `;

  return `
  <section class="py-24 container mx-auto px-6 max-w-5xl">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div class="md:col-span-4">
            <div class="card-brutal text-center bg-black text-white !p-12">
                <div class="w-32 h-32 bg-[#C5FF2E] border-4 border-white mx-auto mb-8 shadow-[8px_8px_0px_rgba(255,255,255,0.2)] flex items-center justify-center text-5xl font-black uppercase text-black">
                    ${user.fullName?.charAt(0) || '?'}
                </div>
                <h3 class="text-3xl font-black uppercase mb-2 tracking-tighter">${user.fullName || 'Người dùng'}</h3>
                <span class="bg-[#3B82F6] px-2 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-white">${user.role}</span>
                
                <div class="mt-12 pt-12 border-t-4 border-white/20 flex flex-col gap-6">
                    <button id="btn-show-edit" class="text-xs font-black uppercase tracking-widest hover:text-[#C5FF2E] transition-all border-2 border-white/40 p-2 hover:border-[#C5FF2E]">Sửa thông tin</button>
                    <button id="btn-show-pass" class="text-xs font-black uppercase tracking-widest hover:text-[#C5FF2E] transition-all border-2 border-white/40 p-2 hover:border-[#C5FF2E]">Đổi mật khẩu</button>
                </div>
            </div>
        </div>

        <div class="md:col-span-8 space-y-12">
            <div id="profile-view" class="card-brutal bg-white p-12">
                <h4 class="text-4xl font-black uppercase tracking-tighter mb-12 border-b-8 border-[#C5FF2E] inline-block">Hồ sơ cá nhân</h4>
                <div class="space-y-8">
                    <div class="border-b-4 border-black pb-4">
                        <p class="text-[10px] uppercase font-black text-gray-400 mb-2 italic">Email định danh</p>
                        <p class="text-2xl font-black">${user.email}</p>
                    </div>
                    <div class="border-b-4 border-black pb-4">
                        <p class="text-[10px] uppercase font-black text-gray-400 mb-2 italic">Họ tên khách hàng</p>
                        <p class="text-2xl font-black">${user.fullName}</p>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase font-black text-gray-400 mb-2 italic">Ngày gia nhập hệ thống</p>
                        <p class="text-xl font-black text-gray-600">${user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div id="profile-edit" class="card-brutal hidden bg-white p-12">
                <h4 class="text-4xl font-black uppercase tracking-tighter mb-12 border-b-8 border-[#3B82F6] inline-block text-black">Chỉnh sửa hồ sơ</h4>
                <form id="update-profile-form" class="space-y-8">
                    <div>
                        <label class="block text-xs font-black uppercase tracking-widest mb-4 italic">Họ tên mới của bạn</label>
                        <input type="text" id="edit-name" value="${user.fullName}" class="input-brutal text-xl" required>
                    </div>
                    <div class="flex gap-6">
                        <button type="submit" class="btn-brutal bg-[#C5FF2E] px-10">Lưu thay đổi</button>
                        <button type="button" id="btn-cancel-edit" class="btn-brutal bg-white px-10">Hủy</button>
                    </div>
                </form>
            </div>

            <div id="password-edit" class="card-brutal hidden bg-white p-12">
                <h4 class="text-4xl font-black uppercase tracking-tighter mb-12 border-b-8 border-[#FF4D4D] inline-block">Thiết lập mật khẩu</h4>
                <form id="change-pass-form" class="space-y-8">
                    <div>
                        <label class="block text-xs font-black uppercase tracking-widest mb-4 italic">Mật khẩu hiện tại</label>
                        <input type="password" id="current-pass" class="input-brutal" required>
                    </div>
                    <div>
                        <label class="block text-xs font-black uppercase tracking-widest mb-4 italic">Mật khẩu mới</label>
                        <input type="password" id="new-pass" class="input-brutal" required>
                    </div>
                    <div class="flex gap-6">
                        <button type="submit" class="btn-brutal bg-[#C5FF2E] px-10">Cập nhật mã khóa</button>
                        <button type="button" id="btn-cancel-pass" class="btn-brutal bg-white px-10">Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </section>
  `;
};
