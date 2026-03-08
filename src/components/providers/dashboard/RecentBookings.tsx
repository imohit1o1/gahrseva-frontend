import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useProviderBookings, useUpdateBookingStatus } from "../../../hooks/service-provider/useProviderBookings";
import { BookingsTable } from "../bookings/BookingsTable";

export function RecentBookings() {
    const { data, isLoading } = useProviderBookings();
    const updateStatus = useUpdateBookingStatus();

    // Display only first 5 bookings on dashboard
    const recentBookings = data?.bookings.slice(0, 5);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-foreground tracking-tight">Recent Bookings</h2>
                    <p className="text-xs text-muted-foreground font-medium">Manage your latest service requests</p>
                </div>
                <Link
                    to="/service-provider/bookings"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all"
                >
                    View All <ArrowRight size={14} strokeWidth={3} />
                </Link>
            </div>

            <BookingsTable
                bookings={recentBookings}
                isLoading={isLoading}
                updateStatus={updateStatus}
            />
        </div>
    );
}
