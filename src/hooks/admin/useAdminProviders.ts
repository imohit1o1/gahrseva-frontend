import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../../api';
import type { ApiResponse } from '../../types/apiResponse';
import type { ServiceProvider } from '../../types/provider';
import { toast } from 'sonner';

export const useAdminProviders = () => {
    const queryClient = useQueryClient();

    const fetchProviders = useQuery({
        queryKey: ['admin', 'providers'],
        queryFn: async () => {
            const res = await api.get<ApiResponse<{ providers: ServiceProvider[], pagination: any }>>(ENDPOINTS.ADMIN.PROVIDERS.BASE);
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
            toast.success('Provider Approved', {
                description: 'The service provider has been successfully verified.'
            });
        },
        onError: () => {
            toast.error('Approval Failed', {
                description: 'Could not approve the provider. Please try again.'
            });
        }
    });

    const rejectProvider = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.put<ApiResponse<any>>(ENDPOINTS.ADMIN.PROVIDERS.REJECT(id));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'providers'] });
            toast.success('Provider Rejected', {
                description: 'The service provider registration has been rejected.'
            });
        },
        onError: () => {
            toast.error('Rejection Failed', {
                description: 'Could not reject the provider. Please try again.'
            });
        }
    });

    const deleteProvider = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete<ApiResponse<any>>(ENDPOINTS.ADMIN.PROVIDERS.BY_ID(id));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'providers'] });
            toast.success('Provider Deleted', {
                description: 'The service provider has been permanently removed.'
            });
        },
        onError: () => {
            toast.error('Deletion Failed', {
                description: 'Could not delete the provider. Please try again.'
            });
        }
    });

    return {
        providers: fetchProviders.data?.providers,
        pagination: fetchProviders.data?.pagination,
        isLoading: fetchProviders.isLoading,
        error: fetchProviders.error,
        approveProvider,
        rejectProvider,
        deleteProvider,
    };
};
