import { useQuery } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../../api';
import type { AdminAnalyticsResponse } from '../../types/admin/analytics';
import type { ApiResponse } from '../../types/apiResponse';

export const useAdminAnalytics = () =>
    useQuery({
        queryKey: ['admin', 'analytics', 'overview'],
        queryFn: async () => {
            const res = await api.get<ApiResponse<AdminAnalyticsResponse>>(ENDPOINTS.ADMIN.ANALYTICS.OVERVIEW);
            return res.data;
        },
    });
