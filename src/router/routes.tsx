import { createRootRoute, createRoute } from "@tanstack/react-router";
import { RootLayout } from "./RootLayout";
import Home from "../pages/Home";
import ServiceProviders from "../pages/ServiceProviders";
import ServiceProviderRegister from "../pages/ServiceProviderRegister";

const rootRoute = createRootRoute({
    component: RootLayout,
});

export const routeTree = rootRoute.addChildren([
    createRoute({
        getParentRoute: () => rootRoute,
        path: "/",
        component: Home,
    }),
    createRoute({
        getParentRoute: () => rootRoute,
        path: "/register/service-provider",
        component: ServiceProviderRegister,
    }),
    createRoute({
        getParentRoute: () => rootRoute,
        path: "/service-providers",
        component: ServiceProviders,
    }),
]);
