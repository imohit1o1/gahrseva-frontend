import { Calendar, MapPin, IndianRupee, Loader2, CheckCircle2, XCircle, Clock, PlayCircle } from 'lucide-react';
import type { Booking } from '../../../types/booking';
import { TableCell, TableRow } from "../../ui/table";
import { Badge } from "../../ui/badge";
import { cn } from "../../../lib/utils";

interface BookingTableRowProps {
    booking: Booking;
    onUpdateStatus: (id: string, status: string) => void;
    isUpdating: boolean;
}

const statusConfig: Record<string, { label: string, color: string, bg: string, icon: any }> = {
    requested: { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-500/10', icon: Clock },
    accepted: { label: 'Accepted', color: 'text-blue-600', bg: 'bg-blue-500/10', icon: CheckCircle2 },
    confirmed: { label: 'Confirmed', color: 'text-indigo-600', bg: 'bg-indigo-500/10', icon: CheckCircle2 },
    in_progress: { label: 'In Progress', color: 'text-purple-600', bg: 'bg-purple-500/10', icon: PlayCircle },
    completed: { label: 'Completed', color: 'text-emerald-600', bg: 'bg-emerald-500/10', icon: CheckCircle2 },
    cancelled: { label: 'Cancelled', color: 'text-destructive', bg: 'bg-destructive/10', icon: XCircle },
    rejected: { label: 'Rejected', color: 'text-destructive', bg: 'bg-destructive/10', icon: XCircle },
};

export function BookingTableRow({ booking, onUpdateStatus, isUpdating }: BookingTableRowProps) {
    const status = statusConfig[booking.status] || { label: booking.status, color: 'text-muted-foreground', bg: 'bg-muted/10', icon: Clock };
    const StatusIcon = status.icon;

    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(booking.schedule_at));
    const formattedTime = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(new Date(booking.schedule_at));

    return (
        <TableRow className="hover:bg-muted/30 transition-colors border-0">
            <TableCell className="px-6 py-4 h-auto">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrank-0">
                        {booking.user_id?.display_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-foreground text-sm truncate">{booking.user_id?.display_name || 'Anonymous'}</span>
                        <span className="text-[11px] text-muted-foreground truncate">{booking.user_id?.email}</span>
                    </div>
                </div>
            </TableCell>

            <TableCell className="px-6 py-4 h-auto">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-sm text-foreground font-medium">
                        <Calendar size={14} className="text-muted-foreground" />
                        {formattedDate}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                        <Clock size={12} />
                        {formattedTime}
                    </div>
                </div>
            </TableCell>

            <TableCell className="px-6 py-4 h-auto">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin size={14} className="shrink-0" />
                    <span className="truncate max-w-[200px]">{booking.address?.area}, {booking.address?.city}</span>
                </div>
            </TableCell>

            <TableCell className="px-6 py-4 h-auto">
                <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 w-fit">
                    <IndianRupee size={12} className="text-emerald-600" strokeWidth={3} />
                    <span className="text-sm font-black text-emerald-600 tracking-tight">
                        {booking.price.toLocaleString()}
                    </span>
                </div>
            </TableCell>

            <TableCell className="px-6 py-4 h-auto">
                <Badge variant="secondary" className={cn(status.bg, status.color, "px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-black rounded-full border-0")}>
                    <StatusIcon size={12} className="mr-1" />
                    {status.label}
                </Badge>
            </TableCell>

            <TableCell className="px-6 py-4 text-right h-auto">
                <div className="flex items-center justify-end gap-2">
                    {booking.status === 'requested' && (
                        <>
                            <button
                                onClick={() => onUpdateStatus(booking._id, 'accepted')}
                                disabled={isUpdating}
                                className="h-8 px-3 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 hover:text-emerald-700 font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5"
                            >
                                {isUpdating ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                                Accept
                            </button>
                            <button
                                onClick={() => onUpdateStatus(booking._id, 'rejected')}
                                disabled={isUpdating}
                                className="h-8 px-3 bg-destructive/10 text-destructive hover:bg-destructive/20 font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all"
                            >
                                Reject
                            </button>
                        </>
                    )}
                    {booking.status === 'accepted' && (
                        <button
                            onClick={() => onUpdateStatus(booking._id, 'confirmed')}
                            disabled={isUpdating}
                            className="h-8 px-4 bg-primary/10 text-primary hover:bg-primary/20 font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all"
                        >
                            Confirm
                        </button>
                    )}
                    {booking.status === 'confirmed' && (
                        <button
                            onClick={() => onUpdateStatus(booking._id, 'in_progress')}
                            disabled={isUpdating}
                            className="h-8 px-4 bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all"
                        >
                            Start Job
                        </button>
                    )}
                    {booking.status === 'in_progress' && (
                        <button
                            onClick={() => onUpdateStatus(booking._id, 'completed')}
                            disabled={isUpdating}
                            className="h-8 px-4 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all"
                        >
                            Complete
                        </button>
                    )}
                    {(['completed', 'cancelled', 'rejected'].includes(booking.status)) && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 px-4 py-2">
                            Settled
                        </span>
                    )}
                </div>
            </TableCell>
        </TableRow>
    );
}
