// src/handlers/admin/products.handler.js
import { productApi } from '../../api.js';
import { Pagination } from '../../components/Pagination.js';
import { showToast } from '../../ui.js';

let productSearch = '';

export const renderAdminProducts = async (page = 1) => {
    const list = document.querySelector('#admin-product-list');
    const paginationContainer = document.querySelector('#admin-product-pagination');
    const searchBtn = document.querySelector('#btn-admin-product-search');
    const searchInput = document.querySelector('#admin-product-search');

    if (!list) return;

    if (searchBtn && !searchBtn.onclick) {
        searchBtn.onclick = () => {
            productSearch = searchInput.value;
            renderAdminProducts(1);
        };
        searchInput.onkeypress = (e) => { if (e.key === 'Enter') searchBtn.click(); };
    }

    try {
        const { data } = await productApi.getAll({ page, limit: 10, search: productSearch });
        const products = data.data;
        const countEl = document.querySelector('#admin-product-count');
        if (countEl) countEl.innerText = data.pagination.total;

        list.innerHTML = products.map(p => `
            <tr class="hover:bg-black/[0.02] transition-colors group">
                <td class="p-6 border-r border-black/10 text-center">
                    <img src="${p.imageUrl || 'https://via.placeholder.com/100'}" 
                        class="w-12 h-12 object-cover border-2 border-black shadow-[3px_3px_0px_#000] mx-auto grayscale group-hover:grayscale-0 transition-all">
                </td>
                <td class="p-6 border-r border-black/10 font-black uppercase tracking-tight truncate max-w-[200px]" title="${p.name}">${p.name}</td>
                <td class="p-6 border-r border-black/10 font-black text-black">
                    ${new Intl.NumberFormat('vi-VN').format(p.price)}<span class="text-[10px] ml-1 opacity-40">VND</span>
                </td>
                <td class="p-6 border-r border-black/10 text-center font-black">
                    <span class="${p.stock < 10 ? 'text-[#FF4D4D]' : ''}">${p.stock}</span>
                </td>
                <td class="p-6 border-r border-black/10 text-center">
                    <div class="w-6 h-6 border-2 border-black mx-auto shadow-[2px_2px_0px_#000]" style="background-color: ${p.colorCode || '#ccc'}"></div>
                </td>
                <td class="p-6 text-center">
                    <div class="flex justify-center gap-2">
                        <button onclick="window.editProduct(${p.id})" 
                            class="w-8 h-8 flex items-center justify-center border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none" 
                            title="Chỉnh sửa">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button onclick="window.deleteProduct(${p.id})" 
                            class="w-8 h-8 flex items-center justify-center border-2 border-black text-[#FF4D4D] hover:bg-[#FF4D4D] hover:text-white transition-all shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            title="Xóa">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        if (paginationContainer) {
            paginationContainer.innerHTML = Pagination(data.pagination, 'changeAdminProductPage');
        }
    } catch (err) {
        list.innerHTML = '<tr><td colspan="6" class="p-10 text-center text-red-500 font-bold italic">Lỗi nạp sản phẩm</td></tr>';
    }
};

export const initProductFormHandler = () => {
    const form = document.querySelector('#add-product-form');
    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const id = formData.get('id');

        try {
            window.toggleLoader(true);
            if (id) {
                await productApi.update(id, formData);
                showToast('✅ Cập nhật sản phẩm thành công!');
            } else {
                await productApi.create(formData);
                showToast('✅ Thêm sản phẩm thành công!');
            }
            window.closeAddProductModal();
            renderAdminProducts();
        } catch (err) {
            showToast('❌ Lỗi: ' + (err.response?.data?.message || err.message), 'error');
        } finally {
            window.toggleLoader(false);
        }
    };
};

window.editProduct = async (id) => {
    try {
        window.toggleLoader(true);
        const { data } = await productApi.getById(id);
        const p = data.data;

        // Reset form và điền data
        const form = document.querySelector('#add-product-form');
        if (!form) return;
        form.reset();

        form.querySelector('#product-id').value = p.id;
        form.querySelector('input[name="name"]').value = p.name;
        form.querySelector('input[name="price"]').value = p.price;
        form.querySelector('input[name="stock"]').value = p.stock;
        form.querySelector('input[name="colorCode"]').value = p.colorCode || '';
        form.querySelector('textarea[name="description"]').value = p.description || '';

        // Đổi UI modal
        document.querySelector('#product-modal-title').innerHTML = `Sửa <br> <span class="not-italic text-terracotta">Sản phẩm #${p.id}</span>`;
        document.querySelector('#btn-product-submit').innerText = 'Cập nhật sản phẩm';

        window.showAddProductModal(true); // true nghĩa là ko cần gọi initProductFormHandler vì đã gọi lúc mở admin rồi
    } catch (err) {
        showToast('❌ Lỗi nạp dữ liệu: ' + err.message, 'error');
    } finally {
        window.toggleLoader(false);
    }
};

window.deleteProduct = async (id) => {
    console.log('🗑️ Attempting to delete product with ID:', id);
    if (!id) {
        showToast('❌ Lỗi: Không tìm thấy ID sản phẩm', 'error');
        return;
    }
    if (!confirm(`Xác nhận xóa sản phẩm #${id}?`)) return;
    try {
        window.toggleLoader(true);
        await productApi.delete(id);
        showToast('🗑️ Đã xóa sản phẩm thành công.');
        renderAdminProducts();
    } catch (err) {
        console.error('Delete error:', err);
        showToast('❌ Lỗi: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
        window.toggleLoader(false);
    }
};
