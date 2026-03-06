import { FooterTop } from './FooterTop';
import { FooterBottom } from './FooterBottom';

export function Footer() {
    return (
        <footer className="border-t border-border/60 bg-background">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <FooterTop />
                <FooterBottom />
            </div>
        </footer>
    );
}
