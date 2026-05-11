// src/handlers/product_detail.handler.js
import { productApi } from '../api.js';
import { ProductDetailTemplate } from '../templates/product_detail.js';
import { addToCart } from './cart.handler.js';

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
            
            // Assuming addToCart takes product object and quantity
            // The existing cart handler addToCart might only take id. Let's check how it works.
            // If existing addToCart uses only id, we might need to add it multiple times or update it.
            // For now, we'll loop to add, or adapt it.
            for (let i = 0; i < qty; i++) {
                addToCart({ id: productId, ...product }); // The existing cart handler adds the object.
            }
        };

    } catch (err) {
        console.error(err);
        window.showToast('Không tìm thấy sản phẩm', 'error');
        window.navigate('404');
    } finally {
        window.toggleLoader(false);
    }
};
