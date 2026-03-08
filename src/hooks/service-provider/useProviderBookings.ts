import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';
import type { ApiResponse } from '../../types/apiResponse';
import type { Booking } from '../../types/booking';
import { toast } from 'sonner';

export const useProviderBookings = (status?: string) => {
    return useQuery({
        queryKey: ['provider', 'bookings', status],
        queryFn: async () => {
            const params = status ? { status } : {};
            const { data } = await api.get<ApiResponse<{ bookings: Booking[], pagination: any }>>(
                ENDPOINTS.SERVICE_PROVIDER.BOOKINGS,
                { params }
            );
            return data; // Now returns { bookings: Booking[], pagination: any }
        },
    });
};

export const useUpdateBookingStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status, reason }: { id: string, status: string, reason?: string }) => {
            let endpoint;
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
                reason ? { cancel_reason: reason } : {}
            );
            return data;
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['provider', 'bookings'] });
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
