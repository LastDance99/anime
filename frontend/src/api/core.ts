import axios from '../lib/axios';

export const getPresignedUrl = async (data: any) => {
  const res = await axios.post('/api/core/s3/presign/', data);
  return res.data;
};

export const chatWithBot = (payload: {
  question: string;
  dialog_context: { role: string; content: string }[];
}) => axios.post("/api/animebot/chat/", payload);

export const clearChatContext = () => axios.post("/api/animebot/chat/clear/");