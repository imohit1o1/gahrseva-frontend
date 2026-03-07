import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../../../hooks/useAuth';
import { NavLogo } from '../NavLogo';
import { ProviderNavActions } from './ProviderNavActions';
import { ProviderDesktopNav } from './ProviderDesktopNav';
import { ProviderMobileMenu } from './ProviderMobileMenu';

export function ProviderNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Left — Logo + Provider Desktop Navigation */}
                <div className="flex items-center gap-8">
                    <NavLogo />
                    <ProviderDesktopNav />
                </div>

                {/* Right — Provider Profile Actions */}
                <ProviderNavActions
                    user={user}
                    logout={logout}
                />

                {/* Mobile — Hamburger */}
                <button
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Toggle menu"
                    className="inline-flex items-center justify-center rounded-md p-2 text-foreground/70 hover:bg-accent lg:hidden"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Provider Mobile menu */}
            <ProviderMobileMenu
                isOpen={menuOpen}
                setOpen={setMenuOpen}
                user={user}
                logout={logout}
            />
        </header>
    );
}
