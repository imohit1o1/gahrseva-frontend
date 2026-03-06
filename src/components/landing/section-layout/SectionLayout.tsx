import type { ReactNode } from 'react';

interface SectionLayoutProps {
    children: ReactNode;
    className?: string;
}

export function SectionLayout({ children, className = '' }: SectionLayoutProps) {
    return (
        // Main Container
        <section className={`flex flex-col gap-10 py-8 sm:py-12 ${className}`}>
            {children}
        </section>
    );
}