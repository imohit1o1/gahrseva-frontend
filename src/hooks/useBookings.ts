import { useQuery } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../api';
import type { ApiResponse } from '../types/apiResponse';
import type {
  CustomerBookingStatus,
  CustomerBookingsResponse,
} from '../types/customerBooking';

export interface UseBookingsParams {
  page: number;
  limit: number;
  status?: CustomerBookingStatus;
}

export function useBookings(params: UseBookingsParams) {
  const { page, limit, status } = params;

  return useQuery({
    queryKey: ['user', 'bookings', { page, limit, status }],
    queryFn: async (): Promise<CustomerBookingsResponse> => {
      const params: { page: number; limit: number; status?: CustomerBookingStatus } = {
        page,
        limit,
      };
      if (status != null) {
        params.status = status;
      }
      // The Axios response interceptor already unwraps `response → response.data`,
      // so `res` is the full API response body: { success, message, data: { bookings, pagination } }
      const res = await api.get<ApiResponse<CustomerBookingsResponse>>(
        ENDPOINTS.USER.BOOKINGS,
        { params }
      ) as unknown as ApiResponse<CustomerBookingsResponse>;
      const payload = res.data;
      return {
        bookings: payload?.bookings ?? [],
        pagination: payload?.pagination ?? { page: 1, limit: 10, total: 0, total_pages: 1 },
      };
    },
  });
}
