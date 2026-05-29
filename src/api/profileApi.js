import axiosInstance from './axiosInstance';

export const getProfile = () =>
  axiosInstance.get('/auth/profile').then((res) => res.data.data);
