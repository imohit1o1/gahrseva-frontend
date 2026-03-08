import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { api } from './axios';
import { API_BASE_URL, ENDPOINTS } from './endpoints';

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  if (token) {
    if (!config.headers) {
      config.headers = {} as any;
    }
    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    const status = error.response?.status;

    if (status !== 401 || originalRequest?._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        handleLogout();
        return Promise.reject(error);
      }

      const refreshResponse = await axios.post(
        `${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH_TOKEN}`,
        { token: refreshToken },
      );

      const newToken =
        // support either { data: { token } } or { token }
        // depending on how the backend wraps its payload
        (refreshResponse as any)?.data?.data?.token ??
        (refreshResponse as any)?.data?.token;

      if (!newToken) {
        handleLogout();
        return Promise.reject(error);
      }

      localStorage.setItem('token', newToken);

      if (!originalRequest.headers) {
        originalRequest.headers = {} as any;
      }
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api.request(originalRequest);
    } catch (refreshErr) {
      handleLogout();
      return Promise.reject(refreshErr);
    }
  },
);

export { api };

