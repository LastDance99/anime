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

interface AnimeReviewPayload {
  content: string;
  rating: number;
}

export const addAnimeReview = async (animeId: number, data: AnimeReviewPayload) => {
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
  try {
    const res = await axios.post(`/api/anime/${animeId}/review/${reviewId}/like/`);
    return res.data as {
      id: number;
      like_count: number;
      liked_by_user: boolean;
    };
  } catch (err: any) {
    console.error("🛑 likeAnimeReview error:", err.response?.data || err.message);
    throw err; // 에러를 다시 던져서 상위에서 처리되도록 유지
  }
};

export const rateAnime = async (animeId: number, data: any) => {
  const res = await axios.post(`/api/anime/${animeId}/rating/`, data);
  return res.data;
};

// POST - 리스트에 추가
export const addAnimeList = async (animeId: number) => {
  const res = await axios.post(`/api/anime/${animeId}/animelist/`, {
    anime_id: animeId, // 또는 필요한 필드
  });
  return res.data;
};

// DELETE - 리스트에서 제거
export const removeAnimeFromList = async (animeId: number) => {
  const res = await axios.delete(`/api/anime/${animeId}/animelist/`);
  return res.data;
};

export const animeProfileInfo = async () => {
  const res = await axios.get('/api/anime/animecount/');
  return res.data;
};