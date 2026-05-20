import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError} from 'axios';
import {RefreshToken, Token} from "../types/registration.ts";
import {message} from "antd";

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://easydev.club/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

let accessToken: string | null = null;

export const setInMemoryToken = (token: string | null) => {
  accessToken = token;
};

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const currentRefreshToken = localStorage.getItem('refreshToken');

      if (!currentRefreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post<Token, AxiosResponse<Token>, RefreshToken>('https://easydev.club/api/v1/auth/refresh', { refreshToken: currentRefreshToken });
        const { accessToken, refreshToken } = response.data;
        setInMemoryToken(accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        const { store } = await import('../store');
        const { updateToken } = await import('../store/loginSlice.ts');
        store.dispatch(updateToken(response.data));

        return apiClient(originalRequest);
      } catch (refreshError: unknown) {
        const { store } = await import('../store');
        const { logout } = await import('../store/loginSlice.ts');
        store.dispatch(logout());
        setInMemoryToken(null);
        message.error('Сессия истекла. Пожалуйста, войдите заново.');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;