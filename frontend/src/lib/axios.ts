import axios from "axios";

// ✅ .env 체크
const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) {
  throw new Error("API base URL is not defined in .env");
}

// ✅ axios 인스턴스 생성
const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;