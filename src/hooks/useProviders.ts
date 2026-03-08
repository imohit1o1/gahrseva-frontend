import { useQuery } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../api';
import type { ApiResponse } from '../types/apiResponse';
import type { ServiceProvider } from '../types/provider';
import type { ServiceProvidersSearch } from '../schemas/provider';

interface ProvidersListResponse {
    providers: ServiceProvider[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
}

export const useProviders = (filters: Partial<ServiceProvidersSearch> = {}) => {
    return useQuery<ApiResponse<ProvidersListResponse>>({
        queryKey: ['providers', filters],
        queryFn: async () => {
            const res = await api.get<ApiResponse<ProvidersListResponse>>(ENDPOINTS.USER.PROVIDERS, {
                params: filters,
            });
            return res;
        },
    });
};

export const useProvider = (id: string) => {
    return useQuery({
        queryKey: ['providers', id],
        queryFn: async () => {
            const res = await api.get<ApiResponse<ServiceProvider>>(ENDPOINTS.USER.PROVIDER_BY_ID(id));
            return res.data;
        },
        enabled: !!id,
    });
};
