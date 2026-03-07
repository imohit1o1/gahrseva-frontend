import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../../api';
import type { ApiResponse } from '../../types/apiResponse';

export const useAdminProviders = () => {
    const queryClient = useQueryClient();

    const fetchProviders = useQuery({
        queryKey: ['admin', 'providers'],
        queryFn: async () => {
            const res = await api.get<ApiResponse<any[]>>(ENDPOINTS.ADMIN.PROVIDERS.BASE);
            return res.data;
        },
    });

    const approveProvider = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.put<ApiResponse<any>>(ENDPOINTS.ADMIN.PROVIDERS.APPROVE(id));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'providers'] });
        },
    });

    const rejectProvider = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.put<ApiResponse<any>>(ENDPOINTS.ADMIN.PROVIDERS.REJECT(id));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'providers'] });
        },
    });

    return {
        providers: fetchProviders.data,
        isLoading: fetchProviders.isLoading,
        error: fetchProviders.error,
        approveProvider,
        rejectProvider,
    };
};
