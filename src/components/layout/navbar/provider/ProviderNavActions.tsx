import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import { LogOut } from 'lucide-react';

interface ProviderNavActionsProps {
    user: any;
    logout: () => void;
}

export function ProviderNavActions({ user, logout }: ProviderNavActionsProps) {
    return (
        <div className="hidden items-center gap-3 lg:flex">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-1 py-1 rounded-full outline-none hover:bg-accent transition-colors">
                        <div className="size-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white border border-primary/10">
                            {(user?.first_name || 'U').charAt(0).toUpperCase()}
                        </div>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-2xl">
                    <DropdownMenuItem
                        onClick={logout}
                        className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                    >
                        <LogOut size={14} />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
