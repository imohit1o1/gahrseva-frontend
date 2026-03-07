import { useQuery } from '@tanstack/react-query';
import { api, ENDPOINTS } from '../../api';
import type { ApiResponse } from '../../types/apiResponse';

export interface UserProfileData {
    _id: string;
    user_id: string;
    firstName: string;
    lastName: string;
    city: string;
    area: string;
    pincode: string;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export const useAdminUserProfile = (userId: string) => {
    return useQuery({
        queryKey: ['adminUserProfile', userId],
        queryFn: async () => {
            const res = await api.get<ApiResponse<UserProfileData>>(
                ENDPOINTS.ADMIN.USERS.BY_ID(userId)
            );

            return res.data;
        },
        enabled: !!userId,
    });
};
