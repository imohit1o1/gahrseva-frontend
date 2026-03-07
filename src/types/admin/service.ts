export interface Category {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
    sortOrder: number;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CreateCategoryInput {
    name: string;
    slug?: string;
    image: string;
    description: string;
    sortOrder: number;
    isActive?: boolean;
    isFeatured?: boolean;
}

export interface ServiceProvider {
    _id: string;
    user_id: string;
    business_name: string;
    description?: string;
    base_price: number;
    experience_years: number;
    rating: number;
    review_count: number;
    is_verified: boolean;
    is_available: boolean;
    categories: string[]; // Category IDs
    created_at: string;
}

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
