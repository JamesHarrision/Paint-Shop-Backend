// src/router.js
import { state } from './state.js';

export const routes = {
  'home': { path: '#/', title: 'Khởi đầu' },
  'products': { path: '#/products', title: 'Bộ sưu tập' },
  'ai': { path: '#/ai', title: 'Phòng Lab AI' },
  'cart': { path: '#/cart', title: 'Giỏ hàng' },
  'orders': { path: '#/orders', title: 'Đơn hàng' },
  'login': { path: '#/login', title: 'Đăng nhập' },
  'register': { path: '#/register', title: 'Gia nhập' },
  'forgot-password': { path: '#/forgot-password', title: 'Khôi phục' },
  'reset-password': { path: '#/reset-password', title: 'Mật mã mới' },
  'profile': { path: '#/profile', title: 'Hồ sơ cá nhân' },
  'admin': { path: '#/admin', title: 'Bảng quản trị' }
};

export const initRouter = (onRouteMatch) => {
  const handleRoute = () => {
    const hash = window.location.hash || '#/';
    
    // Tìm route khớp với hash (bỏ qua query params nếu có)
    const currentPath = hash.split('?')[0];
    let routeName = 'home';
    for (const [name, config] of Object.entries(routes)) {
        if (config.path === currentPath) {
            routeName = name;
            break;
        }
    }

    // Kiểm tra quyền Admin (Wait for state if loading)
    if (routeName === 'admin' && state.user?.role !== 'ADMIN') {
        // Nếu đang login mà ko phải admin mới đẩy ra, còn nếu chưa load xong state thì cứ để handleRouteMatch lo
        if (state.user && state.user.role !== 'ADMIN') {
            window.location.hash = '#/';
            return;
        }
    }

    onRouteMatch(routeName);
  };

  window.addEventListener('hashchange', handleRoute);
  
  return handleRoute;
};

export const navigate = (routeName) => {
    if (routes[routeName]) {
        window.location.hash = routes[routeName].path;
    }
};

window.navigate = navigate;
