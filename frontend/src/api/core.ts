import axios from '../lib/axios';

export const getPresignedUrl = async (data: any) => {
  const res = await axios.post('/api/core/s3/presign/', data);
  return res.data;
};

export const chatWithBot = (payload: {
  question: string;
  dialog_context: { role: string; content: string }[];
  language: string;
}) => axios.post("/api/animebot/chat/", payload);

export const clearChatContext = () => axios.post("/api/animebot/chat/clear/");

export const getAnimeRecommendation = async ({
  anime_titles,
  language,
  top_k = 3,
}: {
  anime_titles: string[];
  language?: string;
  top_k?: number;
}) => {
  const finalLanguage = language ?? "ko";

  const payload = {
    anime_titles,
    language: finalLanguage,
    top_k,
  };

  const res = await axios.post("/api/animebot/recommend/", payload);
  return res.data;
};

export const generateImage = async (prompt: string, usage_type: "comment" | "reply") => {
  const res = await axios.post('/api/animebot/generate-image/', { prompt, usage_type });
  return res.data;
};