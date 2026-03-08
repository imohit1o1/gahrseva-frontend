import { Loader2, XCircle } from 'lucide-react';
import type { Booking } from '../../../types/booking';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Checkbox } from "../../ui/checkbox";
import { ProviderBookingTableRow } from './ProviderBookingTableRow';

interface ProviderBookingsTableProps {
    bookings: Booking[] | undefined;
    isLoading: boolean;
    onStatusChange: (id: string, status: string) => void;
    isUpdatingId: string | null;
}

const HEADER_CLASS = "px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground h-auto";

const TABLE_HEADERS = [
    { id: 'customer', label: 'Customer' },
    { id: 'date', label: 'Scheduled Date' },
    { id: 'location', label: 'Location' },
    { id: 'price', label: 'Price' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions', className: 'text-right' },
];

export function ProviderBookingsTable({
    bookings,
    isLoading,
    onStatusChange,
    isUpdatingId
}: ProviderBookingsTableProps) {
    return (
        <div className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm">
            <div className="min-h-[400px]">
                <Table>
                    <TableHeader className="bg-muted/50 border-b border-border/60">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-14 px-6 py-4 h-auto">
                                <Checkbox aria-label="Select all" />
                            </TableHead>
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
                                <TableCell colSpan={7} className="px-6 py-20 text-center text-primary/40 h-auto">
                                    <div className="flex justify-center">
                                        <Loader2 className="animate-spin size-8" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : bookings && bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <ProviderBookingTableRow
                                    key={booking._id}
                                    booking={booking}
                                    onStatusChange={onStatusChange}
                                    isUpdating={isUpdatingId === booking._id}
                                />
                            ))
                        ) : (
                            <TableRow className="hover:bg-transparent border-0">
                                <TableCell colSpan={7} className="px-6 py-20 text-center h-auto">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <XCircle className="size-10 text-muted-foreground/20" strokeWidth={1.5} />
                                        <p className="text-muted-foreground font-medium text-sm">No pending bookings found.</p>
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
