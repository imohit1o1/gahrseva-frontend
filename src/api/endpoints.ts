export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const API_PREFIX = '/api/v1';

export const ENDPOINTS = {
  HEALTH: `/health`,
  AUTH: {
    REGISTER: `${API_PREFIX}/auth/register`,
    LOGIN: `${API_PREFIX}/auth/login`,
    LOGOUT: `${API_PREFIX}/auth/logout`,
    REFRESH_TOKEN: `${API_PREFIX}/auth/refresh-token`,
  },
} as const;

