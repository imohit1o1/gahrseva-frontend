import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../../api';
import type { Category, CreateCategoryInput } from '../../types/admin/service';
import type { ApiResponse } from '../../types/apiResponse';

export const useAdminCategories = () => {
    const queryClient = useQueryClient();

    const fetchCategories = useQuery({
        queryKey: ['admin', 'categories'],
        queryFn: async () => {
            const res = await api.get<ApiResponse<Category[]>>(ENDPOINTS.ADMIN.CATEGORIES.BASE);
            return res.data;
        },
    });

    const createCategory = useMutation({
        mutationFn: async (data: CreateCategoryInput) => {
            const res = await api.post<ApiResponse<Category>>(ENDPOINTS.ADMIN.CATEGORIES.BASE, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
        },
    });

    const updateCategory = useMutation({
        mutationFn: async ({ _id, ...data }: Partial<Category> & { _id: string }) => {
            const res = await api.put<ApiResponse<Category>>(ENDPOINTS.ADMIN.CATEGORIES.BY_ID(_id), data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
        },
    });

    const deleteCategory = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete<ApiResponse<void>>(ENDPOINTS.ADMIN.CATEGORIES.BY_ID(id));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
        },
    });

    return {
        categories: fetchCategories.data,
        isLoading: fetchCategories.isLoading,
        error: fetchCategories.error,
        createCategory,
        updateCategory,
        deleteCategory,
    };
};
