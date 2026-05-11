// src/handlers/profile.handler.js
import { userApi } from '../api.js';
import { state } from '../state.js';
import { navigate } from '../router.js';
import { showToast } from '../ui.js';

export const initProfileHandler = () => {
    const btnShowEdit = document.querySelector('#btn-show-edit');
    const btnShowPass = document.querySelector('#btn-show-pass');
    const btnCancelEdit = document.querySelector('#btn-cancel-edit');
    const btnCancelPass = document.querySelector('#btn-cancel-pass');

    if (btnShowEdit) btnShowEdit.onclick = () => toggleEdit(true);
    if (btnShowPass) btnShowPass.onclick = () => togglePass(true);
    if (btnCancelEdit) btnCancelEdit.onclick = () => toggleEdit(false);
    if (btnCancelPass) btnCancelPass.onclick = () => togglePass(false);

    const updateForm = document.querySelector('#update-profile-form');
    if (updateForm) {
        updateForm.onsubmit = async (e) => {
            e.preventDefault();
            const fullName = document.querySelector('#edit-name').value;
            try {
                const { data } = await userApi.updateMe({ fullName });
                state.setUser({ ...state.user, fullName });
                showToast('✅ Cập nhật thông tin thành công!');
                // Render lại trang profile để thấy tên mới
                window.dispatchEvent(new Event('hashchange'));
            } catch (err) { 
                showToast('❌ Thất bại: ' + (err.response?.data?.message || err.message), 'error'); 
            }
        };
    }

    const passForm = document.querySelector('#change-pass-form');
    if (passForm) {
        passForm.onsubmit = async (e) => {
            e.preventDefault();
            const currentPassword = document.querySelector('#current-pass').value;
            const newPassword = document.querySelector('#new-pass').value;
            try {
                await userApi.changePassword({ currentPassword, newPassword });
                showToast('🔐 Đã cập nhật mã khóa mới!');
                togglePass(false);
                window.dispatchEvent(new Event('hashchange'));
            } catch (err) { 
                showToast('❌ Lỗi: ' + (err.response?.data?.message || err.message), 'error'); 
            }
        };
    }
};

export const toggleEdit = (show) => {
    const editDiv = document.querySelector('#profile-edit');
    const viewDiv = document.querySelector('#profile-view');
    if (editDiv && viewDiv) {
        editDiv.classList.toggle('hidden', !show);
        viewDiv.classList.toggle('hidden', show);
    }
};

export const togglePass = (show) => {
    const editDiv = document.querySelector('#password-edit');
    const viewDiv = document.querySelector('#profile-view');
    if (editDiv && viewDiv) {
        editDiv.classList.toggle('hidden', !show);
        viewDiv.classList.toggle('hidden', show);
    }
};
