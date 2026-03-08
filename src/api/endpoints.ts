export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const API_PREFIX = '/api/v1';

export const ENDPOINTS = {
  HEALTH: `/health`,
  AUTH: {
    REGISTER: `${API_PREFIX}/auth/register`,
    REGISTER_SERVICE_PROVIDER: `${API_PREFIX}/auth/register/service-provider`,
    LOGIN: `${API_PREFIX}/auth/login`,
    LOGOUT: `${API_PREFIX}/auth/logout`,
    REFRESH_TOKEN: `${API_PREFIX}/auth/refresh-token`,
  },
  UPLOAD: {
    IMAGE: `${API_PREFIX}/upload/image`,
  },
  USER: {
    ANALYTICS: `${API_PREFIX}/user/analytics`,
    PROVIDERS: `${API_PREFIX}/service-provider/list`,
    PROVIDER_BY_ID: (id: string) => `${API_PREFIX}/service-provider/${id}`,
    BOOKINGS: `${API_PREFIX}/users/bookings`,
    BOOKING_BY_ID: (id: string) => `${API_PREFIX}/users/bookings/${id}`,
    CANCEL_BOOKING: (id: string) => `${API_PREFIX}/users/bookings/${id}/cancel`,
    RESCHEDULE_BOOKING: (id: string) => `${API_PREFIX}/users/bookings/${id}/reschedule`,
  },
  SERVICE_PROVIDER: {
    PROFILE: `${API_PREFIX}/service-provider/profile`,
    AVAILABILITY: `${API_PREFIX}/service-provider/profile/availability`,
    BOOKINGS: `${API_PREFIX}/service-provider/bookings`,
    BOOKING_BY_ID: (id: string) => `${API_PREFIX}/service-provider/bookings/${id}`,
    ACCEPT_BOOKING: (id: string) => `${API_PREFIX}/service-provider/bookings/${id}/accept`,
    REJECT_BOOKING: (id: string) => `${API_PREFIX}/service-provider/bookings/${id}/reject`,
    START_BOOKING: (id: string) => `${API_PREFIX}/service-provider/bookings/${id}/in-progress`,
    COMPLETE_BOOKING: (id: string) => `${API_PREFIX}/service-provider/bookings/${id}/complete`,
    CANCEL_BOOKING: (id: string) => `${API_PREFIX}/service-provider/bookings/${id}/cancel`,
    REVIEWS: `${API_PREFIX}/service-provider/reviews`,
    ANALYTICS: `${API_PREFIX}/service-provider/analytics`
  },
  CATEGORIES: {
    BASE: `${API_PREFIX}/service-categories`,
    BY_SLUG: (slug: string) => `${API_PREFIX}/service-categories/slug/${slug}`,
    BY_ID: (id: string) => `${API_PREFIX}/service-categories/${id}`,
  },
  ADMIN: {
    ANALYTICS: {
      OVERVIEW: `${API_PREFIX}/admin/analytics/overview`,
      BOOKING: `${API_PREFIX}/admin/analytics/booking`,
      REVENUE: `${API_PREFIX}/admin/analytics/revenue`,
      SERVICE_PROVIDER: `${API_PREFIX}/admin/analytics/service-providers`,
      USERS: `${API_PREFIX}/admin/analytics/users`,
    },
    USERS: {
      BASE: `${API_PREFIX}/admin/users`,
      BY_ID: (id: string) => `${API_PREFIX}/admin/users/${id}`,
      UPDATE: (id: string) => `${API_PREFIX}/admin/users/${id}`,
      DELETE: (id: string) => `${API_PREFIX}/admin/users/${id}`,
    },
    PROVIDERS: {
      BASE: `${API_PREFIX}/admin/service-providers`,
      BY_ID: (id: string) => `${API_PREFIX}/admin/service-providers/${id}`,
      APPROVE: (id: string) => `${API_PREFIX}/admin/service-providers/${id}/approve`,
      REJECT: (id: string) => `${API_PREFIX}/admin/service-providers/${id}/reject`,
    },
    CATEGORIES: {
      BASE: `${API_PREFIX}/admin/service-categories`,
      BULK: `${API_PREFIX}/admin/service-categories/bulk`,
      BY_ID: (id: string) => `${API_PREFIX}/admin/service-categories/${id}`,
    },
    REVIEWS: {
      BASE: `${API_PREFIX}/admin/reviews`,
      BY_ID: (id: string) => `${API_PREFIX}/admin/reviews/${id}`,
      HIDE: (id: string) => `${API_PREFIX}/admin/reviews/${id}/hide`,
      SHOW: (id: string) => `${API_PREFIX}/admin/reviews/${id}/show`,
      DELETE: (id: string) => `${API_PREFIX}/admin/reviews/${id}`,
    },
    BOOKINGS: {
      BASE: `${API_PREFIX}/admin/bookings`,
      BY_ID: (id: string) => `${API_PREFIX}/admin/bookings/${id}`,
    },
  }
} as const;
