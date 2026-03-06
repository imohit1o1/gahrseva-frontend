import { Link } from '@tanstack/react-router';
import { Button } from '../../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '../../ui/dropdown-menu';
import { CTA, PROFILE_DROPDOWN } from '../../../constants';

interface NavActionsProps {
    isAuthenticated: boolean;
    user: any;
    logout: () => void;
    openAuthDialog: (view?: 'login' | 'register') => void;
}

export function NavActions({ isAuthenticated, user, logout, openAuthDialog }: NavActionsProps) {
    if (!isAuthenticated) {
        return (
            <div className="hidden items-center gap-3 lg:flex">
                <Link to={CTA[0].href}>
                    <Button
                        size="sm"
                        className="bg-primary text-white hover:bg-primary/90 rounded-2xl font-black shadow-lg shadow-primary/20 transition-all hover:-translate-y-1.5"
                    >
                        {CTA[0].label}
                    </Button>
                </Link>
                <div className="h-4 w-px bg-border/60 mx-1" />
                <Button variant="outline" size="sm" onClick={() => openAuthDialog('login')}>Sign In</Button>
                <Button size="sm" onClick={() => openAuthDialog('register')}>Sign Up</Button>
            </div>
        );
    }

    return (
        <div className="hidden items-center gap-3 lg:flex">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-1 py-1 rounded-full outline-none hover:bg-accent transition-colors">
                        <div className="size-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white border border-primary/10">
                            {(user?.display_name || 'U').charAt(0).toUpperCase()}
                        </div>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-2xl">
                    {PROFILE_DROPDOWN.map((item, index) => (
                        <div key={item.label}>
                            <DropdownMenuItem
                                onClick={item.label === 'Logout' ? logout : undefined}
                                asChild={item.label !== 'Logout'}
                                className={item.variant === 'destructive' ? "flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer" : "flex items-center gap-2 cursor-pointer"}
                            >
                                {item.label === 'Logout' ? (
                                    <>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </>
                                ) : (
                                    <Link to={item.href} className="flex items-center gap-2 w-full">
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                )}
                            </DropdownMenuItem>
                            {index === 0 && <DropdownMenuSeparator />}
                        </div>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
