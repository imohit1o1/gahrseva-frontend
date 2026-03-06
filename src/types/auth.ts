export interface User {
    _id: string;
    display_name: string;
    email: string;
    avatar: string;
    isProfileComplete?: boolean;
    profile_id?: string | null;
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
