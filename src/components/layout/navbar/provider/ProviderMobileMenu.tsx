import { Link } from '@tanstack/react-router';
import { Button } from '../../../ui/button';
import { PROVIDER_NAV_LINKS } from '../../../../constants';

interface ProviderMobileMenuProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    user: any;
    logout: () => void;
}

export function ProviderMobileMenu({ isOpen, setOpen, user, logout }: ProviderMobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="border-t border-border/60 bg-background px-4 pb-4 lg:hidden">
            <nav className="flex flex-col gap-1 pt-3">
                {PROVIDER_NAV_LINKS.map((link) => (
                    <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-primary/5 hover:text-primary [&.active]:bg-primary/10 [&.active]:text-primary"
                        activeOptions={{ exact: true }}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div className="mt-4 flex flex-col gap-3 p-4 rounded-2xl bg-accent/30 border border-border/40">
                <div className="flex items-center gap-3 mb-2">
                    <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary border border-primary/10">
                        {(user?.first_name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground">
                            {user?.first_name} {user?.last_name}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{user?.email}</span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { logout(); setOpen(false); }}
                    className="w-full rounded-xl font-bold border-destructive/20 text-destructive hover:bg-destructive/5"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
}
