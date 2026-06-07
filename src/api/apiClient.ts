import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {accessTokenStorage} from "@/api/tokenStorage";
import {RefreshToken, Token} from "@/types/auth";
import {store} from '@/store'
import {logout} from '@/store/authorization/Slices/authorizationSlice';

const BASE_URL = 'https://easydev.club/api/v1/';

export const authApiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {'Content-Type': 'application/json'},

});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = accessTokenStorage.getToken();
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
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshTokenData = localStorage.getItem('refreshToken')
        const response = await authApiClient.post<Token, AxiosResponse<Token>, RefreshToken>('auth/refresh', { refreshToken: refreshTokenData });
        const { accessToken, refreshToken } = response.data;
        accessTokenStorage.setToken(accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessTokenStorage.getToken()}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError: unknown) {
        store.dispatch(logout())
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;