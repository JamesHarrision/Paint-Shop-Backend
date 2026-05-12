// src/templates/admin/users.js

export const AdminUsersTemplate = () => `
    <div class="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-8 md:gap-12">
        <div class="text-center md:text-left">
            <h2 class="text-4xl md:text-6xl font-black uppercase tracking-tighter">Quản trị <span class="bg-[#3B82F6] text-white px-2 border-2 border-black">Thành viên</span></h2>
            <p class="text-[10px] md:text-sm font-black uppercase tracking-widest text-gray-500 mt-6 italic border-l-4 border-black pl-4">Hệ thống ghi nhận: <span id="admin-user-count" class="text-black bg-[#C5FF2E] px-2">...</span> tài khoản</p>
        </div>
        <div class="flex flex-col gap-4 md:gap-6 w-full md:w-auto">
            <div class="flex items-center gap-0">
                <input type="text" id="admin-user-search" placeholder="Tên / Email..." class="input-brutal !w-full md:!w-64 !p-3 text-sm">
                <button id="btn-admin-user-search" class="btn-brutal bg-black text-white px-8 !shadow-none !py-3">TÌM</button>
            </div>
            <button onclick="window.showAddUserModal()" class="btn-brutal bg-[#3B82F6] text-white w-full text-xs !py-3">+ THÊM NGƯỜI DÙNG</button>
        </div>
    </div>

    <div class="card-brutal !p-0 overflow-hidden bg-white">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr class="bg-black text-white uppercase text-[10px] md:text-[12px] font-black tracking-widest">
                        <th class="p-4 md:p-6 border-r-2 border-white/20">ID</th>
                        <th class="p-4 md:p-6 border-r-2 border-white/20">Họ và Tên</th>
                        <th class="p-4 md:p-6 border-r-2 border-white/20">Email</th>
                        <th class="p-4 md:p-6 border-r-2 border-white/20">Quyền hạn</th>
                        <th class="p-4 md:p-6 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody id="admin-user-list" class="font-bold text-sm">
                    <!-- Rendered via JS -->
                </tbody>
            </table>
        </div>
    </div>
    <div id="admin-user-pagination" class="mt-12"></div>

    <!-- Modal -->
    <div id="add-user-modal" class="fixed inset-0 z-[10002] hidden">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white border-4 border-black shadow-[8px_8px_0px_#3B82F6] md:shadow-[12px_12px_0px_#3B82F6] p-8 md:p-12 max-h-[90vh] overflow-y-auto animate-fade-in">
            <div class="flex justify-between items-center mb-8 md:mb-10 border-b-4 border-black pb-6">
                <h2 id="user-modal-title" class="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Quản lý <span class="bg-[#C5FF2E] text-black px-2 not-italic">Member</span></h2>
                <button onclick="window.closeAddUserModal()" class="text-4xl md:text-5xl font-black hover:text-[#FF4D4D] transition-colors leading-none">&times;</button>
            </div>
            
            <form id="add-user-form" class="space-y-6 md:space-y-8">
                <input type="hidden" name="id" id="user-id">
                <div class="space-y-2">
                    <label class="text-[10px] uppercase font-black tracking-widest italic">Họ tên đầy đủ</label>
                    <input type="text" name="fullName" required class="input-brutal !p-3">
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] uppercase font-black tracking-widest italic">Địa chỉ Email</label>
                    <input type="email" name="email" required class="input-brutal !p-3">
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] uppercase font-black tracking-widest italic">Thiết lập mật khẩu</label>
                    <input type="password" name="password" class="input-brutal !p-3" placeholder="Bỏ trống nếu không đổi">
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] uppercase font-black tracking-widest italic">Quyền truy cập</label>
                    <select name="role" class="input-brutal !p-3 cursor-pointer uppercase text-sm">
                        <option value="USER">Standard User</option>
                        <option value="ADMIN">System Admin</option>
                    </select>
                </div>

                <button type="submit" id="btn-user-submit" class="btn-brutal bg-[#3B82F6] text-white w-full text-lg md:text-xl mt-8">LƯU THÔNG TIN</button>
            </form>
        </div>
    </div>
`;
