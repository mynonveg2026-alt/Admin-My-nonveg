import axiosInstance from './axiosInstance';

export const getDashboardData = () =>
  axiosInstance.get('/admin/dashboard').then((res) => res.data.data);
