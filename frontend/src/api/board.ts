import axios from 'axios';

export const getBoardPosts = async () => {
  const res = await axios.get('/api/boards/');
  return res.data;
};

export const createBoardPost = async (data: any) => {
  const res = await axios.post('/api/boards/', data);
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