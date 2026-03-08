export interface BookingAddress {
    city?: string;
    area?: string;
    pincode?: string;
}

export interface Booking {
    _id: string;
    user_id: {
        _id: string;
        display_name: string;
        email: string;
        phone?: string;
    };
    user_profile_id: string;
    service_provider_id: string;
    address?: BookingAddress;
    schedule_at: string;
    before_image?: string | null;
    after_image?: string | null;
    price: number;
    status: 'requested' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'accepted' | 'rejected';
    cancel_reason?: string;
    createdAt: string;
    updatedAt: string;
}
