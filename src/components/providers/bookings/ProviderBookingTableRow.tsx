import { CalendarClock, MapPin, IndianRupee, Mail, Phone, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { TableCell, TableRow } from "../../ui/table";
import { Checkbox } from "../../ui/checkbox";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import type { Booking } from '../../../types/booking';

interface ProviderBookingTableRowProps {
    booking: Booking;
    onStatusChange: (id: string, status: string) => void;
    isUpdating: boolean;
}

export function ProviderBookingTableRow({
    booking,
    onStatusChange,
    isUpdating
}: ProviderBookingTableRowProps) {
    const formattedDate = new Date(booking.schedule_at).toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const formattedTime = new Date(booking.schedule_at).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <TableRow className="hover:bg-muted/30 transition-colors border-0 group">
            <TableCell className="px-6 py-4 h-auto w-14">
                <Checkbox aria-label={`Select booking`} />
            </TableCell>

            {/* Customer Info Column */}
            <TableCell className="px-6 py-4 h-auto">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs uppercase shrink-0">
                        {booking.user_id?.display_name?.charAt(0) || 'C'}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm line-clamp-1">
                            {booking.user_id?.display_name}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium lowercase">
                                <Mail size={10} />
                                {booking.user_id?.email}
                            </span>
                            {booking.user_id?.phone && (
                                <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                                    <Phone size={10} />
                                    {booking.user_id.phone}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </TableCell>

            {/* Date Column */}
            <TableCell className="px-6 py-4 h-auto whitespace-nowrap">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
                        <CalendarClock size={14} className="text-primary/70" />
                        {formattedDate}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium pl-5">
                        {formattedTime}
                    </span>
                </div>
            </TableCell>

            {/* Location Column */}
            <TableCell className="px-6 py-4 h-auto">
                <div className="flex items-start gap-1.5 max-w-[200px]">
                    <MapPin size={14} className="text-muted-foreground/70 shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground font-medium line-clamp-2">
                        {[booking.address?.area, booking.address?.city, booking.address?.pincode]
                            .filter(Boolean)
                            .join(', ')}
                    </span>
                </div>
            </TableCell>

            {/* Price Column */}
            <TableCell className="px-6 py-4 h-auto whitespace-nowrap">
                <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 w-fit">
                    <IndianRupee size={12} className="text-emerald-600" strokeWidth={3} />
                    <span className="text-sm font-black text-emerald-600 tracking-tight">
                        {booking.price.toLocaleString()}
                    </span>
                </div>
            </TableCell>

            {/* Status Column */}
            <TableCell className="px-6 py-4 h-auto">
                {booking.status === 'requested' && (
                    <Badge className="bg-amber-500/10 text-amber-600 border-none rounded-full h-6 text-[9px] font-black uppercase tracking-widest px-2.5 flex items-center gap-1 w-fit">
                        Requested
                    </Badge>
                )}
            </TableCell>

            {/* Actions Column */}
            <TableCell className="px-6 py-4 text-right h-auto">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onStatusChange(booking._id, 'accepted')}
                        disabled={isUpdating}
                        className="h-8 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 hover:text-emerald-700 font-bold text-xs rounded-lg transition-all"
                    >
                        {isUpdating ? <Loader2 size={14} className="animate-spin mr-1.5" /> : <CheckCircle2 size={14} className="mr-1.5" />}
                        Accept
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onStatusChange(booking._id, 'rejected')}
                        disabled={isUpdating}
                        className="h-8 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive font-bold text-xs rounded-lg transition-all"
                    >
                        {isUpdating ? <Loader2 size={14} className="animate-spin mr-1.5" /> : <XCircle size={14} className="mr-1.5" />}
                        Reject
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}
