import { createRootRoute, createRoute } from "@tanstack/react-router";
import { RootLayout } from "./RootLayout";
import Home from "../pages/Home";
import Providers from "../pages/Providers";

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
        path: "/providers",
        component: Providers,
    }),
]);
