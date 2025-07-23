import axios from 'axios';
import { authAtom } from '../context/auth';
import { getDefaultStore } from 'jotai';

const store = getDefaultStore();

const api = axios.create({
  baseURL: 'http://localhost:5000/', 
});

api.interceptors.request.use((config) => {
  const auth = store.get(authAtom);
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

export const userService = {
  login: (data: { email: string; password: string }) =>
    api.post('/users/Login', data).then((res) => res.data),
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/users/SignUp', data).then((res) => res.data),
  getProfile: () => api.get('/users/Profile').then((res) => res.data),
  updateProfile: (data: { username?: string; email?: string; password?: string;  full_name: string; phone?: string; address?: string }) =>
    api.put('/users/Profile', data).then((res) => res.data),
  deleteAccount: () => api.delete('/users/Profile').then((res) => res.data),
};

export const productService = {
  getAll: (params?: { category_id?: number; status?: string; page?: number; limit?: number }) =>
    api.get('/products', { params }).then((res) => res.data),
  getById: (id: number) => api.get(`/products/${id}`).then((res) => res.data),
  getByCategory: (categoryId: number, params?: { status?: string; page?: number; limit?: number }) =>
    api.get(`/products/category/${categoryId}`, { params }).then((res) => res.data),
};

export const categoryService = {
  getAll: (params?: { parent_id?: number; page?: number; limit?: number }) =>
    api.get('/categories', { params }).then((res) => res.data),
  getById: (id: number) => api.get(`/categories/${id}`).then((res) => res.data),
};

export const cartService = {
  getCart: () => api.get('/carts').then((res) => res.data),
  addItem: (data: { product_id: number; quantity: number }) =>
    api.post('/carts', data).then((res) => res.data),
  updateItem: (itemId: number, data: { quantity: number }) =>
    api.put(`/carts/items/${itemId}`, data).then((res) => res.data),
  deleteItem: (itemId: number) => api.delete(`/carts/items/${itemId}`).then((res) => res.data),
  clearCart: () => api.delete('/carts').then((res) => res.data),
};

export const orderService = {
  getUserOrders: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get('/orders', { params }).then((res) => res.data),
  getOrderById: (id: number) => api.get(`/orders/${id}`).then((res) => res.data),
  createOrder: (data: { shipping_address: string }) =>
    api.post('/orders', data).then((res) => res.data),
  cancelOrder: (id: number) => api.delete(`/orders/${id}`).then((res) => res.data),
};

export const reviewService = {
  getByProduct: (productId: number, params?: { page?: number; limit?: number }) =>
    api.get(`/reviews/product/${productId}`, { params }).then((res) => res.data),
  createReview: (data: { product_id: number; rating: number; comment?: string }) =>
    api.post('/reviews', data).then((res) => res.data),
  updateReview: (id: number, data: { rating?: number; comment?: string }) =>
    api.put(`/reviews/${id}`, data).then((res) => res.data),
  deleteReview: (id: number) => api.delete(`/reviews/${id}`).then((res) => res.data),
};

export const wishlistService = {
  getWishlist: () => api.get('/wishlist').then((res) => res.data),
  addItem: (data: { product_id: number }) => api.post('/wishlist', data).then((res) => res.data),
  moveToCart: (data: { product_id: number }) => api.post('/wishlist/to-cart', data).then((res) => res.data),
  deleteItem: (productId: number) => api.delete(`/wishlist/${productId}`).then((res) => res.data),
  clearWishlist: () => api.delete('/wishlist').then((res) => res.data),
};