import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';
import type { ApiResponse } from '../../types/apiResponse';
import type { ProviderAnalytics } from '../../types/provider';


export const useProviderAnalytics = () => {
    return useQuery({
        queryKey: ['provider', 'analytics'],
        queryFn: async () => {
            const { data } = await api.get<ApiResponse<ProviderAnalytics>>(ENDPOINTS.SERVICE_PROVIDER.ANALYTICS);
            return data;
        },
    });
};
