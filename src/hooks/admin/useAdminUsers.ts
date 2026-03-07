import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../../api';
import type { User } from '../../types/auth';
import type { ApiResponse } from '../../types/apiResponse';

export interface AdminUsersResponse {
    users: User[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    }
}

export const useAdminUsers = () =>
    useQuery({
        queryKey: ['admin', 'users'],
        queryFn: async () => {
            const res = await api.get<ApiResponse<AdminUsersResponse>>(ENDPOINTS.ADMIN.USERS.BASE);
            return res.data;
        },
    });

export const useUpdateAdminUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, data }: { userId: string, data: Partial<User> }) => {
            const res = await api.put<ApiResponse<User>>(ENDPOINTS.ADMIN.USERS.UPDATE(userId), data);
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
            queryClient.invalidateQueries({ queryKey: ['adminUserProfile', variables.userId] });
        },
    });
};

export const useDeleteAdminUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId: string) => {
            const res = await api.delete<ApiResponse<void>>(ENDPOINTS.ADMIN.USERS.DELETE(userId));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
        },
    });
};
