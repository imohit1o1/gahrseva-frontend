import { Outlet } from '@tanstack/react-router';
import { AuthDialog } from '../components/auth/AuthDialog';

export function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Outlet />
            <AuthDialog />
        </div>
    );
}

