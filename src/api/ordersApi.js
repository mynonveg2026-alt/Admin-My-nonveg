import axiosInstance from './axiosInstance';

export const getOrders = (params) =>
  axiosInstance.get('/orders', { params }).then((res) => res.data);

export const getOrderById = (id) =>
  axiosInstance.get(`/orders/${id}`).then((res) => res.data);

export const updateOrderStatus = (id, status) =>
  axiosInstance.patch(`/orders/${id}/status`, { status }).then((res) => res.data);
