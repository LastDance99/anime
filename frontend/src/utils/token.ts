export function setAccessToken(token: string, keep: boolean) {
  if (keep) {
    localStorage.setItem("accessToken", token);
    sessionStorage.removeItem("accessToken");
  } else {
    sessionStorage.setItem("accessToken", token);
    localStorage.removeItem("accessToken");
  }
}
export function getAccessToken() {
  return localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
}
export function removeAccessToken() {
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessToken");
}

// refreshToken은 항상 localStorage에만 저장 (권장)
export function setRefreshToken(token: string) {
  localStorage.setItem("refreshToken", token);
}
export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}
export function removeRefreshToken() {
  localStorage.removeItem("refreshToken");
}
