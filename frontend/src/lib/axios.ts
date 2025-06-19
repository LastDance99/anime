import axios from "axios";

const env = import.meta.env.VITE_API_ACTIVE_ENV;

const baseURL =
  env === "COMPANY"
    ? import.meta.env.VITE_API_DEV_COMPANY
    : import.meta.env.VITE_API_DEV_HOME;

if (!baseURL) {
  throw new Error("API base URL이 설정되지 않았습니다.");
}

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 요청 인터셉터: accessToken 자동 부착
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터: accessToken 만료 시 refreshToken으로 재발급 후 재요청
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료 + 아직 재시도 안 한 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("refreshToken 없음");

        const res = await axios.post(`${baseURL}/api/users/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        // Authorization 헤더 다시 설정
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 원래 요청 재시도
        return instance(originalRequest);
      } catch (refreshErr) {
        console.error("❌ 토큰 재발급 실패", refreshErr);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // 로그아웃 처리
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;