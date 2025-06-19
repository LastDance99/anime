import { API_BASE_URL } from "./apiBase";

export function getFullImageUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path}`;
}