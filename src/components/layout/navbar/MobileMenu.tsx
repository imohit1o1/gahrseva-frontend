import { Link } from '@tanstack/react-router';
import { Button } from '../../ui/button';
import { NAV_LINKS, CATEGORIES_MENU, CTA, PROFILE_DROPDOWN } from '../../../constants';

interface MobileMenuProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    isAuthenticated: boolean;
    user: any;
    logout: () => void;
    openAuthDialog: (view?: 'login' | 'register') => void;
}

export function MobileMenu({ isOpen, setOpen, isAuthenticated, user, logout, openAuthDialog }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="border-t border-border/60 bg-background px-4 pb-4 lg:hidden">
            <nav className="flex flex-col gap-1 pt-3">
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.label}
                        to={link.href === '#' ? '/' : (link.href.startsWith('#') ? '/' : link.href)}
                        hash={link.href.startsWith('#') ? link.href.replace('#', '') : undefined}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-accent hover:text-accent-foreground"
                    >
                        {link.label}
                    </Link>
                ))}

                {/* Categories sub-links on mobile - Grouped */}
                <div className="mt-1 border-t border-border/40 pt-2">
                    {CATEGORIES_MENU.map((group) => (
                        <div key={group.title} className="mb-4">
                            <p className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary/60">
                                {group.title}
                            </p>
                            {group.items.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-md px-3 py-2 text-sm text-foreground/70 hover:bg-accent hover:text-accent-foreground font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </nav>

            {!isAuthenticated ? (
                <div className="mt-4 flex flex-col gap-2">
                    <Link to={CTA[0].href} onClick={() => setOpen(false)}>
                        <Button
                            size="sm"
                            className="w-full bg-primary text-white hover:bg-primary/90 rounded-2xl font-black shadow-lg shadow-primary/20 transition-all active:scale-95"
                        >
                            {CTA[0].label}
                        </Button>
                    </Link>
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => { openAuthDialog('login'); setOpen(false); }}>Sign In</Button>
                        <Button className="flex-1" onClick={() => { openAuthDialog('register'); setOpen(false); }}>Sign Up</Button>
                    </div>
                </div>
            ) : (
                <div className="mt-4 flex flex-col gap-3 p-4 rounded-2xl bg-accent/30 border border-border/40">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary border border-primary/10">
                            {(user?.display_name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">{user?.display_name || 'User'}</span>
                            <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{user?.email}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        {PROFILE_DROPDOWN.map((item) => (
                            <div key={item.label} className="w-full">
                                {item.label === 'Logout' ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => { logout(); setOpen(false); }}
                                        className="w-full rounded-xl font-bold border-destructive/20 text-destructive hover:bg-destructive/5"
                                    >
                                        {item.icon}
                                        <span className="ml-2">{item.label}</span>
                                    </Button>
                                ) : (
                                    <Link to={item.href} onClick={() => setOpen(false)} className="w-full">
                                        <Button size="sm" className="w-full bg-primary text-black rounded-xl font-bold shadow-md shadow-primary/10">
                                            {item.icon}
                                            <span className="ml-2">{item.label}</span>
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
