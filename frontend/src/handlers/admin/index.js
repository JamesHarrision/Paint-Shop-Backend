// src/handlers/admin/index.js
import { AdminSidebar } from '../../components/AdminSidebar.js';
import { AdminUsersTemplate } from '../../templates/admin/users.js';
import { AdminProductsTemplate } from '../../templates/admin/products.js';
import { AdminOrdersTemplate } from '../../templates/admin/orders.js';
import { AdminCollectionsTemplate } from '../../templates/admin/collections.js';

import { renderAdminUsers } from './users.handler.js';
import { renderAdminProducts, initProductFormHandler } from './products.handler.js';
import { renderAdminOrders } from './orders.handler.js';
import { renderAdminCollections } from './collections.handler.js';

import { state } from '../../state.js';

export const initAdminHandler = (tab = 'users') => {
    const currentUserId = state.user?.id;
    // Lưu trạng thái vào window để các handler khác dùng
    window.adminState = { currentUserId };

    const mainContent = document.querySelector('#admin-main-content');
    if (!mainContent) return;

    // Render sidebar active
    const sidebar = document.querySelector('aside');
    if (sidebar) sidebar.outerHTML = AdminSidebar(tab);

    // Render content
    if (tab === 'users') {
        mainContent.innerHTML = AdminUsersTemplate();
        renderAdminUsers(currentUserId);
    } else if (tab === 'products') {
        mainContent.innerHTML = AdminProductsTemplate();
        renderAdminProducts();
    } else if (tab === 'collections') {
        mainContent.innerHTML = AdminCollectionsTemplate();
        renderAdminCollections();
    } else if (tab === 'orders') {
        mainContent.innerHTML = AdminOrdersTemplate();
        renderAdminOrders();
    }

    window.showAddProductModal = (isEdit = false) => {
        const modal = document.querySelector('#add-product-modal');
        if (modal) {
            modal.classList.remove('hidden');
            if (!isEdit) {
                const form = modal.querySelector('#add-product-form');
                if (form) {
                    form.reset();
                    form.querySelector('#product-id').value = '';
                }
                const title = modal.querySelector('#product-modal-title');
                if (title) title.innerHTML = `Tạo <br> <span class="not-italic text-terracotta">Sản phẩm mới</span>`;
                const btn = modal.querySelector('#btn-product-submit');
                if (btn) btn.innerText = 'Đăng sản phẩm ngay';
            }
            initProductFormHandler();
        }
    };

    window.closeAddProductModal = () => {
        const modal = document.querySelector('#add-product-modal');
        if (modal) modal.classList.add('hidden');
    };

    window.showAddUserModal = (isEdit = false) => {
        const modal = document.querySelector('#add-user-modal');
        if (modal) {
            modal.classList.remove('hidden');
            if (!isEdit) {
                const form = modal.querySelector('#add-user-form');
                if (form) {
                    form.reset();
                    form.querySelector('#user-id').value = '';
                }
                const title = modal.querySelector('#user-modal-title');
                if (title) title.innerHTML = `Tạo <br> <span class="not-italic text-terracotta">Người dùng mới</span>`;
                const btn = modal.querySelector('#btn-user-submit');
                if (btn) btn.innerText = 'Lưu thay đổi';
            }
            // require users.handler.js to export initUserFormHandler
            import('./users.handler.js').then(m => m.initUserFormHandler());
        }
    };

    window.closeAddUserModal = () => {
        const modal = document.querySelector('#add-user-modal');
        if (modal) modal.classList.add('hidden');
    };

    window.changeAdminUserPage = (page) => renderAdminUsers(currentUserId, page);
    window.changeAdminProductPage = (page) => renderAdminProducts(page);
    window.changeAdminOrderPage = (page) => renderAdminOrders(page);
};
