import instance, { noAuthInstance } from "../lib/axios";

// --- 토큰 없이 요청하는 API (회원가입, 로그인, 토큰 재발급, 이메일 체크 등) ---

export const signup = async (data: any) => {
  const res = await noAuthInstance.post('/api/users/signup/', data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await noAuthInstance.post("/api/users/login/", data);
  const { access, refresh } = res.data;
  // (setAccessToken, setRefreshToken 헬퍼 사용 권장)
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
  return res.data;
};

export const refreshToken = async (data: { refresh: string }) => {
  const res = await noAuthInstance.post('/api/users/refresh/', data);
  return res.data;
};

export const checkEmail = async (email: string) => {
  const res = await noAuthInstance.get('/api/users/check-email/', { params: { email } });
  return res.data;
};

export const checkNickname = async (nickname: string) => {
  const res = await noAuthInstance.get('/api/users/check-nickname/', { params: { nickname } });
  return res.data;
};

export const requestEmailVerification = async (data: { email: string }) => {
  const res = await noAuthInstance.post('/api/users/email-verification/', data);
  return res.data;
};

export const confirmEmailVerification = async (data: { email: string, code: string }) => {
  const res = await noAuthInstance.post('/api/users/email-verification/confirm/', data);
  return res.data;
};

export const requestPasswordReset = async (data: { email: string }) => {
  const res = await noAuthInstance.post('/api/users/password-reset/', data);
  return res.data;
};

export const confirmPasswordReset = async (data: any) => {
  const res = await noAuthInstance.post('/api/users/password-reset/confirm/', data);
  return res.data;
};

export const changePassword = async (data: {
  current_password: string;
  new_password: string;
  new_password2: string;
}) => {
  const res = await instance.post("/api/users/password-change/", data);
  return res.data;
};

// --- 로그아웃 (토큰 필요, 보호된 API) ---
export const logout = async () => {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) throw new Error("❌ 로그아웃 실패: refresh 토큰이 없습니다.");
  try {
    // instance를 쓰면 자동으로 accessToken도 붙는다!
    const res = await instance.post("/api/users/logout/", { refresh });
    return res.data;
  } catch (err) {
    throw err;
  }
};