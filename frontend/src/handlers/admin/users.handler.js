// src/handlers/admin/users.handler.js
import { userApi } from '../../api.js';
import { Pagination } from '../../components/Pagination.js';
import { showToast } from '../../ui.js';

let userSearch = '';

export const renderAdminUsers = async (currentUserId, page = 1) => {
    const list = document.querySelector('#admin-user-list');
    const paginationContainer = document.querySelector('#admin-user-pagination');
    const searchBtn = document.querySelector('#btn-admin-user-search');
    const searchInput = document.querySelector('#admin-user-search');

    if (!list) return;

    if (searchBtn && !searchBtn.onclick) {
        searchBtn.onclick = () => {
            userSearch = searchInput.value;
            renderAdminUsers(currentUserId, 1);
        };
        searchInput.onkeypress = (e) => { if (e.key === 'Enter') searchBtn.click(); };
    }

    try {
        const { data } = await userApi.getAll({ page, limit: 10, search: userSearch });
        const users = data.data;
        const countEl = document.querySelector('#admin-user-count');
        if (countEl) countEl.innerText = data.pagination.total;

        list.innerHTML = users.map(u => `
            <tr class="border-b border-slate-200 hover:bg-slate-50 transition-all font-bold text-sm">
                <td class="p-6 text-slate-400 font-black">#${u.id}</td>
                <td class="p-6 text-charcoal">${u.fullName}</td>
                <td class="p-6 text-slate-500 font-normal">${u.email}</td>
                <td class="p-6">
                    <span class="px-3 py-1 text-[10px] border-2 border-charcoal ${u.role === 'ADMIN' ? 'bg-charcoal text-cream' : 'text-charcoal'}">${u.role}</span>
                </td>
                <td class="p-6 text-center">
                    <div class="flex justify-center gap-4">
                        ${u.id !== currentUserId ? `
                            <button onclick="window.editUser(${u.id}, '${u.email}', '${u.fullName}', '${u.role}')" class="text-charcoal hover:text-terracotta transition-colors" title="Chỉnh sửa">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button onclick="window.deleteUser(${u.id})" class="text-terracotta hover:scale-125 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        ` : '<span class="text-[10px] text-slate-300 italic">Bản thân</span>'}
                    </div>
                </td>
            </tr>
        `).join('');

        if (paginationContainer) {
            paginationContainer.innerHTML = Pagination(data.pagination, 'changeAdminUserPage');
        }
    } catch (err) { 
        list.innerHTML = '<tr><td colspan="5" class="p-10 text-center text-red-500 font-bold italic">Lỗi nạp danh sách</td></tr>'; 
    }
};

export const initUserFormHandler = () => {
    const form = document.querySelector('#add-user-form');
    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const id = formData.get('id');
        const data = Object.fromEntries(formData.entries());
        if (!data.password) {
            delete data.password;
        }

        try {
            window.toggleLoader(true);
            if (id) {
                await userApi.update(id, data);
                showToast('✅ Cập nhật người dùng thành công!');
            } else {
                await userApi.create(data);
                showToast('✅ Thêm người dùng thành công!');
            }
            window.closeAddUserModal();
            renderAdminUsers(window.adminState?.currentUserId);
        } catch (err) {
            showToast('❌ Lỗi: ' + (err.response?.data?.message || err.message), 'error');
        } finally {
            window.toggleLoader(false);
        }
    };
};

window.editUser = (id, email, fullName, role) => {
    const form = document.querySelector('#add-user-form');
    if (!form) return;
    
    form.reset();
    form.querySelector('#user-id').value = id;
    form.querySelector('input[name="fullName"]').value = fullName;
    form.querySelector('input[name="email"]').value = email;
    form.querySelector('select[name="role"]').value = role;

    document.querySelector('#user-modal-title').innerHTML = `Sửa <br> <span class="not-italic text-terracotta">Người dùng #${id}</span>`;
    document.querySelector('#btn-user-submit').innerText = 'Cập nhật người dùng';

    window.showAddUserModal(true);
};

window.deleteUser = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn loại bỏ người dùng này khỏi hệ thống?')) return;
    try {
        await userApi.delete(id);
        showToast('🗑️ Đã loại bỏ thành công.');
        renderAdminUsers(window.adminState.currentUserId);
    } catch (err) { showToast('❌ Thất bại: ' + err.message, 'error'); }
};
