// src/templates/admin/users.js

export const AdminUsersTemplate = () => `
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 pb-8 border-b-4 border-black">
        <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-2">Quản trị hệ thống</p>
            <h2 class="text-5xl font-black uppercase tracking-tighter leading-none">Thành viên</h2>
            <p class="text-sm font-bold text-black/50 mt-3">
                Tổng: <span id="admin-user-count" class="text-black font-black bg-[#E2725B] text-white px-2 py-0.5">...</span> tài khoản
            </p>
        </div>
        <div class="flex flex-col gap-3 w-full md:w-auto min-w-[280px]">
            <div class="flex w-full">
                <input type="text" id="admin-user-search" placeholder="Tên hoặc Email..."
                    class="admin-input flex-1 text-sm">
                <button id="btn-admin-user-search"
                    class="bg-black text-white px-6 font-black uppercase text-[11px] tracking-widest border-4 border-l-0 border-black hover:bg-[#E2725B] transition-colors">
                    TÌM
                </button>
            </div>
            <button onclick="window.showAddUserModal()"
                class="w-full bg-[#E2725B] text-white border-4 border-black px-6 py-3 font-black uppercase text-[11px] tracking-widest shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all">
                + THÊM NGƯỜI DÙNG
            </button>
        </div>
    </div>

    <!-- Table -->
    <div class="bg-white border-4 border-black shadow-[6px_6px_0px_#000] overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[700px]">
            <thead>
                <tr class="bg-black text-white uppercase text-[11px] font-black tracking-widest">
                    <th class="px-6 py-4 border-r-2 border-white/10 w-16">ID</th>
                    <th class="px-6 py-4 border-r-2 border-white/10">Họ và Tên</th>
                    <th class="px-6 py-4 border-r-2 border-white/10">Email</th>
                    <th class="px-6 py-4 border-r-2 border-white/10 text-center w-28">Quyền</th>
                    <th class="px-6 py-4 text-center w-36">Hành động</th>
                </tr>
            </thead>
            <tbody id="admin-user-list" class="divide-y-4 divide-black text-sm font-bold">
                <!-- Rendered via JS -->
            </tbody>
        </table>
    </div>
    <div id="admin-user-pagination" class="mt-8"></div>

    <!-- Modal -->
    <div id="add-user-modal" class="fixed inset-0 z-[10002] hidden">
        <div class="absolute inset-0 bg-black/70" onclick="window.closeAddUserModal()"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white border-4 border-black shadow-[12px_12px_0px_#000] max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center px-8 py-6 border-b-4 border-black bg-black text-white">
                <h2 id="user-modal-title" class="text-2xl font-black uppercase tracking-tighter">Quản lý thành viên</h2>
                <button onclick="window.closeAddUserModal()" class="text-4xl font-black leading-none hover:text-[#E2725B] transition-colors">&times;</button>
            </div>
            <form id="add-user-form" class="p-8 space-y-6">
                <input type="hidden" name="id" id="user-id">
                <div class="space-y-2">
                    <label class="admin-label">Họ tên đầy đủ</label>
                    <input type="text" name="fullName" required class="admin-input">
                </div>
                <div class="space-y-2">
                    <label class="admin-label">Địa chỉ Email</label>
                    <input type="email" name="email" required class="admin-input">
                </div>
                <div class="space-y-2">
                    <label class="admin-label">Mật khẩu <span class="font-normal text-black/40 normal-case">(bỏ trống nếu không đổi)</span></label>
                    <input type="password" name="password" class="admin-input" placeholder="••••••••">
                </div>
                <div class="space-y-2">
                    <label class="admin-label">Quyền truy cập</label>
                    <select name="role" class="admin-input cursor-pointer">
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit" id="btn-user-submit"
                    class="w-full bg-[#E2725B] text-white border-4 border-black px-6 py-4 font-black uppercase text-base tracking-widest shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all mt-4">
                    LƯU THÔNG TIN
                </button>
            </form>
        </div>
    </div>
`;
