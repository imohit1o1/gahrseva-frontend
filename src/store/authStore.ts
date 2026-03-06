import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, AuthActions } from '../types/auth';

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            isAuthDialogOpen: false,
            authDialogView: 'login',

            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setToken: (token) => set({ token }),
            setLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),

            openAuthDialog: (view = 'login') => set({ isAuthDialogOpen: true, authDialogView: view }),
            closeAuthDialog: () => set({ isAuthDialogOpen: false, error: null }),
            setAuthDialogView: (view) => set({ authDialogView: view, error: null }),

            logout: () => set({ user: null, token: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
        }
    )
);
