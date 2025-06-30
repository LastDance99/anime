// lib/axios.ts
import axios from "axios";
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

// 인터셉터 없는 인스턴스 (로그인/회원가입/refresh 용)
export const noAuthInstance = axios.create({ baseURL });

// 인터셉터 붙은 인스턴스 (모든 보호 API)
const instance = axios.create({ baseURL });

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

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("refreshToken 없음");

        // noAuthInstance로 호출!
        const res = await noAuthInstance.post(`/api/users/refresh/`, { refresh: refreshToken });
        if (res.data.refresh) setRefreshToken(res.data.refresh);
        setAccessToken(res.data.access, !!localStorage.getItem("accessToken"));
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return instance(originalRequest);
      } catch (refreshErr) {
        removeAccessToken();
        removeRefreshToken();
        // window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;