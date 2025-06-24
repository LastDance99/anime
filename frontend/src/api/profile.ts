import axios from '../lib/axios';

type ContentType = "post" | "gallery" | "anime";

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
  const res = await axios.patch('/api/profiles/me/about/', data);
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

interface AttendanceStats {
  total_attendance: number;
  last_attendance: string | null; // 출석 안한 경우 null일 수도 있으니
}

export const getAttendanceStats = async (userId: number): Promise<AttendanceStats> => {
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


interface GetUserContentParams {
  userId: number;
  type: "post" | "gallery" | "anime";
  page?: number;
  q?: string;
  order?: string;
  // 애니메이션 전용 필터
  year?: string;
  genres?: string;
  season?: string;
  format?: string;
  source?: string;
  status?: string;
}

export const getUserContent = async (params: GetUserContentParams) => {
  const {
    userId, type, page, q, order,
    year, genres, season, format, source,
    status, 
  } = params;

  const query = new URLSearchParams();
  query.append("type", type);
  if (page) query.append("page", String(page));
  if (q) query.append("q", q);
  if (order) query.append("ordering", order);
  if (year) query.append("year", year);
  if (genres) query.append("genres", genres);
  if (season) query.append("season", season);
  if (format) query.append("format", format);
  if (source) query.append("source", source);
  if (status) query.append("status", status);

  const res = await axios.get(`/api/profiles/${userId}/content/?${query.toString()}`);
  return res.data;
};