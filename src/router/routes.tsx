import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";
import { RootLayout } from "./RootLayout";
import Home from "../pages/Home";
import ServiceProviders from "../pages/ServiceProviders";
import ServiceProviderDetails from "../pages/ServiceProviderDetails";
import ServiceProviderRegister from "../pages/ServiceProviderRegister";
import { AdminLayout, adminBeforeLoad } from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminProviders from "../pages/admin/AdminProviders";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminReviews from "../pages/admin/AdminReviews";
import { ServiceProviderLayout, serviceProviderBeforeLoad } from "../pages/service-provider/ServiceProviderLayout";
import ServiceProviderDashboard from "../pages/service-provider/ServiceProviderDashboard";
import ServiceProviderBookings from "../pages/service-provider/ServiceProviderBookings";
import { useAuthStore } from "../store/authStore";
import { serviceProvidersSearchSchema } from "../schemas/provider";

import { PublicLayout } from "./PublicLayout";

const rootRoute = createRootRoute({
    component: RootLayout,
});

const publicRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'public',
    component: PublicLayout,
});

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dashboard",
    beforeLoad: async () => {
        const auth = useAuthStore.getState();
        if (!auth.isAuthenticated) {
            throw redirect({ to: '/' });
        }
        if (auth.user?.role === 'admin') {
            throw redirect({ to: '/admin/dashboard' });
        }
        if (auth.user?.role === 'service_provider') {
            throw redirect({ to: '/service-provider/dashboard' });
        }
        // No dashboard for customers, redirect to home
        throw redirect({ to: '/' });
    }
});

const adminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/admin",
    component: AdminLayout,
    beforeLoad: adminBeforeLoad,
});

const serviceProviderRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/service-provider",
    component: ServiceProviderLayout,
    beforeLoad: serviceProviderBeforeLoad,
});

export const providerDetailsRoute = createRoute({
    getParentRoute: () => publicRoute,
    path: "/service-providers/$providerId",
    component: ServiceProviderDetails,
});

export const routeTree = rootRoute.addChildren([
    publicRoute.addChildren([
        createRoute({
            getParentRoute: () => publicRoute,
            path: "/",
            component: Home,
            beforeLoad: async () => {
                const auth = useAuthStore.getState();
                if (auth.isAuthenticated) {
                    if (auth.user?.role === 'admin') {
                        throw redirect({ to: '/admin/dashboard' });
                    }
                    if (auth.user?.role === 'service_provider') {
                        throw redirect({ to: '/service-provider/dashboard' });
                    }
                }
            }
        }),
        createRoute({
            getParentRoute: () => publicRoute,
            path: "/register/service-provider",
            component: ServiceProviderRegister,
        }),
        createRoute({
            getParentRoute: () => publicRoute,
            path: "/service-providers",
            component: ServiceProviders,
            validateSearch: (search) => serviceProvidersSearchSchema.parse(search),
        }),
        providerDetailsRoute,
    ]),
    dashboardRoute,
    adminRoute.addChildren([
        createRoute({
            getParentRoute: () => adminRoute,
            path: "/dashboard",
            component: AdminDashboard,
        }),
        createRoute({
            getParentRoute: () => adminRoute,
            path: "/users",
            component: AdminUsers,
        }),

        createRoute({
            getParentRoute: () => adminRoute,
            path: "/providers",
            component: AdminProviders,
        }),
        createRoute({
            getParentRoute: () => adminRoute,
            path: "/categories",
            component: AdminCategories,
        }),
        createRoute({
            getParentRoute: () => adminRoute,
            path: "/bookings",
            component: AdminBookings,
        }),
        createRoute({
            getParentRoute: () => adminRoute,
            path: "/reviews",
            component: AdminReviews,
        }),
    ]),
    serviceProviderRoute.addChildren([
        createRoute({
            getParentRoute: () => serviceProviderRoute,
            path: "/dashboard",
            component: ServiceProviderDashboard,
        }),
        createRoute({
            getParentRoute: () => serviceProviderRoute,
            path: "/bookings",
            component: ServiceProviderBookings,
        }),
    ]),
]);
