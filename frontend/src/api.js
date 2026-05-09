import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Tự động đính kèm Token vào Header nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
};

export const productApi = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (id) => api.get(`/products/${id}`),
};

export const aiApi = {
  analyze: (formData) => api.post('/ai/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getHistory: () => api.get('/ai/history'),
};

export const orderApi = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders'),
  getDetail: (id) => api.get(`/orders/${id}`),
};

export const paymentApi = {
  createUrl: (orderId) => api.post('/payments/create-url', { orderId }),
};

export default api;
