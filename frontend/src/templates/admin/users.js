// src/templates/admin/users.js

export const AdminUsersTemplate = () => `
    <div class="flex justify-between items-end mb-12">
        <div>
            <h2 class="text-5xl font-black uppercase leading-none italic text-charcoal">Danh sách <br> <span class="not-italic text-terracotta">Thành viên</span></h2>
            <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mt-4 italic">Tổng cộng: <span id="admin-user-count" class="text-charcoal border-b border-charcoal">...</span> người dùng</p>
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
`;
