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
import { CartTemplate, CheckoutTemplate } from './src/templates/cart.js';

// Handlers
import { initLoginHandler, initRegisterHandler, initForgotPasswordHandler, initResetPasswordHandler } from './src/handlers/auth.handler.js';
import { initAIHandlers } from './src/handlers/ai.handler.js';
import { renderCartDetails, initCheckoutHandler, formatPrice } from './src/handlers/cart.handler.js';
import { initProfileHandler } from './src/handlers/profile.handler.js';
import { initAdminHandler } from './src/handlers/admin/index.js';
import { renderProductsPage } from './src/handlers/products.handler.js';
import { renderOrdersPage } from './src/handlers/order.handler.js';

const app = document.querySelector('#app');

const routeConfig = {
    home: { template: HomeTemplate, init: () => renderProductsPage(app.querySelector('#products-container')), layout: true },
    products: { template: HomeTemplate, init: () => renderProductsPage(app.querySelector('#products-container')), layout: true },
    ai: { template: AITemplate, init: initAIHandlers, layout: true },
    login: { template: LoginTemplate, init: initLoginHandler, layout: true },
    register: { template: RegisterTemplate, init: initRegisterHandler, layout: true },
    'forgot-password': { template: ForgotPasswordTemplate, init: initForgotPasswordHandler, layout: true },
    'reset-password': { template: ResetPasswordTemplate, init: initResetPasswordHandler, layout: true },
    profile: { template: ProfileTemplate, init: initProfileHandler, layout: true },
    cart: { template: CartTemplate, init: renderCartDetails, layout: true },
    checkout: { template: (order) => CheckoutTemplate(order, formatPrice), init: initCheckoutHandler, layout: true },
    orders: { template: () => '<div id="orders-container"></div>', init: () => renderOrdersPage(app.querySelector('#orders-container')), layout: true },
    admin: { template: AdminTemplate, init: () => initAdminHandler(state.user?.id), layout: false }
};

const handleRouteMatch = async (routeName, params = null) => {
    const config = routeConfig[routeName];
    if (!config) {
        navigate('home');
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
    const hash = window.location.hash || '#/';
    const currentPath = hash.split('?')[0];
    
    // Tìm routeName hiện tại
    import('./src/router.js').then(({ routes }) => {
        let currentRouteName = 'home';
        for (const [name, config] of Object.entries(routes)) {
            if (config.path === currentPath) {
                currentRouteName = name;
                break;
            }
        }
        
        const config = routeConfig[currentRouteName];
        if (config && config.layout) {
            // Re-render layout để cập nhật Header/Footer mà không làm mất trạng thái của main-content nếu được (tương lai)
            // Hiện tại renderLayout là cách nhanh nhất để đồng bộ Header
            renderLayout(document.querySelector('#main-content')?.innerHTML || '');
        }
    });
});

initApp();
