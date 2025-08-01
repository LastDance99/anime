import axios from '../lib/axios';
import instance from "../lib/axios"; 

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

export const addUserComment = async (
  userId: number,
  content: string
) => {
  const res = await axios.post(
    `/api/profiles/${userId}/comments/`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return res.data;
};

export const getUserAttendance = async (
  userId: number,
  summary: boolean = true
): Promise<{
  dates: string[];
  total_attendance: number;
  last_attendance: string | null;
}> => {
  const res = await axios.get(`/api/profiles/${userId}/attendance/`, {
    params: { summary },
  });
  return res.data;
};

export const getGenreStats = async (userId: number, limit?: number) => {
  const url = limit
    ? `/api/profiles/${userId}/genre-stats/?limit=${limit}`
    : `/api/profiles/${userId}/genre-stats/`;
  const res = await instance.get(url);
  return res.data;
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

export const getUserActivities = async (urlOrUserId: string | number) => {
  const url = typeof urlOrUserId === "string"
    ? urlOrUserId
    : `/api/profiles/${urlOrUserId}/activity/?page=1`;

  const res = await axios.get(url);
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

export const toggleFavoriteAnime = async (animeId: number, isFavorite: boolean) => {
  return axios.patch(`/api/profiles/${animeId}/favorite/`, {
    is_favorite: isFavorite,
  });
};

interface GetUserContentParams {
  userId: number;
  type: "post" | "gallery" | "anime";
  page?: number;
  q?: string;
  ordering?: string;
  // 애니메이션 전용 필터
  year?: string;
  genres?: string;
  season?: string;
  media_format?: string;
  source?: string;
  status?: string;
  page_size?: number;
}

export const getUserContent = async (params: GetUserContentParams) => {
  const {
    userId, type, page, q, ordering,
    year, genres, season, media_format, source,
    status, 
  } = params;

  const query = new URLSearchParams();
  query.append("type", type);
  if (page) query.append("page", String(page));
  if (q) query.append("q", q);
  if (ordering) query.append("ordering", ordering);
  if (year) query.append("year", year);
  if (genres) query.append("genres", genres);
  if (season) query.append("season", season);
  if (media_format) query.append("media_format", media_format);
  if (source) query.append("source", source);
  if (status) query.append("status", status);

  const res = await axios.get(`/api/profiles/${userId}/content/?${query.toString()}`);
  return res.data;
};