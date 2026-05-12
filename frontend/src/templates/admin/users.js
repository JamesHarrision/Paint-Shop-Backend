// src/templates/admin/users.js

export const AdminUsersTemplate = () => `
    <div class="flex flex-col md:flex-row justify-between items-center mb-16 gap-12">
        <div>
            <h2 class="text-6xl font-black uppercase tracking-tighter">Quản trị <span class="bg-[#C5FF2E] px-2 border-2 border-black">Thành viên</span></h2>
            <p class="text-sm font-black uppercase tracking-widest text-gray-500 mt-6 italic border-l-4 border-black pl-4">Hệ thống ghi nhận: <span id="admin-user-count" class="text-black bg-[#3B82F6] text-white px-2">...</span> tài khoản</p>
        </div>
        <div class="flex flex-col gap-6 w-full md:w-auto">
            <div class="flex items-center gap-0">
                <input type="text" id="admin-user-search" placeholder="Tên / Email..." class="input-brutal !w-64">
                <button id="btn-admin-user-search" class="btn-brutal bg-black text-white px-8 !shadow-none">TÌM</button>
            </div>
            <button onclick="window.showAddUserModal()" class="btn-brutal bg-[#C5FF2E] w-full">+ THÊM NGƯỜI DÙNG</button>
        </div>
    </div>

    <div class="card-brutal !p-0 overflow-hidden bg-white">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-black text-white uppercase text-[12px] font-black tracking-widest">
                        <th class="p-6 border-r-2 border-white/20">ID</th>
                        <th class="p-6 border-r-2 border-white/20">Họ và Tên</th>
                        <th class="p-6 border-r-2 border-white/20">Email</th>
                        <th class="p-6 border-r-2 border-white/20">Quyền hạn</th>
                        <th class="p-6 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody id="admin-user-list" class="font-bold">
                    <!-- Rendered via JS -->
                </tbody>
            </table>
        </div>
    </div>
    <div id="admin-user-pagination" class="mt-12"></div>

    <!-- Modal -->
    <div id="add-user-modal" class="fixed inset-0 z-[10002] hidden">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white border-4 border-black shadow-[12px_12px_0px_#C5FF2E] p-12 max-h-[90vh] overflow-y-auto animate-fade-in">
            <div class="flex justify-between items-center mb-10 border-b-4 border-black pb-6">
                <h2 id="user-modal-title" class="text-4xl font-black uppercase tracking-tighter italic">Quản lý <span class="bg-[#3B82F6] text-white px-2 not-italic">Member</span></h2>
                <button onclick="window.closeAddUserModal()" class="text-5xl font-black hover:text-[#FF4D4D] transition-colors leading-none">&times;</button>
            </div>
            
            <form id="add-user-form" class="space-y-8">
                <input type="hidden" name="id" id="user-id">
                <div class="space-y-2">
                    <label class="text-xs uppercase font-black tracking-widest italic">Họ và tên đầy đủ</label>
                    <input type="text" name="fullName" required class="input-brutal">
                </div>
                <div class="space-y-2">
                    <label class="text-xs uppercase font-black tracking-widest italic">Địa chỉ Email</label>
                    <input type="email" name="email" required class="input-brutal">
                </div>
                <div class="space-y-2">
                    <label class="text-xs uppercase font-black tracking-widest italic">Thiết lập mật khẩu</label>
                    <input type="password" name="password" class="input-brutal" placeholder="Bỏ trống nếu không đổi">
                </div>
                <div class="space-y-2">
                    <label class="text-xs uppercase font-black tracking-widest italic">Quyền truy cập</label>
                    <select name="role" class="input-brutal cursor-pointer uppercase">
                        <option value="USER">Standard User</option>
                        <option value="ADMIN">System Admin</option>
                    </select>
                </div>

                <button type="submit" id="btn-user-submit" class="btn-brutal bg-[#C5FF2E] w-full text-xl mt-8">LƯU THÔNG TIN</button>
            </form>
        </div>
    </div>
`;
