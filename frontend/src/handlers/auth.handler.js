// src/handlers/auth.handler.js
import { authApi } from '../api.js';
import { state } from '../state.js';
import { navigate } from '../router.js';
import { showToast } from '../ui.js';

export const initLoginHandler = () => {
    const form = document.querySelector('#login-form');
    if (!form) return;
    form.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.querySelector('#login-email').value;
        const password = document.querySelector('#login-password').value;
        try {
            window.toggleLoader(true);
            const { data } = await authApi.login({ email, password });
            state.setUser(data.data.user);
            showToast('✅ Đăng nhập thành công!');
            navigate('home');
        } catch (err) {
            showToast('❌ Lỗi truy cập: ' + (err.response?.data?.message || err.message), 'error');
        } finally {
            window.toggleLoader(false);
        }
    };
};

export const initRegisterHandler = () => {
    const form = document.querySelector('#register-form');
    if (!form) return;
    form.onsubmit = async (e) => {
        e.preventDefault();
        const fullName = document.querySelector('#reg-name').value;
        const email = document.querySelector('#reg-email').value;
        const password = document.querySelector('#reg-password').value;
        try {
            window.toggleLoader(true);
            await authApi.register({ fullName, email, password });
            showToast('🎉 Chào mừng thành viên mới! Hãy đăng nhập nhé.');
            navigate('login');
        } catch (err) {
            showToast('❌ Đăng ký thất bại: ' + (err.response?.data?.message || err.message), 'error');
        } finally {
            window.toggleLoader(false);
        }
    };
};

export const initForgotPasswordHandler = () => {
    const form = document.querySelector('#forgot-form');
    if (!form) return;
    form.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.querySelector('#forgot-email').value;
        try {
            window.toggleLoader(true); // Hiện xoay xoay
            await authApi.forgotPassword(email);
            showToast('📨 Yêu cầu thành công! Vui lòng kiểm tra hộp thư.');
            navigate('login');
        } catch (err) {
            showToast('❌ Lỗi: ' + (err.response?.data?.message || err.message), 'error');
        } finally {
            window.toggleLoader(false); // Tắt xoay xoay
        }
    };
};

export const initResetPasswordHandler = () => {
    const form = document.querySelector('#reset-form');
    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();

        // Lấy token từ URL hash (#/reset-password?token=...)
        const hash = window.location.hash;
        const queryString = hash.split('?')[1];
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('token');

        if (!token) {
            showToast('❌ Thiếu Token! Vui lòng sử dụng link trong email.', 'error');
            return;
        }

        const newPassword = document.querySelector('#reset-password').value;
        const confirmPassword = document.querySelector('#reset-confirm').value;

        if (newPassword !== confirmPassword) {
            showToast('❌ Mật khẩu xác nhận không khớp!', 'error');
            return;
        }

        try {
            window.toggleLoader(true);
            await authApi.resetPassword({ token, newPassword });
            showToast('✅ Đổi mật khẩu thành công! Hãy đăng nhập lại.');
            navigate('login');
        } catch (err) {
            showToast('❌ Lỗi: ' + (err.response?.data?.message || err.message), 'error');
        } finally {
            window.toggleLoader(false);
        }
    };
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    state.setUser(null);
    navigate('home');
};
