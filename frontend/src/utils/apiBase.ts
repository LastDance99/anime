type ApiEnv = "COMPANY" | "HOME";

const API_ENV_MAP: Record<ApiEnv, string> = {
  COMPANY: import.meta.env.VITE_API_DEV_COMPANY,
  HOME: import.meta.env.VITE_API_DEV_HOME,
};

function getApiBaseUrl() {
  const env = (import.meta.env.VITE_API_ACTIVE_ENV || "COMPANY") as ApiEnv;
  return API_ENV_MAP[env] || API_ENV_MAP.COMPANY;
}

export const API_BASE_URL = getApiBaseUrl();