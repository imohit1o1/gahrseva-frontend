export interface ServiceProvider {
    _id: string;
    user_id: {
        _id: string;
        display_name: string;
        email: string;
        isProfileComplete: boolean;
    };
    category_id: {
        _id: string;
        name: string;
        slug: string;
    };
    category?: {
        _id: string;
        name: string;
        slug: string;
    };
    city: string;
    area: string;
    pincode: string;
    base_price: number;
    experience: number;
    avatar: string;
    description: string;
    is_available: boolean;
    is_featured: boolean;
    is_approved: boolean;
    rating?: number;
    reviews?: number;
    approved_by?: {
        _id: string;
        display_name: string;
        email: string;
    } | null;
    approved_at?: string | null;
    createdAt: string;
    updatedAt: string;
    __v?: number;
    analytics?: ProviderAnalytics;
}

export interface ProviderAnalytics {
    totalBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    pendingBookings: number;
    activeBookings: number;
    totalRevenue: number;
    averageRating: number | null;
    totalReviews: number;
    bookingsByMonth: any[];
}
