// src/handlers/collection_detail.handler.js
import { collectionApi, itemCollectionApi, productApi } from '../api.js';
import { CollectionDetailTemplate } from '../templates/collection_detail.js';

let currentCollectionId = null;
let allProducts = [];

export const initCollectionDetailHandler = async (id) => {
    currentCollectionId = id;
    const container = document.querySelector('#collection-detail-container');
    if (!container) return;

    window.toggleLoader(true);
    try {
        const res = await collectionApi.getById(id);
        const collection = res.data.data;
        
        container.innerHTML = CollectionDetailTemplate(collection);

        // Bind events
        window.showAddItemModal = async () => {
            const modal = document.querySelector('#add-item-modal');
            if (modal) {
                modal.classList.remove('hidden');
                const select = document.querySelector('#item-product-id');
                
                if (allProducts.length === 0) {
                    try {
                        const prodRes = await productApi.getAll({ limit: 1000 }); // Load enough products
                        allProducts = prodRes.data.data || [];
                    } catch (e) {
                        console.error('Error fetching products for select:', e);
                        select.innerHTML = '<option value="">Lỗi tải danh sách sản phẩm</option>';
                        return;
                    }
                }
                
                // Populate select
                if (allProducts.length > 0) {
                    select.innerHTML = `
                        <option value="">-- Chọn sản phẩm --</option>
                        ${allProducts.map(p => `<option value="${p.id}">${p.name} - ${p.price}đ</option>`).join('')}
                    `;
                } else {
                    select.innerHTML = '<option value="">Chưa có sản phẩm nào trong hệ thống</option>';
                }
            }
        };

        const addForm = document.querySelector('#add-item-form');
        if (addForm) {
            addForm.onsubmit = async (e) => {
                e.preventDefault();
                const productId = document.querySelector('#item-product-id').value;
                if (!productId) return;

                window.toggleLoader(true);
                try {
                    await itemCollectionApi.add(currentCollectionId, productId);
                    window.showToast('Đã thêm sản phẩm vào bộ sưu tập');
                    // Reload
                    initCollectionDetailHandler(currentCollectionId);
                } catch (err) {
                    window.showToast(err.response?.data?.message || 'Có lỗi xảy ra', 'error');
                } finally {
                    window.toggleLoader(false);
                }
            };
        }

        window.removeCollectionItem = async (colId, prodId) => {
            if (confirm('Bạn có chắc muốn xoá sản phẩm này khỏi bộ sưu tập?')) {
                window.toggleLoader(true);
                try {
                    await itemCollectionApi.remove(colId, prodId);
                    window.showToast('Đã xoá sản phẩm');
                    initCollectionDetailHandler(currentCollectionId);
                } catch (err) {
                    window.showToast(err.response?.data?.message || 'Lỗi xoá sản phẩm', 'error');
                } finally {
                    window.toggleLoader(false);
                }
            }
        };

    } catch (err) {
        console.error(err);
        window.showToast('Không tìm thấy bộ sưu tập', 'error');
        window.navigate('404');
    } finally {
        window.toggleLoader(false);
    }
};
