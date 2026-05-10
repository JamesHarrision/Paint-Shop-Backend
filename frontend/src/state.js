// src/state.js

export let state = {
  user: null,
  currentPage: 'home',
  products: [],
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  loading: false,
  
  // Các hàm cập nhật
  setUser(user) {
    this.user = user;
    window.dispatchEvent(new CustomEvent('state-change', { detail: { type: 'user', value: user } }));
  },
  
  setCart(cart) {
    this.cart = cart;
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('state-change', { detail: { type: 'cart', value: cart } }));
  },
  
  setLoading(isLoading) {
    this.loading = isLoading;
    window.dispatchEvent(new CustomEvent('state-change', { detail: { type: 'loading', value: isLoading } }));
  }
};
