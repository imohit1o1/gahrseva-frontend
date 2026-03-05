import type { ReactNode } from 'react';
import { Navbar } from '../components/navbar/Navbar';
import { Footer } from '../components/footer/Footer';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col ">
            <Navbar />
            <main className="flex-1 py-16 w-full mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">{children}</main>
            <Footer />
        </div>
    );
}
