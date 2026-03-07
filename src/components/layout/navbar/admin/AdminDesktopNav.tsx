import { Link } from '@tanstack/react-router';
import { ADMIN_NAV_LINKS } from '../../../../constants';

export function AdminDesktopNav() {
    return (
        <div className="hidden lg:flex items-center gap-1">
            {ADMIN_NAV_LINKS.map((link) => (
                <Link
                    key={link.label}
                    to={link.href}
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-foreground/70 hover:text-primary hover:bg-primary/5 [&.active]:bg-primary/10 [&.active]:text-primary"
                    activeOptions={{ exact: true }}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
