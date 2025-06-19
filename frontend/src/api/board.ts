import axios from '../lib/axios';

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

export const toggleBoardPostLike = async (postId: number) => {
  const res = await axios.post(`/api/boards/${postId}/like/`);
  return res.data;
};

export const getBoardComments = async (postId: number) => {
  const res = await axios.get(`/api/boards/${postId}/comments/`);
  return res.data;
};

export const addBoardComment = async (postId: number, data: any) => {
  const res = await axios.post(`/api/boards/${postId}/comments/`, data);
  return res.data;
};

export const toggleCommentLike = async (commentId: number) => {
  const res = await axios.post(`/api/boards/comments/${commentId}/like/`);
  return res.data;
};

export const deleteComment = async (postId: number, commentId: number) => {
  const res = await axios.delete(`/api/boards/${postId}/comments/${commentId}/`);
  return res.data;
};