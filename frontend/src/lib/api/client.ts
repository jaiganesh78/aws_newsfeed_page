import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

export function validateApiBaseUrl() {
  if (!apiBaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not configured. Add it to your frontend environment, for example NEXT_PUBLIC_API_BASE_URL=http://localhost:3000.",
    );
  }
}

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  validateApiBaseUrl();

  return config;
});
