import axiosInstance from './axiosInstance';

export const getProducts = () =>
  axiosInstance.get('/product/all').then((res) => res.data.data);

export const getProductById = (id) =>
  axiosInstance.get(`/product/single/${id}`).then((res) => res.data.data);

export const updateProductStatus = (id, status) =>
  axiosInstance.patch(`/product/${id}/status`, { status }).then((res) => res.data);
