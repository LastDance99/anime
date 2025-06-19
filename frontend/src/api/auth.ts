import axios from '../lib/axios';

export const signup = async (data: any) => {
  const res = await axios.post('/api/users/signup/', data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post("/api/users/login/", data);
  const { access, refresh } = res.data;

  // ✅ 로컬스토리지에 토큰 저장
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);

  return res.data;
};

export const logout = async () => {
  const refresh = localStorage.getItem("refreshToken");

  console.log("🧪 [LOGOUT 요청] refreshToken:", refresh);

  if (!refresh) {
    throw new Error("❌ 로그아웃 실패: refresh 토큰이 없습니다.");
  }

  try {
    const res = await axios.post(
      "/api/users/logout/",
      { refresh },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ 로그아웃 성공", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ 로그아웃 요청 실패", err);
    throw err;
  }
};

export const refreshToken = async (data: any) => {
  const res = await axios.post('/api/users/refresh/', data);
  return res.data;
};

export const checkEmail = async (email: string) => {
  const res = await axios.get('/api/users/check-email/', { params: { email } });
  return res.data;
};

export const checkNickname = async (nickname: string) => {
  const res = await axios.get('/api/users/check-nickname/', { params: { nickname } });
  return res.data;
};

export const requestPasswordReset = async (data: any) => {
  const res = await axios.post('/api/users/password-reset/', data);
  return res.data;
};

export const confirmPasswordReset = async (data: any) => {
  const res = await axios.post('/api/users/password-reset/confirm/', data);
  return res.data;
};

export const changePassword = async (data: {
  current_password: string;
  new_password: string;
  new_password2: string;
}) => {
  const res = await axios.post("/api/users/password-change/", data);
  return res.data;
};

export const requestEmailVerification = async (data: { email: string }) => {
  const res = await axios.post('/api/users/email-verification/', data);
  return res.data;
};

export const confirmEmailVerification = async (data: any) => {
  const res = await axios.post('/api/users/email-verification/confirm/', data);
  return res.data;
};