import axios from '../lib/axios';

export const getMyProfile = async () => {
  const res = await axios.get('/api/profiles/me/overview/');
  return res.data;
};

export const getUserProfile = async (userId: number) => {
  const res = await axios.get(`/api/profiles/${userId}/overview/`);
  return res.data;
};

export const getUserProfileByNickname = async (nickname: string) => {
  const encodedNickname = encodeURIComponent(nickname);
  const res = await axios.get(`/api/profiles/${encodedNickname}/overview/`);
  return res.data;
};

export const updateAbout = async (data: any) => {
  const res = await axios.put('/api/profiles/me/about/', data);
  return res.data;
};

export const getUserComments = async (userId: number) => {
  const res = await axios.get(`/api/profiles/${userId}/comments/`);
  return res.data.results;
};

export const deleteUserComment = async (userId: number, pk: number) => {
  const res = await axios.delete(`/api/profiles/${userId}/comments/${pk}/`);
  return res.data;
};

export const getUserActivity = async (userId: number) => {
  const res = await axios.get(`/api/profiles/${userId}/activity/`);
  return res.data;
};

export const getAnimeListStats = async (userId: number) => {
  const res = await axios.get(`/api/profiles/${userId}/animelist-stats/`);
  return res.data;
};

export const getAttendanceStats = async (userId: number) => {
  const res = await axios.get(`/api/profiles/${userId}/attendance-stats/`);
  return res.data;
};

export const getFavoriteAnimes = async (userId: number) => {
  const res = await axios.get(`/api/profiles/${userId}/favorite-animes/`);
  return res.data;
};

export const toggleFavoriteAnime = async (animeId: number) => {
  const res = await axios.post(`/api/profiles/${animeId}/favorite/`);
  return res.data;
};

export const getUserContent = async (userId: number) => {
  const res = await axios.get(`/api/profiles/${userId}/content/`);
  return res.data;
};