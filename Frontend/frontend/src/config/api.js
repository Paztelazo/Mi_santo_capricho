export const API_BASE = import.meta.env.VITE_API_URL || "http://192.168.211.130:4000";

export function apiUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}
