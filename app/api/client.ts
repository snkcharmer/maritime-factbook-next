import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from '@/app/auth/utils/localStorage';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post('/auth/refresh', { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = data;
          setTokens(accessToken, newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch {
          clearTokens();
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
