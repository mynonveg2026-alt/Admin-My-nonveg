import axiosInstance from './axiosInstance';

export const getVendors = () =>
  axiosInstance.get('/admin/vendors').then((res) => res.data.data);

export const getVendorById = (id) =>
  axiosInstance.get(`/admin/vendors/${id}`).then((res) => res.data.data);

export const updateVendorStatus = (id, status) =>
  axiosInstance.put(`/admin/vendor-status/${id}`, { status }).then((res) => res.data);
