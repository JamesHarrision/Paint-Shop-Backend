import './style.css'
import { productApi, authApi, aiApi, orderApi, paymentApi } from './src/api'

const app = document.querySelector('#app');
const authSection = document.querySelector('#auth-section');

// --- Quản lý Trạng thái ---
let state = {
  user: null,
  currentPage: 'home',
  products: [],
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  loading: false
};

// --- Utils ---
const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const renderAuth = () => {
  if (state.user) {
    authSection.innerHTML = `
      <div class="flex items-center gap-4">
        <span class="text-sm font-medium text-slate-400">Chào, <span class="text-white">${state.user.fullName}</span></span>
        <button id="btn-cart" class="relative p-2 text-slate-300 hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span id="cart-badge" class="absolute top-0 right-0 bg-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full text-white font-bold">${state.cart.reduce((sum, i) => sum + i.quantity, 0)}</span>
        </button>
        <button id="btn-logout" class="text-sm text-red-400 hover:text-red-300">Đăng xuất</button>
      </div>
    `;
    document.querySelector('#btn-logout').onclick = logout;
    document.querySelector('#btn-cart').onclick = () => navigate('cart');
  } else {
    authSection.innerHTML = `
      <button class="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all" id="btn-login-nav">Đăng nhập</button>
      <button class="px-5 py-2 rounded-full bg-primary hover:bg-blue-700 text-white font-semibold transition-all" id="btn-register-nav">Đăng ký</button>
    `;
    document.querySelector('#btn-login-nav').onclick = () => navigate('login');
    document.querySelector('#btn-register-nav').onclick = () => navigate('register');
  }
};

const logout = () => {
  localStorage.removeItem('accessToken');
  state.user = null;
  renderAuth();
  navigate('home');
};

