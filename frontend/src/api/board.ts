import axios from '../lib/axios';
import instance from '../lib/axios'
import type { BoardComment } from '../types/comment'
import type { BoardItem} from '../types/board'

export const getBoardPosts = async (params?: {
  page?: number;
  keyword?: string;
  sort?: string;
  type?: string;
  minLikes?: number;
}) => {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", params.page.toString());
  if (params?.keyword) query.append("search", params.keyword);
  if (params?.sort) query.append("sort", params.sort);
  if (params?.type) query.append("type", params.type); // post/gallery
  if (params?.minLikes) query.append("like_gte", String(params.minLikes));

  const res = await axios.get(`/api/boards/?${query.toString()}`);
  return res.data;
};

export const createBoardPost = async (data: {
  board_type: "post" | "gallery";
  title: string;
  content: string;
}) => {
  const res = await axios.post("/api/boards/", data);
  return res.data;
};

export const getBoardPostDetail = async (postId: number) => {
  const res = await axios.get(`/api/boards/${postId}/`);
  return res.data;
};

export const updateBoardPost = async (postId: number, data: any) => {
  const res = await axios.put(`/api/boards/${postId}/`, data);
  return res.data;
};

export const deleteBoardPost = async (postId: number) => {
  const res = await axios.delete(`/api/boards/${postId}/`);
  return res.data;
};

export const addBoardPostLike = async (postId: number) => {
  const res = await axios.post(`/api/boards/${postId}/like/`);
  return res.data;
};

export const removeBoardPostLike = async (postId: number) => {
  const res = await axios.delete(`/api/boards/${postId}/like/`);
  return res.data;
};

export const getBoardComments = async (
  postId: number,
  sort: "latest" | "like" | "created" = "latest"
): Promise<{ count: number; results: BoardComment[] }> => {
  const res = await axios.get(`/api/boards/${postId}/comments/?sort=${sort}`);
  return res.data;
};

export const addBoardComment = async (
  postId: number,
  data: { content: string; parent_id?: number; tagged_nickname?: string }
) => {
  const res = await axios.post(`/api/boards/${postId}/comments/`, data);
  return res.data;
};

export const toggleCommentLike = async (commentId: number) => {
  try {
    const res = await axios.post(`/api/boards/comments/${commentId}/like/`);
    return { liked: true }; // 성공시
  } catch (err: any) {
    if (err.response?.status === 400) {
      return { liked: false }; // 이미 눌렀음
    }
    throw err;
  }
};

export const deleteComment = async (postId: number, commentId: number) => {
  const res = await axios.delete(`/api/boards/${postId}/comments/${commentId}/`);
  return res.data;
};

export const boardsProfileInfo = async () => {
  const res = await axios.get('/api/boards/postcount/');
  return res.data;
};


// 공지글
export const getBoardNotices = async (limit = 3): Promise<BoardItem[]> => {
  const res = await instance.get(`/api/boards/notices/?limit=${limit}`);
  return Array.isArray(res.data) ? res.data : res.data.results;
};

// 오늘의 인기글 (조회수/좋아요/댓글순 등 order 파라미터 가능)
export const getBoardPopular = async (limit = 5, order = "views"): Promise<BoardItem[]> => {
  const res = await instance.get(`/api/boards/popular/?limit=${limit}&order=${order}`);
  return Array.isArray(res.data) ? res.data : res.data.results;
};

// 추천글
export const getBoardRecommend = async (limit = 5): Promise<BoardItem[]> => {
  const res = await instance.get(`/api/boards/recommend/?limit=${limit}`);
  return Array.isArray(res.data) ? res.data : res.data.results;
};