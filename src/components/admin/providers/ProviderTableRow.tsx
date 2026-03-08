import { Loader2, CheckCircle2, XCircle, Briefcase, IndianRupee, Eye, ShieldCheck, Clock, Star, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { TableCell, TableRow } from "../../ui/table";
import { Checkbox } from "../../ui/checkbox";
import { Badge } from "../../ui/badge";
import type { ServiceProvider } from '../../../types/provider';
import { Button } from "../../ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../ui/alert-dialog";

interface ProviderTableRowProps {
    provider: ServiceProvider;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    onView: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    isApproving: boolean;
    isRejecting: boolean;
    isDeleting: boolean;
}

export function ProviderTableRow({
    provider,
    onApprove,
    onReject,
    onView,
    onEdit,
    onDelete,
    isApproving,
    isRejecting,
    isDeleting
}: ProviderTableRowProps) {
    const isPending = !provider.is_approved;

    return (
        <TableRow className="hover:bg-muted/30 transition-colors border-0 group">
            <TableCell className="px-6 py-4 h-auto w-14">
                <Checkbox aria-label={`Select ${provider.user_id?.display_name || 'Provider'}`} />
            </TableCell>

            {/* Provider Info Column (Merged Avatar, Name, Email) */}
            <TableCell className="px-6 py-4 h-auto">
                <div className="flex items-center gap-3">
                    {provider.avatar ? (
                        <div className="size-10 rounded-xl bg-muted ring-1 ring-border/50 overflow-hidden shrink-0 shadow-sm transition-transform group-hover:scale-105">
                            <img src={provider.avatar} alt={provider.user_id?.display_name} className="size-full object-cover" />
                        </div>
                    ) : (
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs uppercase shrink-0">
                            {provider.user_id?.display_name?.charAt(0) || 'P'}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm line-clamp-1">
                            {provider.user_id?.display_name}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium line-clamp-1 lowercase leading-none">
                            {provider.user_id?.email}
                        </span>
                    </div>
                </div>
            </TableCell>

            {/* Category Column */}
            <TableCell className="px-6 py-4 h-auto whitespace-nowrap">
                <span className="text-xs font-bold text-foreground">
                    {provider.category_id?.name}
                </span>
            </TableCell>

            {/* Price Column */}
            <TableCell className="px-6 py-4 h-auto whitespace-nowrap">
                <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-primary/10 border border-primary/20 w-fit">
                    <IndianRupee size={12} className="text-primary" strokeWidth={3} />
                    <span className="text-sm font-black text-primary tracking-tight">
                        {provider.base_price}
                    </span>
                </div>
            </TableCell>

            {/* Exp Column */}
            <TableCell className="px-6 py-4 h-auto whitespace-nowrap">
                <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-muted border border-muted/60 w-fit">
                    <Briefcase size={10} className="text-muted-foreground" strokeWidth={3} />
                    <span className="text-xs font-black text-muted-foreground tracking-tight">
                        {provider.experience} Years
                    </span>
                </div>
            </TableCell>

            {/* Availability Column */}
            <TableCell className="px-6 py-4 h-auto">
                {provider.is_available ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none rounded-full h-6 text-[9px] font-black uppercase tracking-widest px-2.5">
                        Available
                    </Badge>
                ) : (
                    <Badge className="bg-muted text-muted-foreground/60 border-none rounded-full h-6 text-[9px] font-black uppercase tracking-widest px-2.5">
                        Busy
                    </Badge>
                )}
            </TableCell>

            {/* Featured Column */}
            <TableCell className="px-6 py-4 h-auto">
                {provider.is_featured ? (
                    <Badge className="bg-amber-500/10 text-amber-600 border-none rounded-full h-6 text-[9px] font-black uppercase tracking-widest px-2.5 flex items-center gap-1">
                        <Star size={10} fill="currentColor" strokeWidth={3} />
                        Featured
                    </Badge>
                ) : (
                    <span className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-widest px-2.5">
                        Standard
                    </span>
                )}
            </TableCell>

            {/* Status Column */}
            <TableCell className="px-6 py-4 h-auto">
                <div className="flex flex-wrap gap-1.5">
                    {provider.is_approved ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-none rounded-full h-6 text-[9px] font-black uppercase tracking-widest px-2.5 flex items-center gap-1">
                            <ShieldCheck size={10} strokeWidth={3} />
                            Verified
                        </Badge>
                    ) : (
                        <Badge className="bg-orange-500/10 text-orange-600 border-none rounded-full h-6 text-[9px] font-black uppercase tracking-widest px-2.5 flex items-center gap-1">
                            <Clock size={10} strokeWidth={3} />
                            Pending
                        </Badge>
                    )}
                </div>
            </TableCell>

            {/* Actions Column */}
            <TableCell className="px-6 py-4 text-right h-auto">
                <div className="flex items-center justify-end gap-1.5">
                    {isPending ? (
                        <>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => onView(provider._id)}
                                className="size-8 text-primary/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                title="View Details"
                            >
                                <Eye size={16} />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => onApprove(provider._id)}
                                disabled={isApproving}
                                className="size-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 rounded-lg transition-all"
                                title="Approve Provider"
                            >
                                {isApproving ? <Loader2 size={14} className="animate-spin text-emerald-500" /> : <CheckCircle2 size={16} />}
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => onReject(provider._id)}
                                disabled={isRejecting}
                                className="size-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                                title="Reject Provider"
                            >
                                {isRejecting ? <Loader2 size={14} className="animate-spin text-destructive" /> : <XCircle size={16} />}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => onEdit(provider._id)}
                                className="size-8 text-blue-500/80 hover:text-blue-600 hover:bg-blue-500/10 rounded-lg transition-all"
                                title="Edit Provider"
                            >
                                <Edit2 size={16} />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => onView(provider._id)}
                                className="size-8 text-primary/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                                title="View Details"
                            >
                                <Eye size={16} />
                            </Button>
                        </>
                    )}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="size-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all disabled:opacity-30"
                                title="Delete Provider"
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Trash2 size={16} />
                                )}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-3xl p-0 overflow-hidden border-none shadow-2xl max-w-[380px]">
                            <div className="bg-destructive/5 px-5 py-5">
                                <AlertDialogHeader className="space-y-2">
                                    <AlertDialogTitle className="text-base font-black tracking-tight flex items-center gap-2 text-destructive">
                                        <AlertCircle size={18} strokeWidth={2.5} />
                                        Delete Provider?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-xs font-medium leading-relaxed text-muted-foreground/80">
                                        Are you sure you want to delete <span className="text-foreground font-bold">"{provider.user_id?.display_name}"</span>?
                                        This action cannot be undone and will permanently remove this provider from the system.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                            </div>
                            <AlertDialogFooter className="p-3 flex items-center justify-end gap-2 bg-background border-t border-border/40">
                                <AlertDialogCancel className="rounded-xl font-bold border-none bg-muted/50 hover:bg-muted h-9 px-4 mt-0 text-[11px]">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete(provider._id)}
                                    className="rounded-xl font-black bg-destructive hover:bg-destructive/90 text-white h-9 px-5 shadow-lg shadow-destructive/20 transition-all active:scale-95 text-[11px]"
                                >
                                    Delete Now
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </TableCell>
        </TableRow>
    );
}
