import { useQuery } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../../api';
import type { ApiResponse } from '../../types/apiResponse';

export const useAdminBookings = () =>
    useQuery({
        queryKey: ['admin', 'bookings'],
        queryFn: async () => {
            const res = await api.get<ApiResponse<any>>(ENDPOINTS.ADMIN.BOOKINGS.BASE);
            return res.data;
        },
    });
