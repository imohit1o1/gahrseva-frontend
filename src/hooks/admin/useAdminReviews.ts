import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../../api';
import type { ApiResponse } from '../../types/apiResponse';

export interface Review {
    _id: string;
    user_id: string;
    provider_id: string;
    rating: number;
    comment: string;
    is_hidden: boolean;
    created_at: string;
}

export const useAdminReviews = () => {
    const queryClient = useQueryClient();

    const fetchReviews = useQuery({
        queryKey: ['admin', 'reviews'],
        queryFn: async () => {
            const res = await api.get<ApiResponse<Review[]>>(ENDPOINTS.ADMIN.REVIEWS.BASE);
            return res.data;
        },
    });

    const hideReview = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.patch<ApiResponse<Review>>(ENDPOINTS.ADMIN.REVIEWS.HIDE(id));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] });
        },
    });

    const showReview = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.patch<ApiResponse<Review>>(ENDPOINTS.ADMIN.REVIEWS.SHOW(id));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] });
        },
    });

    const deleteReview = useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete<ApiResponse<void>>(ENDPOINTS.ADMIN.REVIEWS.DELETE(id));
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] });
        },
    });

    return {
        reviews: fetchReviews.data,
        isLoading: fetchReviews.isLoading,
        error: fetchReviews.error,
        hideReview,
        showReview,
        deleteReview,
    };
};
