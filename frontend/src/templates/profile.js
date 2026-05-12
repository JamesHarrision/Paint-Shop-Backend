// src/templates/profile.js
export const ProfileTemplate = (user) => {
  if (!user) return `
    <section class="py-24 text-center">
        <div class="loader-box mx-auto mb-6"></div>
        <p class="font-black uppercase text-[10px] tracking-widest">Đang nạp hồ sơ...</p>
    </section>
  `;

  return `
  <section class="py-12 md:py-24 container mx-auto px-6 max-w-5xl">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div class="md:col-span-4">
            <div class="card-brutal text-center bg-black text-white !p-8 md:!p-12">
                <div class="w-24 h-24 md:w-32 md:h-32 bg-[#E2725B] border-4 border-white mx-auto mb-8 shadow-[8px_8px_0px_rgba(255,255,255,0.2)] flex items-center justify-center text-4xl md:text-5xl font-black uppercase text-white">
                    ${user.fullName?.charAt(0) || '?'}
                </div>
                <h3 class="text-2xl md:text-3xl font-black uppercase mb-2 tracking-tighter">${user.fullName || 'Người dùng'}</h3>
                <span class="bg-[#20B2AA] px-2 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-white inline-block mt-2">${user.role}</span>
                
                <div class="mt-10 md:mt-12 pt-10 md:pt-12 border-t-4 border-white/20 flex flex-col gap-4 md:gap-6">
                    <button id="btn-show-edit" class="text-[10px] font-black uppercase tracking-widest hover:text-[#E2725B] transition-all border-2 border-white/40 p-3 hover:border-[#E2725B]">Sửa thông tin</button>
                    <button id="btn-show-pass" class="text-[10px] font-black uppercase tracking-widest hover:text-[#E2725B] transition-all border-2 border-white/40 p-3 hover:border-[#E2725B]">Đổi mật khẩu</button>
                </div>
            </div>
        </div>

        <div class="md:col-span-8 space-y-10 md:space-y-12">
            <div id="profile-view" class="card-brutal bg-white p-8 md:p-12">
                <h4 class="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-10 md:mb-12 border-b-8 border-[#E2725B] inline-block">Hồ sơ cá nhân</h4>
                <div class="space-y-6 md:space-y-8">
                    <div class="border-b-4 border-black pb-4">
                        <p class="text-[10px] uppercase font-black text-gray-400 mb-2 italic">Email định danh</p>
                        <p class="text-xl md:text-2xl font-black">${user.email}</p>
                    </div>
                    <div class="border-b-4 border-black pb-4">
                        <p class="text-[10px] uppercase font-black text-gray-400 mb-2 italic">Họ tên khách hàng</p>
                        <p class="text-xl md:text-2xl font-black">${user.fullName}</p>
                    </div>
                    <div>
                        <p class="text-[10px] uppercase font-black text-gray-400 mb-2 italic">Ngày gia nhập hệ thống</p>
                        <p class="text-lg md:text-xl font-black text-gray-600">${user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div id="profile-edit" class="card-brutal hidden bg-white p-8 md:p-12">
                <h4 class="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-10 md:mb-12 border-b-8 border-[#20B2AA] inline-block text-black">Chỉnh sửa hồ sơ</h4>
                <form id="update-profile-form" class="space-y-8">
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest mb-4 italic">Họ tên mới của bạn</label>
                        <input type="text" id="edit-name" value="${user.fullName}" class="input-brutal text-lg md:text-xl !p-3" required>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-4 md:gap-6">
                        <button type="submit" class="btn-brutal bg-[#E2725B] px-10">Lưu thay đổi</button>
                        <button type="button" id="btn-cancel-edit" class="btn-brutal bg-white text-black px-10">Hủy</button>
                    </div>
                </form>
            </div>

            <div id="password-edit" class="card-brutal hidden bg-white p-8 md:p-12">
                <h4 class="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-10 md:mb-12 border-b-8 border-[#FF4D4D] inline-block">Thiết lập mật khẩu</h4>
                <form id="change-pass-form" class="space-y-6 md:space-y-8">
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest mb-4 italic">Mật khẩu hiện tại</label>
                        <input type="password" id="current-pass" class="input-brutal !p-3" required>
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest mb-4 italic">Mật khẩu mới</label>
                        <input type="password" id="new-pass" class="input-brutal !p-3" required>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-4 md:gap-6">
                        <button type="submit" class="btn-brutal bg-[#E2725B] px-10">Cập nhật mã khóa</button>
                        <button type="button" id="btn-cancel-pass" class="btn-brutal bg-white text-black px-10">Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </section>
  `;
};
