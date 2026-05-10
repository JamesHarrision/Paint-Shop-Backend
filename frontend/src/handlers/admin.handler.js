import { userApi, productApi, collectionApi, orderApi } from '../api.js';
import { AdminTemplate, AdminUsersTemplate, AdminProductsTemplate, AdminSidebar, AdminOrdersTemplate } from '../templates/admin.js';
import { PaginationTemplate } from '../templates/common.js';
import { showToast } from '../ui.js';

let currentTab = 'users';

export const initAdminHandler = (currentUserId) => {
    // Đăng ký các hàm toàn cục cho Template gọi
    window.switchAdminTab = (tab) => {
        currentTab = tab;
        const mainContent = document.querySelector('#admin-main-content');
        if (!mainContent) return;

        // Render lại sidebar để cập nhật trạng thái active
        const adminSection = document.querySelector('section.min-h-screen');
        if (adminSection) {
            const sidebar = adminSection.querySelector('aside');
            if (sidebar) {
                sidebar.outerHTML = AdminSidebar(tab);
            }
        }

        // Render nội dung tab mới
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

    window.changeAdminUserPage = (page) => {
        renderAdminUsers(currentUserId, page);
    };

    window.changeAdminProductPage = (page) => {
        renderAdminProducts(page);
    };

    window.changeAdminOrderPage = (page) => {
        renderAdminOrders(page);
    };

    // Khởi tạo tab đầu tiên
    renderAdminUsers(currentUserId);
};

export const renderAdminUsers = async (currentUserId, page = 1) => {
    const list = document.querySelector('#admin-user-list');
    const paginationContainer = document.querySelector('#admin-user-pagination');
    if (!list) return;
    try {
        const { data } = await userApi.getAll({ page, limit: 10 });
        const users = data.data;
        const countEl = document.querySelector('#admin-user-count');
        if (countEl) countEl.innerText = data.pagination.total;

        list.innerHTML = users.map(u => `
            <tr class="border-b border-slate-200 hover:bg-slate-50 transition-all font-bold text-sm">
                <td class="p-6 text-slate-400 font-black">#${u.id}</td>
                <td class="p-6">${u.fullName}</td>
                <td class="p-6">${u.email}</td>
                <td class="p-6">
                    <span class="px-3 py-1 text-[10px] border-2 border-charcoal ${u.role === 'ADMIN' ? 'bg-charcoal text-cream' : ''}">${u.role}</span>
                </td>
                <td class="p-6 text-center">
                    ${u.id !== currentUserId ? `
                        <button onclick="window.deleteUser(${u.id})" class="text-red-500 hover:scale-125 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    ` : '<span class="text-[10px] text-slate-300 italic">Bản thân</span>'}
                </td>
            </tr>
        `).join('');

        if (paginationContainer) {
            paginationContainer.innerHTML = PaginationTemplate(data.pagination, 'changeAdminUserPage');
        }
    } catch (err) { 
        list.innerHTML = '<tr><td colspan="5" class="p-10 text-center text-red-500 font-bold italic">Lỗi nạp danh sách</td></tr>'; 
    }
};

export const renderAdminProducts = async (page = 1) => {
    const list = document.querySelector('#admin-product-list');
    const paginationContainer = document.querySelector('#admin-product-pagination');
    if (!list) return;
    try {
        const { data } = await productApi.getAll({ page, limit: 10 });
        const products = data.data;
        const countEl = document.querySelector('#admin-product-count');
        if (countEl) countEl.innerText = data.pagination.total;

        list.innerHTML = products.map(p => `
            <tr class="border-b border-slate-200 hover:bg-slate-50 transition-all font-bold text-sm">
                <td class="p-6">
                    <img src="${p.imageUrl || 'https://via.placeholder.com/100'}" class="w-12 h-12 object-cover border-2 border-charcoal shadow-retro-sm">
                </td>
                <td class="p-6">${p.name}</td>
                <td class="p-6">${new Intl.NumberFormat('vi-VN').format(p.price)}đ</td>
                <td class="p-6">
                    <span class="${p.stock < 10 ? 'text-terracotta' : ''}">${p.stock}</span>
                </td>
                <td class="p-6 text-center">
                    <div class="w-6 h-6 rounded-full border-2 border-charcoal mx-auto" style="background-color: ${p.colorCode || '#ccc'}"></div>
                </td>
                <td class="p-6 text-center">
                    <div class="flex justify-center gap-4">
                        <button class="text-charcoal hover:text-terracotta transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button onclick="window.deleteProduct(${p.id})" class="text-red-500 hover:scale-125 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        if (paginationContainer) {
            paginationContainer.innerHTML = PaginationTemplate(data.pagination, 'changeAdminProductPage');
        }
    } catch (err) {
        list.innerHTML = '<tr><td colspan="6" class="p-10 text-center text-red-500 font-bold italic">Lỗi nạp sản phẩm</td></tr>';
    }
};

export const renderAdminOrders = async (page = 1) => {
    const list = document.querySelector('#admin-order-list');
    const paginationContainer = document.querySelector('#admin-order-pagination');
    if (!list) return;
    try {
        const { data } = await orderApi.getAll({ page, limit: 10 });
        const orders = data.data;
        const countEl = document.querySelector('#admin-order-count');
        if (countEl) countEl.innerText = data.pagination.total;

        list.innerHTML = orders.map(o => `
            <tr class="border-b border-slate-200 hover:bg-slate-50 transition-all font-bold text-sm">
                <td class="p-6 text-slate-400 font-black">#${o.id}</td>
                <td class="p-6">
                    <p class="font-black truncate w-32" title="${o.user.fullName}">${o.user.fullName}</p>
                    <p class="text-[10px] text-slate-400 font-normal">${o.user.email}</p>
                </td>
                <td class="p-6">${new Intl.NumberFormat('vi-VN').format(o.totalAmount)}đ</td>
                <td class="p-6">
                    <span class="px-3 py-1 text-[10px] border-2 border-charcoal ${o.paymentStatus === 'PAID' ? 'bg-teal text-white border-teal' : ''}">
                        ${o.paymentStatus === 'PAID' ? 'ĐÃ TRẢ' : 'CHỜ'}
                    </span>
                </td>
                <td class="p-6 text-center">
                    <select onchange="window.updateOrderStatus(${o.id}, this.value)" class="bg-white border-2 border-charcoal text-[10px] font-black uppercase px-2 py-1 outline-none cursor-pointer focus:bg-slate-100 transition-colors">
                        <option value="PENDING" ${o.status === 'PENDING' ? 'selected' : ''}>Chờ xử lý</button>
                        <option value="PROCESSING" ${o.status === 'PROCESSING' ? 'selected' : ''}>Đang pha màu</button>
                        <option value="SHIPPING" ${o.status === 'SHIPPING' ? 'selected' : ''}>Đang giao</button>
                        <option value="DELIVERED" ${o.status === 'DELIVERED' ? 'selected' : ''}>Đã giao</button>
                        <option value="CANCELLED" ${o.status === 'CANCELLED' ? 'selected' : ''}>Đã hủy</button>
                    </select>
                </td>
                <td class="p-6 text-center">
                    <button class="text-charcoal hover:text-terracotta transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </td>
            </tr>
        `).join('');

        if (paginationContainer) {
            paginationContainer.innerHTML = PaginationTemplate(data.pagination, 'changeAdminOrderPage');
        }

        // Đăng ký hàm cập nhật trạng thái toàn cục
        window.updateOrderStatus = async (orderId, status) => {
            try {
                window.toggleLoader(true);
                await orderApi.updateStatus(orderId, status); // Chờ tý, cần check orderApi.updateStatus
                showToast('✅ Cập nhật trạng thái thành công!');
                renderAdminOrders(page);
            } catch (err) {
                showToast('❌ Lỗi cập nhật: ' + (err.response?.data?.message || err.message), 'error');
            } finally {
                window.toggleLoader(false);
            }
        };

    } catch (err) {
        list.innerHTML = '<tr><td colspan="6" class="p-10 text-center text-red-500 font-bold italic">Lỗi nạp đơn hàng</td></tr>';
    }
};

const initProductFormHandler = () => {
    const form = document.querySelector('#add-product-form');
    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        try {
            window.toggleLoader(true);
            await productApi.create(formData);
            showToast('✅ Thêm sản phẩm thành công!');
            window.closeAddProductModal();
            renderAdminProducts(); // Refresh danh sách
        } catch (err) {
            showToast('❌ Lỗi: ' + (err.response?.data?.message || err.message), 'error');
        } finally {
            window.toggleLoader(false);
        }
    };
};

window.deleteUser = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn loại bỏ người dùng này khỏi hệ thống?')) return;
    try {
        await userApi.delete(id);
        showToast('🗑️ Đã loại bỏ thành công.');
        renderAdminUsers();
    } catch (err) { showToast('❌ Thất bại: ' + err.message, 'error'); }
};

window.deleteProduct = async (id) => {
    if (!confirm('Xác nhận xóa sản|phẩm này?')) return;
    try {
        await productApi.delete(id);
        showToast('🗑️ Đã xóa sản phẩm.');
        renderAdminProducts();
    } catch (err) { showToast('❌ Lỗi: ' + err.message, 'error'); }
};
