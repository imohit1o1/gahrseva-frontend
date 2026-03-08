import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';
import type { ApiResponse } from '../../types/apiResponse';
import type { Booking } from '../../types/booking';
import { toast } from 'sonner';

export const useProviderBookings = (params: { status?: string, page?: number, limit?: number } = {}) => {
    return useQuery({
        queryKey: ['provider', 'bookings', params],
        queryFn: async () => {
            const { data } = await api.get<ApiResponse<{ bookings: Booking[], pagination: any }>>(
                ENDPOINTS.SERVICE_PROVIDER.BOOKINGS,
                { params }
            );
            return data;
        },
    });
};

export const useProviderBookingById = (id: string) => {
    return useQuery({
        queryKey: ['provider', 'booking', id],
        queryFn: async () => {
            const { data } = await api.get<ApiResponse<Booking>>(
                ENDPOINTS.SERVICE_PROVIDER.BOOKING_BY_ID(id)
            );
            return data;
        },
        enabled: !!id
    });
};

export const useUpdateBookingStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status, reason, before_image, after_image }: { id: string, status: string, reason?: string, before_image?: string, after_image?: string }) => {
            let endpoint;
            let body: any = {};

            if (reason) body.cancel_reason = reason;
            if (before_image) body.before_image = before_image;
            if (after_image) body.after_image = after_image;

            switch (status) {
                case 'accepted': endpoint = ENDPOINTS.SERVICE_PROVIDER.ACCEPT_BOOKING(id); break;
                case 'rejected': endpoint = ENDPOINTS.SERVICE_PROVIDER.REJECT_BOOKING(id); break;
                case 'in_progress': endpoint = ENDPOINTS.SERVICE_PROVIDER.START_BOOKING(id); break;
                case 'completed': endpoint = ENDPOINTS.SERVICE_PROVIDER.COMPLETE_BOOKING(id); break;
                case 'cancelled': endpoint = ENDPOINTS.SERVICE_PROVIDER.CANCEL_BOOKING(id); break;
                default: throw new Error(`Invalid status: ${status}`);
            }

            const { data } = await api.patch<ApiResponse<Booking>>(
                endpoint,
                body
            );
            return data;
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['provider', 'bookings'] });
            if (variables.id) {
                queryClient.invalidateQueries({ queryKey: ['provider', 'booking', variables.id] });
            }
            toast.success('Booking Status Updated', {
                description: `The booking status was successfully updated to ${variables.status}.`
            });
        },
        onError: (error: any) => {
            toast.error('Update Failed', {
                description: error?.response?.data?.message || 'We encountered an error while updating the booking status.'
            });
        }
    });
};
