import { useQuery } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../api';
import type { ApiResponse } from '../types/apiResponse';
import type { Category } from '../types/admin/service';

export const useCategories = () => {
    const fetchCategories = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await api.get<ApiResponse<Category[]>>(ENDPOINTS.CATEGORIES.BASE);
            return res.data;
        },
    });

    const getCategoryBySlug = (slug: string) => {
        return useQuery({
            queryKey: ['categories', 'slug', slug],
            queryFn: async () => {
                const res = await api.get<ApiResponse<Category>>(ENDPOINTS.CATEGORIES.BY_SLUG(slug));
                return res.data;
            },
            enabled: !!slug,
        });
    };

    return {
        categories: fetchCategories.data,
        isLoading: fetchCategories.isLoading,
        error: fetchCategories.error,
        getCategoryBySlug,
    };
};
