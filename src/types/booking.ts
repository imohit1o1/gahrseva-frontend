export interface Booking {
    _id: string;
    user_id: string;
    provider_id: string;
    category_id: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    scheduled_at: string;
    total_price: number;
    address: string;
    created_at: string;
}
