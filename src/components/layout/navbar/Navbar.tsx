import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Link } from '@tanstack/react-router';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '../../ui/navigation-menu';
import { NAV_LINKS, SERVICES_MENU, LOGO } from '../../../constants';

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Left — Logo + Navigation */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex shrink-0 items-center">
                        <img
                            src={LOGO.full}
                            alt="GharSeva"
                            className="h-10 w-32 object-cover"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-2">
                                {/* Home */}
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            to="/"
                                            className="px-2 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-transparent hover:text-primary"
                                        >
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                {/* Services — with dropdown */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="px-2 py-1.5 text-sm font-medium text-foreground/70 bg-transparent hover:bg-transparent focus:bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary">
                                        Services
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[440px] grid-cols-2 gap-2 p-3">
                                            {SERVICES_MENU.map((service) => (
                                                <li key={service.label}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            to="/providers"
                                                            className="block rounded-md p-3 hover:bg-accent transition-colors"
                                                        >
                                                            <p className="text-sm font-medium text-foreground">
                                                                {service.label}
                                                            </p>
                                                            <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
                                                                {service.description}
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                {/* About + Contact */}
                                {NAV_LINKS.filter((l) => l.label !== 'Home' && l.label !== 'Services').map((link) => (
                                    <NavigationMenuItem key={link.label}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to="/"
                                                hash={link.href.replace('#', '')}
                                                className="px-2 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-transparent hover:text-primary"
                                            >
                                                {link.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Right — Actions */}
                <div className="hidden items-center gap-3 lg:flex">
                    <Button
                        size="sm"
                        className="bg-primary text-white hover:bg-primary/90 rounded-2xl font-black shadow-lg shadow-primary/20 transition-all hover:-translate-y-1.5"
                    >
                        Become a Provider
                    </Button>
                    <div className="h-4 w-px bg-border/60 mx-1" />
                    <Button variant="outline" size="sm">Sign In</Button>
                    <Button size="sm">Sign Up</Button>
                </div>

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
            {menuOpen && (
                <div className="border-t border-border/60 bg-background px-4 pb-4 lg:hidden">
                    <nav className="flex flex-col gap-1 pt-3">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href === '#' ? '/' : (link.href.startsWith('#') ? '/' : link.href)}
                                hash={link.href.startsWith('#') ? link.href.replace('#', '') : undefined}
                                onClick={() => setMenuOpen(false)}
                                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-accent hover:text-accent-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {/* Become a Provider mobile link */}
                        <Button
                            size="sm"
                            className="w-full bg-primary text-white hover:bg-primary/90 rounded-2xl font-black shadow-lg shadow-primary/20 transition-all active:scale-95"
                        >
                            Become a Provider
                        </Button>

                        {/* Services sub-links on mobile */}
                        <div className="mt-1 border-t border-border/40 pt-2">
                            <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Our Services
                            </p>
                            {SERVICES_MENU.map((service) => (
                                <Link
                                    key={service.label}
                                    to="/providers"
                                    onClick={() => setMenuOpen(false)}
                                    className="block rounded-md px-3 py-2 text-sm text-foreground/70 hover:bg-accent hover:text-accent-foreground"
                                >
                                    {service.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                    <div className="mt-4 flex flex-col gap-2">
                        <Button variant="outline" className="w-full">Sign In</Button>
                        <Button className="w-full">Sign Up</Button>
                    </div>
                </div>
            )}
        </header>
    );
}
