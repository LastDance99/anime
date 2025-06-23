import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "../utils/token";

const env = import.meta.env.VITE_API_ACTIVE_ENV;
const baseURL =
  env === "COMPANY"
    ? import.meta.env.VITE_API_DEV_COMPANY
    : import.meta.env.VITE_API_DEV_HOME;

const instance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// ✅ 요청마다 accessToken 부착
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ accessToken 만료 시 refresh 자동 갱신
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("refreshToken 없음");

        const res = await axios.post(`${baseURL}/api/users/refresh/`, {
          refresh: refreshToken,
        });

        // ✅ 디버깅 로그: 응답에 refresh가 같이 오는지 확인
        console.log("🧪 /refresh/ 응답:", res.data);

        if (res.data.refresh) {
          console.log("📌 새 refreshToken도 발급됨 → ROTATE_REFRESH_TOKENS = True");
          setRefreshToken(res.data.refresh); // 새 refresh도 저장
        } else {
          console.log("📌 accessToken만 발급됨 → ROTATE_REFRESH_TOKENS = False");
        }

        const newAccessToken = res.data.access;
        setAccessToken(newAccessToken, !!localStorage.getItem("accessToken")); // keepLogin 여부에 따라 저장 위치 결정

        // 원래 요청에 새 토큰 부착 후 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshErr) {
        console.error("❌ 토큰 재발급 실패", refreshErr);
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login"; // 자동 로그아웃 처리
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;