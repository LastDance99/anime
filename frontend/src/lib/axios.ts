import axios from "axios";
import i18n from "i18next";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "../utils/token";

// .env에 따라 baseURL 구분
const env = import.meta.env.VITE_API_ACTIVE_ENV;
const baseURL =
  env === "COMPANY"
    ? import.meta.env.VITE_API_DEV_COMPANY
    : import.meta.env.VITE_API_DEV_HOME;

// 언어 설정 함수
const getLanguage = () => i18n.language?.split("-")[0] || "ko";

// 인터셉터 없는 인스턴스 (로그인/회원가입/refresh 용)
export const noAuthInstance = axios.create({ baseURL });
noAuthInstance.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers["Accept-Language"] = getLanguage();
  return config;
});

// 인터셉터 붙은 인스턴스 (모든 보호 API)
const instance = axios.create({ baseURL });
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = getLanguage();
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("refreshToken 없음");

        const res = await noAuthInstance.post(`/api/users/refresh/`, { refresh: refreshToken });
        if (res.data.refresh) setRefreshToken(res.data.refresh);
        setAccessToken(res.data.access, !!localStorage.getItem("accessToken"));
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return instance(originalRequest);
      } catch (refreshErr) {
        removeAccessToken();
        removeRefreshToken();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;