export type UserRole = 'admin' | 'service_provider' | 'customer' | 'user';

export interface User {
    _id: string;
    display_name: string;
    email: string;
    avatar?: string | null;
    role: UserRole;
    is_approved?: boolean;
    isProfileComplete?: boolean;
    profileComplete?: boolean;
    profile_id?: string | null;
    first_name?: string;
    last_name?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    area?: string;
    pincode?: string;

    // Service Provider specific fields
    category_id?: string;
    base_price?: number;
    experience?: number;
    description?: string;
    is_available?: boolean;
    is_featured?: boolean;
    approved_by?: string;
    approved_at?: string;
    category?: {
        _id: string;
        name: string;
        slug: string;
        image: string;
        sortOrder: number;
        isActive: boolean;
        isFeatured: boolean;
        description: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };

    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    isAuthDialogOpen: boolean;
    authDialogView: 'login' | 'register';
}

export interface AuthActions {
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    openAuthDialog: (view?: 'login' | 'register') => void;
    closeAuthDialog: () => void;
    setAuthDialogView: (view: 'login' | 'register') => void;
    logout: () => void;
}
