import { Loader2, CalendarX } from 'lucide-react';
import type { Booking } from '../../../types/booking';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { BookingTableRow } from './BookingTableRow';

interface BookingsTableProps {
    bookings: Booking[] | undefined;
    isLoading: boolean;
    updateStatus: any;
}

const HEADER_CLASS = "px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground h-auto";

const TABLE_HEADERS = [
    { id: 'customer', label: 'Customer' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'location', label: 'Location' },
    { id: 'price', label: 'Price' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions', className: 'text-right' },
];

export function BookingsTable({
    bookings,
    isLoading,
    updateStatus
}: BookingsTableProps) {
    return (
        <div className="rounded-[2.5rem] border border-border/60 bg-card overflow-hidden shadow-sm">
            <div className="min-h-[300px]">
                <Table>
                    <TableHeader className="bg-muted/30 border-b border-border/60">
                        <TableRow className="hover:bg-transparent">
                            {TABLE_HEADERS.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className={`${HEADER_CLASS} ${header.className || ''}`}
                                >
                                    {header.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-border/40">
                        {isLoading ? (
                            <TableRow className="hover:bg-transparent border-0">
                                <TableCell colSpan={6} className="px-6 py-20 text-center text-primary/40 h-auto">
                                    <div className="flex justify-center">
                                        <Loader2 className="animate-spin" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : bookings && bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <BookingTableRow
                                    key={booking._id}
                                    booking={booking}
                                    onUpdateStatus={(id, status) => updateStatus.mutate({ id, status })}
                                    isUpdating={updateStatus.isPending && updateStatus.variables?.id === booking._id}
                                />
                            ))
                        ) : (
                            <TableRow className="hover:bg-transparent border-0">
                                <TableCell colSpan={6} className="px-6 py-20 text-center h-auto">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <CalendarX className="size-10 text-muted-foreground/20" strokeWidth={1.5} />
                                        <p className="text-muted-foreground font-medium text-sm">No bookings found.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
