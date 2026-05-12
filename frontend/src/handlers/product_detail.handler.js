// src/handlers/product_detail.handler.js
import { productApi, reviewApi } from '../api.js';
import { ProductDetailTemplate } from '../templates/product_detail.js';
import { addToCart } from './cart.handler.js';
import { state } from '../state.js';
import { showToast } from '../ui.js';

export const initProductDetailHandler = async (id) => {
    const container = document.querySelector('#product-detail-container');
    if (!container) return;

    window.toggleLoader(true);
    try {
        const res = await productApi.getById(id);
        const product = res.data.data;
        
        container.innerHTML = ProductDetailTemplate(product);

        // Bind events for quantity
        window.updateDetailQty = (change) => {
            const input = document.querySelector('#detail-qty');
            if (input) {
                let val = parseInt(input.value) + change;
                if (val < 1) val = 1;
                input.value = val;
            }
        };

        // Bind add to cart
        window.addToCartFromDetail = (productId) => {
            const input = document.querySelector('#detail-qty');
            const qty = input ? parseInt(input.value) : 1;
            for (let i = 0; i < qty; i++) {
                addToCart(productId);
            }
        };

        // Reviews logic
        const loadReviews = async () => {
            const listDiv = document.querySelector('#review-list');
            if (!listDiv) return;
            try {
                const { data } = await reviewApi.getProductReviews(id);
                const reviews = data.data.reviews;
                
                if (reviews.length === 0) {
                    listDiv.innerHTML = '<div class="text-center py-8 text-slate-400 font-bold text-sm uppercase tracking-widest">Chưa có đánh giá nào.</div>';
                    return;
                }

                listDiv.innerHTML = reviews.map(r => `
                    <div class="border-b-2 border-charcoal pb-6 last:border-0">
                        <div class="flex items-center gap-4 mb-2">
                            <div class="font-black uppercase">${r.user?.fullName || 'Khách'}</div>
                            <div class="text-yellow-500 font-black text-sm">★ ${r.rating}</div>
                            <div class="text-xs text-slate-400 ml-auto">${new Date(r.createdAt).toLocaleDateString('vi-VN')}</div>
                        </div>
                        <p class="font-medium text-slate-700">${r.comment || ''}</p>
                    </div>
                `).join('');
            } catch (err) {
                listDiv.innerHTML = '<div class="text-center py-8 text-red-500 font-bold">Lỗi tải đánh giá.</div>';
            }
        };

        loadReviews();

        if (state.user) {
            document.querySelector('#review-form-container').classList.remove('hidden');
            document.querySelector('#form-review').onsubmit = async (e) => {
                e.preventDefault();
                const rating = document.querySelector('#review-rating').value;
                const comment = document.querySelector('#review-comment').value;

                try {
                    window.toggleLoader(true);
                    // Use FormData since backend expects it (cloudinaryUpload.array)
                    const formData = new FormData();
                    formData.append('rating', rating);
                    formData.append('comment', comment);

                    await reviewApi.create(id, formData);
                    showToast('Đã gửi đánh giá thành công!', 'success');
                    document.querySelector('#review-comment').value = '';
                    loadReviews();
                } catch (err) {
                    showToast(err.response?.data?.message || 'Lỗi gửi đánh giá', 'error');
                } finally {
                    window.toggleLoader(false);
                }
            };
        }

    } catch (err) {
        console.error(err);
        window.showToast('Không tìm thấy sản phẩm', 'error');
        window.navigate('404');
    } finally {
        window.toggleLoader(false);
    }
};
