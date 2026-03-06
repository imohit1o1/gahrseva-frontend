import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { NavLogo } from './NavLogo';
import { DesktopNav } from './DesktopNav';
import { NavActions } from './NavActions';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, user, logout, openAuthDialog } = useAuth();

    return (
        <header className="top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Left — Logo + Desktop Navigation */}
                <div className="flex items-center gap-8">
                    <NavLogo />
                    <DesktopNav />
                </div>

                {/* Right — Desktop Actions */}
                <NavActions
                    isAuthenticated={isAuthenticated}
                    user={user}
                    logout={logout}
                    openAuthDialog={openAuthDialog}
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

            {/* Mobile menu */}
            <MobileMenu
                isOpen={menuOpen}
                setOpen={setMenuOpen}
                isAuthenticated={isAuthenticated}
                user={user}
                logout={logout}
                openAuthDialog={openAuthDialog}
            />
        </header>
    );
}
