import axios from '../lib/axios';

export const searchAnime = async (params: any) => {
  const res = await axios.get('/api/anime/search/', { params });
  return res.data;
};

export const getAnimeFilterMeta = async (lang = "ko") => {
  const res = await axios.get('/api/anime/filters/', { params: { lang } });
  return res.data;
};

export const getAnimeDetail = async (animeId: number) => {
  const res = await axios.get(`/api/anime/${animeId}/`);
  return res.data;
};

export const getAnimeReviews = async (animeId: number) => {
  const res = await axios.get(`/api/anime/${animeId}/review/`);
  return res.data;
};

export const addAnimeReview = async (animeId: number, data: any) => {
  const res = await axios.post(`/api/anime/${animeId}/review/`, data);
  return res.data;
};

export const updateAnimeReview = async (animeId: number, reviewId: number, data: any) => {
  const res = await axios.put(`/api/anime/${animeId}/review/${reviewId}/`, data);
  return res.data;
};

export const deleteAnimeReview = async (animeId: number, reviewId: number) => {
  const res = await axios.delete(`/api/anime/${animeId}/review/${reviewId}/`);
  return res.data;
};

export const likeAnimeReview = async (animeId: number, reviewId: number) => {
  const res = await axios.post(`/api/anime/${animeId}/review/${reviewId}/like/`);
  return res.data;
};

export const rateAnime = async (animeId: number, data: any) => {
  const res = await axios.post(`/api/anime/${animeId}/rating/`, data);
  return res.data;
};

// POST - 리스트에 추가
export const toggleAnimeList = async (animeId: number) => {
  const res = await axios.post(`/api/anime/${animeId}/animelist/`);
  return res.data;
};

// DELETE - 리스트에서 제거
export const removeAnimeFromList = async (animeId: number) => {
  const res = await axios.delete(`/api/anime/${animeId}/animelist/`);
  return res.data;
};