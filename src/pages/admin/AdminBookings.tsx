import { useAdminBookings } from '../../hooks/admin/useAdminBookings';
import { BookingList } from '../../components/admin/bookings/BookingList';

export default function AdminBookings() {
    const { data: bookings, isLoading } = useAdminBookings();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
                <p className="text-muted-foreground">
                    Monitor and manage all service bookings across the platform.
                </p>
            </div>

            <BookingList bookings={bookings} isLoading={isLoading} />
        </div>
    );
}
