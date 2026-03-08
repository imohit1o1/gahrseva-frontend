import { Calendar } from "lucide-react";
import type { CustomerBookingStatus } from "@/types/customerBooking";
import { BookingStatusFilter } from "./BookingStatusFilter";

export interface BookingsPageHeaderProps {
  statusFilter?: CustomerBookingStatus | undefined;
  onStatusFilterChange?: (value: CustomerBookingStatus | undefined) => void;
}

export function BookingsPageHeader({
  statusFilter,
  onStatusFilterChange,
}: BookingsPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary/80">
          <Calendar size={14} />
          <span>Your bookings</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          Track your{" "}
          <span className="text-primary">service requests</span>
        </h1>
        <p className="text-muted-foreground font-medium text-sm">
          View all your past and upcoming bookings in one place.
        </p>
      </div>
      {onStatusFilterChange && (
        <div className="shrink-0 sm:pt-1">
          <BookingStatusFilter value={statusFilter} onChange={onStatusFilterChange} />
        </div>
      )}
    </div>
  );
}
