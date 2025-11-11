import axios from 'axios';
import { API_CONFIG, HTTP_STATUS, STORAGE_KEYS, ROUTES } from '@/constants';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

api.interceptors.request.use((config) => {
  try {
    const authStorage = localStorage.getItem(STORAGE_KEYS.AUTH_STORAGE);
    if (authStorage) {
      const auth = JSON.parse(authStorage);
      if (auth?.state?.token) {
        config.headers.Authorization = `Bearer ${auth.state.token}`;
      }
    }
  } catch (error) {
    console.error('Failed to get token from storage:', error);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      const isAuthEndpoint = error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register');
      const hasToken = error.config?.headers?.Authorization;
      
      if (!isAuthEndpoint && hasToken) {
        localStorage.removeItem(STORAGE_KEYS.AUTH_STORAGE);
        window.location.href = ROUTES.LOGIN;
      }
    }
    return Promise.reject(error);
  }
);

export default api;

