import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../../api';
import type { ApiResponse } from '../../types/apiResponse';
import type { ServiceProvider } from '../../types/provider';

interface UpdateProviderInput {
    firstname?: string;
    lastname?: string;
    description?: string;
    base_price?: number;
    experience?: number;
    city?: string;
    area?: string;
    pincode?: string;
    is_available?: boolean;
    is_featured?: boolean;
}

export const useAdminProviderDetail = (id: string | null) => {
    const queryClient = useQueryClient();

    const fetchProvider = useQuery({
        queryKey: ['admin', 'providers', id],
        queryFn: async () => {
            if (!id) return null;
            const res = await api.get<ApiResponse<ServiceProvider>>(ENDPOINTS.ADMIN.PROVIDERS.BY_ID(id));
            return res.data;
        },
        enabled: !!id,
    });

    const updateProvider = useMutation({
        mutationFn: async (input: UpdateProviderInput) => {
            if (!id) throw new Error('No provider ID');
            const res = await api.put<ApiResponse<any>>(ENDPOINTS.ADMIN.PROVIDERS.BY_ID(id), input);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'providers'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'providers', id] });
        },
    });

    return {
        provider: fetchProvider.data,
        isLoading: fetchProvider.isLoading,
        error: fetchProvider.error,
        updateProvider,
    };
};
