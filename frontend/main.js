// main.js - Entry Point
import './style.css';
import { state } from './src/state.js';
import { initRouter, navigate } from './src/router.js';
import { userApi } from './src/api.js';
import { renderLayout, toggleLoader } from './src/ui.js';

// Templates
import { HomeTemplate } from './src/templates/home.js';
import { AITemplate } from './src/templates/ai.js';
import { LoginTemplate, RegisterTemplate, ForgotPasswordTemplate, ResetPasswordTemplate } from './src/templates/auth.js';
import { ProfileTemplate } from './src/templates/profile.js';
import { AdminTemplate } from './src/templates/admin/layout.js';
import { ProductsPageTemplate } from './src/templates/products.js';
import { CartTemplate, CheckoutTemplate } from './src/templates/cart.js';
import { CollectionsPageTemplate } from './src/templates/collections.js';
import { Error404Template, Error403Template } from './src/templates/error.js';

// Handlers
import { initLoginHandler, initRegisterHandler, initForgotPasswordHandler, initResetPasswordHandler } from './src/handlers/auth.handler.js';
import { initAIHandlers } from './src/handlers/ai.handler.js';
import { renderCartDetails, initCheckoutHandler, formatPrice } from './src/handlers/cart.handler.js';
import { initProfileHandler } from './src/handlers/profile.handler.js';
import { initAdminHandler } from './src/handlers/admin/index.js';
import { renderProductsPage } from './src/handlers/products.handler.js';
import { initProductDetailHandler } from './src/handlers/product_detail.handler.js';
import { renderOrdersPage } from './src/handlers/order.handler.js';
import { initCollectionsHandler } from './src/handlers/collections.handler.js';
import { initCollectionDetailHandler } from './src/handlers/collection_detail.handler.js';

const app = document.querySelector('#app');

const routeConfig = {
    home: { template: HomeTemplate, init: () => renderProductsPage(document.querySelector('#products-container'), { limit: 4 }), layout: true },
    products: { template: ProductsPageTemplate, init: (params) => renderProductsPage(document.querySelector('#products-container'), params), layout: true },
    product_detail: { template: () => '<div id="product-detail-container"></div>', init: (params) => initProductDetailHandler(params.id), layout: true },
    ai: { template: AITemplate, init: initAIHandlers, layout: true },
    login: { template: LoginTemplate, init: initLoginHandler, layout: true },
    register: { template: RegisterTemplate, init: initRegisterHandler, layout: true },
    'forgot-password': { template: ForgotPasswordTemplate, init: initForgotPasswordHandler, layout: true },
    'reset-password': { template: ResetPasswordTemplate, init: initResetPasswordHandler, layout: true },
    profile: { template: () => ProfileTemplate(state.user), init: initProfileHandler, layout: true },
    cart: { template: CartTemplate, init: renderCartDetails, layout: true },
    checkout: { template: (order) => CheckoutTemplate(order, formatPrice), init: initCheckoutHandler, layout: true },
    orders: { template: () => '<div id="orders-container"></div>', init: () => renderOrdersPage(app.querySelector('#orders-container')), layout: true },
    collections: { template: CollectionsPageTemplate, init: initCollectionsHandler, layout: true },
    collection_detail: { template: () => '<div id="collection-detail-container"></div>', init: (params) => initCollectionDetailHandler(params.id), layout: true },
    admin: { template: AdminTemplate, init: () => { navigate('admin/users'); }, layout: false },
    'admin/users': { template: AdminTemplate, init: () => initAdminHandler('users'), layout: false },
    'admin/products': { template: AdminTemplate, init: () => initAdminHandler('products'), layout: false },
    'admin/collections': { template: AdminTemplate, init: () => initAdminHandler('collections'), layout: false },
    'admin/orders': { template: AdminTemplate, init: () => initAdminHandler('orders'), layout: false },
    '404': { template: Error404Template, init: null, layout: true },
    '403': { template: Error403Template, init: null, layout: true }
};

const handleRouteMatch = async (routeName, params = null) => {
    const config = routeConfig[routeName];
    if (!config) {
        navigate('404');
        return;
    }

    if (config.layout) {
        renderLayout(config.template(params));
    } else {
        app.innerHTML = config.template(params);
    }

    if (config.init) {
        config.init(params);
    }
    
    window.scrollTo(0, 0);
};

// Khởi tạo ứng dụng
const initApp = async () => {
    toggleLoader(true);
    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const res = await userApi.getMe();
            state.setUser(res.data.data);
        }
    } catch (err) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    } finally {
        toggleLoader(false);
        const startRoute = initRouter(handleRouteMatch);
        startRoute();
    }
};

// Lắng nghe sự thay đổi state để cập nhật UI (ví dụ: giỏ hàng, avatar)
window.addEventListener('state-change', (e) => {
    // Chỉ cập nhật phần Header thay vì render lại toàn bộ layout
    // tránh làm mất các sự kiện (events) đã gắn vào main-content.
    import('./src/ui.js').then(({ updateHeader }) => {
        updateHeader();
    });
});

initApp();
