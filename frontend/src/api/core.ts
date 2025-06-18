import axios from 'axios';

export const getPresignedUrl = async (data: any) => {
  const res = await axios.post('/api/core/s3/presign/', data);
  return res.data;
};