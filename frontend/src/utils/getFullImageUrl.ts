const S3_BASE_URL = import.meta.env.VITE_S3_BASE_URL;

export function getFullImageUrl(path?: string | null) {
  if (typeof path !== "string" || !path) return "";
  if (path.startsWith("http")) return path;

  return `${S3_BASE_URL}/${path.replace(/^\//, "")}`;
}