import { Outlet } from '@tanstack/react-router';
import { Navbar } from '../components/layout/navbar/Navbar';
import { Footer } from '../components/layout/footer/Footer';

export function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
