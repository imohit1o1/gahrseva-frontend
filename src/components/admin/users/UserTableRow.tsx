import { Mail, Loader2, BadgeCheck, Clock, Edit2, Trash2 } from 'lucide-react';
import type { User } from '../../../types/auth';
import { TableCell, TableRow } from "../../ui/table";
import { Checkbox } from "../../ui/checkbox";
import { Badge } from "../../ui/badge";

interface UserTableRowProps {
    user: User;
    onEdit: (userId: string) => void;
    onDelete: (userId: string) => void;
    isDeleting: boolean;
}

export function UserTableRow({ user, onEdit, onDelete, isDeleting }: UserTableRowProps) {
    const emailPrefix = user.email ? user.email.split('@')[0] : '';
    const displayName = user.display_name?.trim() || emailPrefix || 'Anonymous User';
    const initial = (user.display_name?.trim() || emailPrefix || 'A').charAt(0).toUpperCase();

    return (
        <TableRow key={user._id} className="hover:bg-muted/30 transition-colors border-0">
            <TableCell className="px-6 py-4 h-auto">
                <Checkbox aria-label={`Select ${displayName}`} />
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrank-0">
                    {initial}
                </div>
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground truncate">
                    <Mail size={14} className="shrink-0" />
                    <span className="truncate">{user.email || 'N/A'}</span>
                </div>
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                <span className="font-bold text-foreground text-sm truncate">{displayName}</span>
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                <span className="text-sm font-medium">
                    {user.city || <span className="text-muted-foreground italic text-xs">N/A</span>}
                </span>
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                <span className="text-sm font-medium">
                    {user.area || <span className="text-muted-foreground italic text-xs">N/A</span>}
                </span>
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                <span className="text-sm font-mono font-medium">
                    {user.pincode || <span className="text-muted-foreground italic text-xs">N/A</span>}
                </span>
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                <div className="flex flex-col items-start gap-1.5">
                    {user.profileComplete ? (
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-black rounded-full border-0">
                            <BadgeCheck size={12} className="mr-1" />
                            Completed
                        </Badge>
                    ) : (
                        <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-black rounded-full border-0">
                            <Clock size={12} className="mr-1" />
                            Pending
                        </Badge>
                    )}
                </div>
            </TableCell>
            <TableCell className="px-6 py-4 text-right h-auto">
                <div className="flex items-center justify-end gap-1">
                    <button
                        onClick={() => onEdit(user._id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary"
                        title="Edit User"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(user._id)}
                        disabled={isDeleting}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-destructive disabled:opacity-30"
                        title="Delete User"
                    >
                        {isDeleting ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Trash2 size={16} />
                        )}
                    </button>
                </div>
            </TableCell>
        </TableRow>
    );
}
