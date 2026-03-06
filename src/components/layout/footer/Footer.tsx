import { FooterTop } from './FooterTop';
import { FooterBottom } from './FooterBottom';

export function Footer() {
    return (
        <footer className="relative border-t border-border/60 bg-linear-to-b from-primary/5 to-transparent overflow-hidden">
            {/* Glowing highlight */}
            <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-y-1/2 bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
                <FooterTop />
                <FooterBottom />
            </div>
        </footer>
    );
}
