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
  'admin': { path: '#/admin', title: 'Bảng quản trị' },
  'collections': { path: '#/collections', title: 'Bộ sưu tập' },
  'product_detail': { path: '#/products/:id', title: 'Chi tiết Sản phẩm' },
  'collection_detail': { path: '#/collections/:id', title: 'Chi tiết Bộ sưu tập' },
  'admin/users': { path: '#/admin/users', title: 'Quản trị Thành viên' },
  'admin/products': { path: '#/admin/products', title: 'Quản trị Sản phẩm' },
  'admin/collections': { path: '#/admin/collections', title: 'Quản trị Bộ sưu tập' },
  'admin/orders': { path: '#/admin/orders', title: 'Quản trị Đơn hàng' },
  '404': { path: '#/404', title: 'Không tìm thấy trang' },
  '403': { path: '#/403', title: 'Từ chối truy cập' }
};

export const initRouter = (onRouteMatch) => {
  const handleRoute = () => {
    const hash = window.location.hash || '#/';
    
    // Tìm route khớp với hash (bỏ qua query params nếu có)
    const currentPath = hash.split('?')[0];
    let routeName = null;
    let routeParams = null;

    for (const [name, config] of Object.entries(routes)) {
        if (config.path === currentPath) {
            routeName = name;
            break;
        }

        if (config.path.includes('/:id')) {
            const basePath = config.path.replace('/:id', '');
            if (currentPath.startsWith(basePath + '/')) {
                const id = currentPath.split('/').pop();
                if (id) {
                    routeName = name;
                    routeParams = { id };
                    break;
                }
            }
        }
    }

    if (!routeName) {
        routeName = '404';
    }

    // Parse query parameters
    const queryString = hash.split('?')[1] || '';
    const queryParams = Object.fromEntries(new URLSearchParams(queryString));
    routeParams = { ...routeParams, ...queryParams };

    // Kiểm tra quyền Admin (Wait for state if loading)
    if (routeName.startsWith('admin') && state.user?.role !== 'ADMIN') {
        // Nếu đang login mà ko phải admin mới đẩy ra, còn nếu chưa load xong state thì cứ để handleRouteMatch lo
        if (state.user && state.user.role !== 'ADMIN') {
            window.location.hash = '#/';
            return;
        }
    }

    onRouteMatch(routeName, routeParams);
  };

  window.addEventListener('hashchange', handleRoute);
  
  return handleRoute;
};

export const navigate = (pathOrRouteName) => {
    let targetPath = pathOrRouteName;
    if (routes[pathOrRouteName]) {
        targetPath = routes[pathOrRouteName].path;
    } else if (!targetPath.startsWith('#/')) {
        targetPath = '#/' + targetPath;
    }

    if (window.location.hash === targetPath) {
        window.dispatchEvent(new Event('hashchange'));
    } else {
        window.location.hash = targetPath;
    }
};

window.navigate = navigate;
