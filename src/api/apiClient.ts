import { router } from "../router";
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {RefreshToken, Token} from "../types/registration.ts";
import {message} from "antd";

const BASE_URL = 'https://easydev.club/api/v1/';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const currentRefreshToken = localStorage.getItem('refreshToken');

        if (!currentRefreshToken) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          message.error('Сессия истекла. Пожалуйста, войдите заново.');
          await router.navigate('/', { replace: true });
          return Promise.reject(new Error('No refresh token available'));
        }

        const response = await axios.post<Token, AxiosResponse<Token>, RefreshToken>( `${BASE_URL}auth/refresh`, {
          refreshToken: currentRefreshToken,
        });

        const { accessToken, refreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return apiClient(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        message.error('Сессия истекла. Пожалуйста, войдите заново.');
        await router.navigate('/', { replace: true });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;