// --- Cart Logic ---
window.addToCart = (productId) => {
    const item = state.cart.find(i => i.productId === productId);
    if (item) {
      item.quantity += 1;
    } else {
      state.cart.push({ productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(state.cart));
    updateCartBadge();
    alert('Đã thêm sản phẩm vào giỏ hàng!');
};
  
const updateCartBadge = () => {
    const total = state.cart.reduce((sum, i) => sum + i.quantity, 0);
    const badge = document.querySelector('#cart-badge');
    if (badge) badge.innerText = total;
};

// --- Templates ---

const HomeTemplate = () => `
  <section class="relative py-24 overflow-hidden">
    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-3xl">
        <h1 class="text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          Sáng tạo không gian <br> 
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Sống động với AI</span>
        </h1>
        <p class="text-xl text-slate-400 mb-10 leading-relaxed">
          Tải lên ảnh căn phòng của bạn, trí tuệ nhân tạo sẽ phân tích và gợi ý những màu sơn hoàn hảo nhất từ bộ sưu tập cao cấp của chúng tôi.
        </p>
        <div class="flex flex-wrap gap-4">
          <button onclick="window.navigate('ai')" class="px-8 py-4 bg-primary hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:-translate-y-1">Thử ngay miễn phí</button>
          <button onclick="window.navigate('products')" class="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-lg transition-all">Khám phá sản phẩm</button>
        </div>
      </div>
    </div>
    <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent -z-10 blur-3xl"></div>
  </section>
`;

const ProductListTemplate = (products) => `
  <section class="py-12 container mx-auto px-6">
    <h2 class="text-3xl font-bold mb-8">Bộ sưu tập màu sơn</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      ${products.map(p => `
        <div class="group bg-slate-800/50 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10">
          <div class="aspect-square overflow-hidden relative">
            <img src="${p.imageUrl}" alt="${p.name}" class="w-full h-full object-cover transition-transform group-hover:scale-110">
            <div class="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-white shadow-lg" style="background-color: ${p.colorCode}"></div>
          </div>
          <div class="p-6">
            <h3 class="font-bold text-lg mb-2 text-white">${p.name}</h3>
            <p class="text-slate-400 text-sm mb-4 line-clamp-2">${p.description || 'Không có mô tả'}</p>
            <div class="flex justify-between items-center">
              <span class="text-primary font-bold text-xl">${formatPrice(p.price)}</span>
              <button onclick="window.addToCart(${p.id})" class="p-2 bg-white/5 hover:bg-primary text-white rounded-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </section>
`;

const AITemplate = () => `
  <section class="py-16 container mx-auto px-6 max-w-4xl">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-black mb-4">Phân tích không gian AI</h2>
      <p class="text-slate-400">Chọn một bức ảnh căn phòng của bạn để bắt đầu phép màu</p>
    </div>

    <div id="ai-upload-container" class="bg-slate-800/30 border-2 border-dashed border-white/10 rounded-[40px] p-12 text-center hover:border-primary/50 transition-all cursor-pointer">
      <input type="file" id="ai-file-input" class="hidden" accept="image/*">
      <div id="upload-placeholder">
        <div class="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p class="text-xl font-bold mb-2">Kéo thả hoặc Click để tải ảnh</p>
        <p class="text-slate-500">Hỗ trợ JPG, PNG (Tối đa 5MB)</p>
      </div>
      <div id="upload-preview" class="hidden">
        <img src="" id="img-preview" class="max-h-[400px] mx-auto rounded-2xl mb-6 shadow-2xl">
        <button id="btn-start-analyze" class="px-8 py-3 bg-primary hover:bg-blue-700 text-white rounded-xl font-bold transition-all">Bắt đầu phân tích</button>
      </div>
    </div>

    <div id="ai-result" class="mt-12 hidden"></div>
  </section>
`;

const CartTemplate = () => `
  <section class="py-16 container mx-auto px-6 max-w-4xl">
    <h2 class="text-3xl font-black mb-8">Giỏ hàng của bạn</h2>
    <div id="cart-items" class="space-y-4">
        ${state.cart.length === 0 ? '<div class="text-center py-20 text-slate-500">Giỏ hàng trống rỗng...</div>' : ''}
    </div>
    ${state.cart.length > 0 ? `
        <div class="mt-8 border-t border-white/10 pt-8 flex justify-between items-center">
            <div>
                <p class="text-slate-400">Tổng cộng</p>
                <p class="text-3xl font-black text-white" id="cart-total">Đang tính...</p>
            </div>
            <button id="btn-checkout" class="px-10 py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition-all">Tiến hành đặt hàng</button>
        </div>
    ` : ''}
  </section>
`;

const CheckoutTemplate = (order) => `
    <section class="py-24 container mx-auto px-6 max-w-2xl text-center">
        <div class="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h2 class="text-3xl font-black mb-2">Đặt hàng thành công!</h2>
        <p class="text-slate-400 mb-8">Mã đơn hàng: #<span class="text-white">${order.id}</span></p>
        
        <div class="bg-slate-800/50 p-8 rounded-[40px] border border-white/5 mb-8">
            <p class="text-lg mb-4 text-slate-300">Tổng tiền cần thanh toán: <span class="text-primary font-black">${formatPrice(order.totalAmount)}</span></p>
            <p class="text-sm text-slate-500 mb-6">Chọn phương thức thanh toán để tiếp tục</p>
            <div class="grid grid-cols-1 gap-4">
                <button id="btn-pay-vnpay" class="flex items-center justify-center gap-3 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all">
                    <img src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo-vnpay.png" class="h-6">
                    Thanh toán qua VNPAY
                </button>
                <button onclick="window.navigate('orders')" class="py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">Thanh toán khi nhận hàng (COD)</button>
            </div>
        </div>
    </section>
`;

const LoginTemplate = () => `
  <section class="py-24 container mx-auto px-6 flex justify-center">
    <div class="bg-slate-800/50 p-10 rounded-[40px] border border-white/5 w-full max-w-md">
      <h2 class="text-3xl font-black mb-8 text-center">Chào mừng quay lại</h2>
      <form id="login-form" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-400 mb-2">Email</label>
          <input type="email" id="login-email" class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none text-white" placeholder="your@email.com" required>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-400 mb-2">Mật khẩu</label>
          <input type="password" id="login-password" class="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none text-white" placeholder="••••••••" required>
        </div>
        <button type="submit" class="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all">Đăng nhập</button>
      </form>
    </div>
  </section>
`;

// --- Điều hướng (Navigation) ---

const navigate = async (page) => {
  state.currentPage = page;
  app.innerHTML = '<div class="flex items-center justify-center h-[60vh]"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>';

  try {
    switch (page) {
      case 'home':
        app.innerHTML = HomeTemplate();
        break;
      case 'products':
        const { data } = await productApi.getAll();
        app.innerHTML = ProductListTemplate(data.data.products);
        break;
      case 'ai':
        app.innerHTML = AITemplate();
        initAIHandlers();
        break;
      case 'login':
        app.innerHTML = LoginTemplate();
        initLoginHandler();
        break;
      case 'cart':
        app.innerHTML = CartTemplate();
        renderCartDetails();
        break;
      case 'orders':
        const ordersRes = await orderApi.getMyOrders();
        renderOrders(ordersRes.data.data);
        break;
    }
  } catch (err) {
    app.innerHTML = `<div class="p-12 text-center text-red-400">Lỗi: ${err.message}</div>`;
  }
};

window.navigate = navigate;

// --- Handlers & Renderers ---

const initLoginHandler = () => {
  const form = document.querySelector('#login-form');
  form.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    try {
      const { data } = await authApi.login({ email, password });
      localStorage.setItem('accessToken', data.data.accessToken);
      state.user = data.data.user;
      renderAuth();
      alert('Đăng nhập thành công!');
      navigate('home');
    } catch (err) {
      alert('Đăng nhập thất bại: ' + (err.response?.data?.message || err.message));
    }
  };
};

const initAIHandlers = () => {
  const container = document.querySelector('#ai-upload-container');
  const input = document.querySelector('#ai-file-input');
  const preview = document.querySelector('#upload-preview');
  const placeholder = document.querySelector('#upload-placeholder');
  const imgPreview = document.querySelector('#img-preview');
  const btnAnalyze = document.querySelector('#btn-start-analyze');

  container.onclick = () => input.click();
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (re) => {
        imgPreview.src = re.target.result;
        placeholder.classList.add('hidden');
        preview.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }
  };

  btnAnalyze.onclick = async (e) => {
    e.stopPropagation();
    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);

    btnAnalyze.innerText = 'Đang phân tích...';
    btnAnalyze.disabled = true;

    try {
      const { data } = await aiApi.analyze(formData);
      renderAIResult(data.data);
    } catch (err) {
      alert('Phân tích thất bại: ' + (err.response?.data?.message || err.message));
      btnAnalyze.innerText = 'Bắt đầu phân tích';
      btnAnalyze.disabled = false;
    }
  };
};

const renderAIResult = (result) => {
    const resultDiv = document.querySelector('#ai-result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <h3 class="text-2xl font-bold mb-6">Kết quả phân tích màu sắc</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-slate-800/50 p-6 rounded-3xl border border-white/5">
                <h4 class="text-lg font-bold mb-4">Bảng màu gợi ý</h4>
                <div class="flex gap-4 flex-wrap">
                    ${result.palette.map(c => `
                        <div class="w-16 h-16 rounded-2xl shadow-lg cursor-help group relative" style="background-color: ${c.hex}">
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                                ${c.hex}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="bg-slate-800/50 p-6 rounded-3xl border border-white/5">
                <h4 class="text-lg font-bold mb-4">Sản phẩm đề xuất</h4>
                ${result.palette.filter(c => c.matchedProduct).map(c => `
                    <div class="flex items-center gap-4 mb-4 p-3 bg-white/5 rounded-2xl">
                        <img src="${c.matchedProduct.image}" class="w-12 h-12 rounded-lg object-cover">
                        <div class="flex-1">
                            <p class="font-bold text-sm">${c.matchedProduct.name}</p>
                            <p class="text-primary text-xs font-bold">${formatPrice(c.matchedProduct.price)}</p>
                        </div>
                        <div class="text-right">
                             <div class="text-[10px] text-slate-500">Độ khớp</div>
                             <div class="text-emerald-500 font-black">${c.matchedProduct.matchScore}%</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

const renderCartDetails = async () => {
    if (state.cart.length === 0) return;
    const itemsDiv = document.querySelector('#cart-items');
    let total = 0;
    
    const itemsHtml = await Promise.all(state.cart.map(async (item) => {
        try {
            const { data } = await productApi.getOne(item.productId);
            const product = data.data;
            total += Number(product.price) * item.quantity;
            return `
                <div class="flex items-center gap-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                    <img src="${product.imageUrl}" class="w-20 h-20 rounded-2xl object-cover">
                    <div class="flex-1">
                        <h4 class="font-bold text-white">${product.name}</h4>
                        <p class="text-primary font-bold">${formatPrice(product.price)}</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="text-slate-400">Số lượng: ${item.quantity}</span>
                    </div>
                </div>
            `;
        } catch (e) { return ''; }
    }));
    
    itemsDiv.innerHTML = itemsHtml.join('');
    document.querySelector('#cart-total').innerText = formatPrice(total);

    document.querySelector('#btn-checkout').onclick = async () => {
        if (!state.user) return alert('Vui lòng đăng nhập để đặt hàng!');
        try {
            const { data } = await orderApi.create({ items: state.cart });
            state.cart = [];
            localStorage.removeItem('cart');
            updateCartBadge();
            renderCheckout(data.data);
        } catch (err) {
            alert('Đặt hàng thất bại: ' + err.message);
        }
    };
};

const renderCheckout = (order) => {
    app.innerHTML = CheckoutTemplate(order);
    document.querySelector('#btn-pay-vnpay').onclick = async () => {
        try {
            const { data } = await paymentApi.createUrl(order.id);
            window.location.href = data.data.paymentUrl;
        } catch (err) {
            alert('Lỗi tạo link thanh toán: ' + err.message);
        }
    };
};

const renderOrders = (orders) => {
    app.innerHTML = `
        <section class="py-16 container mx-auto px-6 max-w-4xl">
            <h2 class="text-3xl font-black mb-8">Lịch sử đơn hàng</h2>
            <div class="space-y-6">
                ${orders.length === 0 ? '<div class="text-center py-20 text-slate-500">Bạn chưa có đơn hàng nào.</div>' : ''}
                ${orders.map(o => `
                    <div class="bg-slate-800/50 p-6 rounded-3xl border border-white/5">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <p class="text-sm text-slate-500">Mã đơn: #${o.id}</p>
                                <p class="text-xl font-bold text-white">${formatPrice(o.totalAmount)}</p>
                            </div>
                            <span class="px-4 py-1 rounded-full text-xs font-bold ${o.paymentStatus === 'PAID' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}">
                                ${o.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                            </span>
                        </div>
                        <div class="flex gap-2">
                            ${o.items.map(i => `
                                <img src="${i.product.imageUrl}" class="w-10 h-10 rounded-lg object-cover" title="${i.product.name}">
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
};

// --- Khởi tạo App ---

const init = async () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const { data } = await authApi.getProfile();
      state.user = data.data;
    } catch (err) {
      localStorage.removeItem('accessToken');
    }
  }
  
  renderAuth();
  updateCartBadge();
  navigate('home');

  // Nav Handlers
  document.querySelector('#btn-home').onclick = () => navigate('home');
  document.querySelector('#nav-home').onclick = () => navigate('home');
  document.querySelector('#btn-products').onclick = () => navigate('products');
  document.querySelector('#btn-ai').onclick = () => navigate('ai');
  document.querySelector('#btn-orders').onclick = () => navigate('orders');
};

init();
