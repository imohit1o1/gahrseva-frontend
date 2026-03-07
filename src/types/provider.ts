export interface ServiceProvider {
    _id: string;
    user_id: {
        _id: string;
        display_name: string;
        email: string;
    };
    category_id: {
        _id: string;
        name: string;
        slug: string;
    };
    city: string;
    area: string;
    pincode: string;
    base_price: number;
    experience: number;
    avatar?: string;
    description: string;
    is_available: boolean;
    is_featured: boolean;
    is_approved: boolean;
    approved_by?: {
        _id: string;
        display_name: string;
        email: string;
    } | null;
    approved_at?: string | null;
    createdAt: string;
    updatedAt: string;
}
