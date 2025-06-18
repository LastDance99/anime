import axios from '../lib/axios';

export const signup = async (data: any) => {
  const res = await axios.post('/api/users/signup/', data);
  return res.data;
};

export const login = async (data: any) => {
  const res = await axios.post('/api/users/login/', data);
  return res.data;
};

export const logout = async () => {
  const res = await axios.post('/api/users/logout/');
  return res.data;
};

export const refreshToken = async (data: any) => {
  const res = await axios.post('/api/users/refresh/', data);
  return res.data;
};

export const checkEmail = async (email: string) => {
  const res = await axios.post('/api/users/check-email/', { email });
  return res.data;
};

export const checkNickname = async (nickname: string) => {
  const res = await axios.post('/api/users/check-nickname/', { nickname });
  return res.data;
};

export const requestPasswordReset = async (data: any) => {
  const res = await axios.post('/api/users/password-reset/', data);
  return res.data;
};

export const confirmPasswordReset = async (data: any) => {
  const res = await axios.post('/api/users/password-reset/confirm/', data);
  return res.data;
};

export const requestEmailVerification = async () => {
  const res = await axios.post('/api/users/email-verification/');
  return res.data;
};

export const confirmEmailVerification = async (data: any) => {
  const res = await axios.post('/api/users/email-verification/confirm/', data);
  return res.data;
};