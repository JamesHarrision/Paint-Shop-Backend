// src/handlers/admin/index.js
import { AdminSidebar } from '../../components/AdminSidebar.js';
import { AdminUsersTemplate } from '../../templates/admin/users.js';
import { AdminProductsTemplate } from '../../templates/admin/products.js';
import { AdminOrdersTemplate } from '../../templates/admin/orders.js';
import { renderAdminUsers } from './users.handler.js';
import { renderAdminProducts, initProductFormHandler } from './products.handler.js';
import { renderAdminOrders } from './orders.handler.js';

let currentTab = 'users';

export const initAdminHandler = (currentUserId) => {
    // Lưu trạng thái vào window để các handler khác dùng
    window.adminState = { currentUserId };

    window.switchAdminTab = (tab) => {
        currentTab = tab;
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
        } else if (tab === 'orders') {
            mainContent.innerHTML = AdminOrdersTemplate();
            renderAdminOrders();
        }
    };

    window.showAddProductModal = () => {
        const modal = document.querySelector('#add-product-modal');
        if (modal) {
            modal.classList.remove('hidden');
            initProductFormHandler();
        }
    };

    window.closeAddProductModal = () => {
        const modal = document.querySelector('#add-product-modal');
        if (modal) modal.classList.add('hidden');
    };

    window.changeAdminUserPage = (page) => renderAdminUsers(currentUserId, page);
    window.changeAdminProductPage = (page) => renderAdminProducts(page);
    window.changeAdminOrderPage = (page) => renderAdminOrders(page);

    // Mặc định tab đầu tiên
    renderAdminUsers(currentUserId);
};
