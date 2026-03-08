import { useProviderBookings, useUpdateBookingStatus } from "../../hooks/service-provider/useProviderBookings";
import { ProviderBookingsTable } from "../../components/providers/bookings/ProviderBookingsTable";

export default function ServiceProviderBookings() {
    // Only fetch requested bookings
    const { data, isLoading } = useProviderBookings('requested');
    const updateStatus = useUpdateBookingStatus();

    const handleStatusChange = (id: string, status: string) => {
        updateStatus.mutate({ id, status });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                    Service <span className="text-primary">Bookings</span>
                </h1>
                <p className="text-muted-foreground font-medium">
                    Manage your upcoming and past service requests.
                </p>
            </div>

            <ProviderBookingsTable
                bookings={data?.bookings}
                isLoading={isLoading}
                onStatusChange={handleStatusChange}
                isUpdatingId={updateStatus.isPending ? (updateStatus.variables?.id as string) : null}
            />
        </div>
    );
}
