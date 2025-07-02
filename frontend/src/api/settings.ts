import axios from '../lib/axios';

export const getUserSettings = async () => {
  const res = await axios.get('/api/settings/');
  return res.data;
};

export const updateAccount = async (data: any) => {
  const res = await axios.put('/api/settings/account/', data);
  return res.data;
};

export const updateLanguage = async (data: { language: "ko" | "en" | "es" }) => {
  const res = await axios.put("/api/settings/language/", data);
  return res.data;
};

export const updateImage = async (formData: FormData) => {
  const res = await axios.patch('/api/settings/image/', formData);
  return res.data;
};

export const deleteImage = async () => {
  const res = await axios.delete('/api/settings/image/delete/');
  return res.data;
};