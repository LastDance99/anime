import axios from '../lib/axios';
import i18n from "i18next";

export const searchAnime = async (params: any) => {
  const res = await axios.get('/api/anime/search/', { params });
  return res.data;
};


export const getAnimeFilterMeta = async () => {
  const lang = i18n.language || "ko";
  const res = await axios.get('/api/anime/filters/', { params: { lang } });
  return res.data;
};

export const getAnimeDetail = async (animeId: number, lang = i18n.language || "ko") => {
  const res = await axios.get(`/api/anime/${animeId}/`, { params: { lang } });
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
    throw err;
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

export interface AnimeRankingItem {
  id: number;
  title: string;
  cover_image_l: string;
  total_animelist_users: number;
  favorite_count: number;
  avg_rating: number;
  popularity_score: number;
  // 필요한 경우 다른 필드도 추가
}

export const getPopularAnimeRanking = async (limit = 10, lang = i18n.language || "ko"): Promise<AnimeRankingItem[]> => {
  const res = await axios.get(`/api/anime/rankings/popular/?limit=${limit}&lang=${lang}`);
  console.log("popular 응답", res.data);
  return Array.isArray(res.data) ? res.data : res.data.results;
};

export const getUpcomingAnimeRanking = async (limit = 10, lang = i18n.language || "ko"): Promise<AnimeRankingItem[]> => {
  const res = await axios.get(`/api/anime/rankings/upcoming/?limit=${limit}&lang=${lang}`);
  return Array.isArray(res.data) ? res.data : res.data.results;
};