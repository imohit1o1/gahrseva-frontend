import { useAuthStore } from '../store/authStore';
import { ENDPOINTS } from '../api/endpoints';
import { api } from '../api/axios';
import { useNavigate } from '@tanstack/react-router';

export const useAuth = () => {
    const store = useAuthStore();
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        store.setLoading(true);
        store.setError(null);
        try {
            const response: any = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password });

            const serverResponse = response.data || response;
            const payload = serverResponse.data || serverResponse;

            // Extract user and token robustly
            const user = payload.user || (payload.email || payload._id ? payload : null);
            const token = payload.token || serverResponse.token || null;
            const refreshToken = payload.refreshToken || serverResponse.refreshToken || null;

            store.setUser(user);
            store.setToken(token);

            if (token) localStorage.setItem('token', token);
            if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

            store.setLoading(false);
            store.closeAuthDialog();

            if (user?.role === 'admin') {
                navigate({ to: '/admin/dashboard' });
            } else if (user?.role === 'service_provider') {
                navigate({ to: '/service-provider/dashboard' });
            }
        } catch (err: any) {
            store.setError(err.response?.data?.message || 'Login failed');
            store.setLoading(false);
        }
    };

    const register = async (email: string, password: string) => {
        store.setLoading(true);
        store.setError(null);
        try {
            const response: any = await api.post(ENDPOINTS.AUTH.REGISTER, {
                email,
                password
            });

            const serverResponse = response.data || response;
            const payload = serverResponse.data || serverResponse;

            const user = payload.user || (payload.email || payload._id ? payload : null);
            const token = payload.token || serverResponse.token || null;
            const refreshToken = payload.refreshToken || serverResponse.refreshToken || null;

            store.setUser(user);
            store.setToken(token);

            if (token) localStorage.setItem('token', token);
            if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

            store.setLoading(false);
            store.closeAuthDialog();

            if (user?.role === 'admin') {
                navigate({ to: '/admin/dashboard' });
            } else if (user?.role === 'service_provider') {
                navigate({ to: '/service-provider/dashboard' });
            }
        } catch (err: any) {
            store.setError(err.response?.data?.message || 'Registration failed');
            store.setLoading(false);
        }
    };

    const registerServiceProvider = async (data: any) => {
        store.setLoading(true);
        store.setError(null);
        try {
            const response: any = await api.post(ENDPOINTS.AUTH.REGISTER_SERVICE_PROVIDER, data);

            const serverResponse = response.data || response;
            const payload = serverResponse.data || serverResponse;

            const user = payload.user || (payload.email || payload._id ? payload : null);
            const token = payload.token || serverResponse.token || null;
            const refreshToken = payload.refreshToken || serverResponse.refreshToken || null;

            store.setUser(user);
            store.setToken(token);

            if (token) localStorage.setItem('token', token);
            if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

            store.setLoading(false);
            store.closeAuthDialog();
            return { success: true };
        } catch (err: any) {
            store.setError(err.response?.data?.message || 'Service provider registration failed');
            store.setLoading(false);
            return { success: false, error: err.response?.data?.message };
        }
    };

    const logout = async () => {
        try {
            await api.post(ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
            console.error('Logout request failed:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            store.logout();
            navigate({ to: '/' });
        }
    };

    return {
        ...store,
        login,
        register,
        registerServiceProvider,
        logout,
    };
};
