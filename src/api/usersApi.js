import axiosInstance from './axiosInstance';

export const getUsers = () =>
  axiosInstance.get('/admin/users').then((res) => res.data.data);

export const getUserById = (id) =>
  axiosInstance.get(`/admin/users/${id}`).then((res) => res.data.data);
