// src/templates/admin/users.js

export const AdminUsersTemplate = () => `
    <div class="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
            <h2 class="text-5xl font-black uppercase leading-none italic text-charcoal">Danh sách <br> <span class="not-italic text-terracotta">Thành viên</span></h2>
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mt-4 italic">Tổng cộng: <span id="admin-user-count" class="text-charcoal border-b border-charcoal">...</span> người dùng</p>
        </div>
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
                <input type="text" id="admin-user-search" placeholder="Tìm email/tên..." class="px-4 py-3 border-2 border-charcoal outline-none font-bold text-sm w-64 shadow-retro-sm">
                <button id="btn-admin-user-search" class="px-6 py-3 bg-charcoal text-cream font-black uppercase text-[10px] tracking-widest hover:bg-terracotta transition-all shadow-retro">Tìm</button>
            </div>
            <button onclick="window.showAddUserModal()" class="px-8 py-3 bg-charcoal text-cream font-black uppercase text-[10px] tracking-widest hover:bg-terracotta transition-all shadow-retro border-2 border-charcoal">Thêm người dùng</button>
        </div>
    </div>

    <div class="card-retro !p-0 overflow-hidden bg-white shadow-retro border-4 border-charcoal">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-charcoal text-cream uppercase text-[10px] font-black tracking-widest">
                        <th class="p-6 border-r border-cream/20">ID</th>
                        <th class="p-6 border-r border-cream/20">Người dùng</th>
                        <th class="p-6 border-r border-cream/20">Email</th>
                        <th class="p-6 border-r border-cream/20">Quyền hạn</th>
                        <th class="p-6 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody id="admin-user-list">
                    <!-- Rendered via JS -->
                </tbody>
            </table>
        </div>
    </div>
    <div id="admin-user-pagination"></div>

    <!-- Add/Edit User Modal -->
    <div id="add-user-modal" class="fixed inset-0 z-[10002] hidden">
        <div class="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-cream border-4 border-charcoal shadow-retro p-10 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-start mb-8">
                <h2 id="user-modal-title" class="text-4xl font-black uppercase italic leading-none">Tạo <br> <span class="not-italic text-terracotta">Người dùng mới</span></h2>
                <button onclick="window.closeAddUserModal()" class="text-4xl font-black hover:text-terracotta transition-colors">&times;</button>
            </div>
            
            <form id="add-user-form" class="space-y-6">
                <input type="hidden" name="id" id="user-id">
                <div class="space-y-2">
                    <label class="text-[10px] uppercase font-black tracking-widest">Họ và tên</label>
                    <input type="text" name="fullName" required class="w-full bg-white border-2 border-charcoal p-3 outline-none focus:bg-slate-50 transition-colors font-bold text-sm">
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] uppercase font-black tracking-widest">Địa chỉ Email</label>
                    <input type="email" name="email" required class="w-full bg-white border-2 border-charcoal p-3 outline-none focus:bg-slate-50 transition-colors font-bold text-sm">
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] uppercase font-black tracking-widest">Mật khẩu (để trống nếu không đổi)</label>
                    <input type="password" name="password" class="w-full bg-white border-2 border-charcoal p-3 outline-none focus:bg-slate-50 transition-colors font-bold text-sm">
                </div>
                <div class="space-y-2">
                    <label class="text-[10px] uppercase font-black tracking-widest">Quyền hạn</label>
                    <select name="role" class="w-full bg-white border-2 border-charcoal p-3 outline-none focus:bg-slate-50 transition-colors font-bold text-sm uppercase">
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                <button type="submit" id="btn-user-submit" class="w-full py-4 bg-charcoal text-cream font-black uppercase text-xs tracking-widest hover:bg-terracotta transition-all shadow-retro">Lưu thay đổi</button>
            </form>
        </div>
    </div>
`;
