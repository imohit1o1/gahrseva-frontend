import { Outlet, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../../store/authStore';
import { SectionLayout } from '../../components/landing/section-layout/SectionLayout';
import { ProviderNavbar } from '../../components/layout/navbar/provider/ProviderNavbar';

export function ServiceProviderLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-muted/30">
            <ProviderNavbar />
            <main className="flex-1 pb-16 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionLayout>
                    <Outlet />
                </SectionLayout>
            </main>
        </div>
    );
}

// Helper to protect routes
export const serviceProviderBeforeLoad = async ({ location }: { location: any }) => {
    const auth = useAuthStore.getState();
    // Role for service provider is usually 'provider'
    if (!auth.isAuthenticated || auth.user?.role !== 'service_provider') {
        throw redirect({
            to: '/',
            search: {
                redirect: location.href,
            },
        });
    }
};
