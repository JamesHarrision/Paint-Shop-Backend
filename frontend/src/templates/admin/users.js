// src/templates/admin/users.js

export const AdminUsersTemplate = () => `
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 pb-8 border-b-4 border-black">
        <div>
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-1">Quản trị hệ thống</p>
            <h2 class="text-5xl font-black uppercase tracking-tighter leading-none">
                Thành <span class="italic text-[#E2725B]">viên</span>
            </h2>
            <p class="text-sm font-bold text-black/40 mt-2">
                Tổng <span id="admin-user-count" class="font-black text-black bg-[#E2725B] text-white px-1.5">...</span> tài khoản
            </p>
        </div>
        <div class="flex flex-col gap-2 w-full md:w-auto min-w-[260px]">
            <div class="flex">
                <input type="text" id="admin-user-search" placeholder="Tên hoặc Email..."
                    class="search-input flex-1">
                <button id="btn-admin-user-search"
                    class="bg-black text-white px-5 font-black uppercase text-[10px] tracking-widest border-3 border-black hover:bg-[#E2725B] transition-colors shrink-0">
                    TÌM
                </button>
            </div>
            <button onclick="window.showAddUserModal()"
                class="btn-brutal bg-[#E2725B] text-white text-[11px] w-full">
                + THÊM NGƯỜI DÙNG
            </button>
        </div>
    </div>

    <!-- Table -->
    <div class="bg-white border-4 border-black shadow-[6px_6px_0px_#000] overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[700px]">
            <thead>
                <tr class="bg-black text-white uppercase text-[10px] font-black tracking-widest">
                    <th class="px-5 py-4 border-r border-white/10 w-14">ID</th>
                    <th class="px-5 py-4 border-r border-white/10">Họ và Tên</th>
                    <th class="px-5 py-4 border-r border-white/10">Email</th>
                    <th class="px-5 py-4 border-r border-white/10 text-center w-24">Quyền</th>
                    <th class="px-5 py-4 text-center w-32">Hành động</th>
                </tr>
            </thead>
            <tbody id="admin-user-list" class="divide-y-2 divide-black/10 text-sm font-medium">
                <!-- Rendered via JS -->
            </tbody>
        </table>
    </div>
    <div id="admin-user-pagination" class="mt-6"></div>

    <!-- Modal -->
    <div id="add-user-modal" class="fixed inset-0 z-[10002] hidden">
        <div class="absolute inset-0 bg-black/60" onclick="window.closeAddUserModal()"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#F9F7F2] border-4 border-black shadow-[8px_8px_0px_#000] max-h-[90vh] overflow-y-auto">
            
            <!-- Modal Header -->
            <div class="flex justify-between items-start p-8 pb-0">
                <h2 id="user-modal-title" class="text-3xl font-black uppercase tracking-tight leading-none">
                    TẠO <span class="italic text-[#E2725B] normal-case">Thành viên</span>
                </h2>
                <button onclick="window.closeAddUserModal()"
                    class="w-9 h-9 border-2 border-black flex items-center justify-center font-black text-xl hover:bg-black hover:text-white transition-colors shrink-0 leading-none">
                    ×
                </button>
            </div>

            <!-- Form -->
            <form id="add-user-form" class="p-8 space-y-7">
                <input type="hidden" name="id" id="user-id">

                <div>
                    <label class="form-label">Họ tên đầy đủ</label>
                    <input type="text" name="fullName" required class="input-brutal">
                </div>
                <div>
                    <label class="form-label">Địa chỉ Email</label>
                    <input type="email" name="email" required class="input-brutal">
                </div>
                <div>
                    <label class="form-label">Mật khẩu <span class="font-normal normal-case text-black/40">(bỏ trống nếu không đổi)</span></label>
                    <input type="password" name="password" class="input-brutal" placeholder="••••••••">
                </div>
                <div>
                    <label class="form-label">Quyền truy cập</label>
                    <select name="role" class="input-brutal cursor-pointer">
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                <button type="submit" id="btn-user-submit"
                    class="btn-brutal w-full bg-[#E2725B] text-white uppercase tracking-widest mt-2">
                    LƯU THAY ĐỔI
                </button>
            </form>
        </div>
    </div>
`;
