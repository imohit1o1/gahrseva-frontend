import { useState } from "react";
import { useBookings } from "../hooks/useBookings";
import type { CustomerBookingStatus } from "../types/customerBooking";
import { CustomerBookingList } from "../components/customer/customerBookingList";
import { BookingsPageHeader } from "../components/customer/BookingsPageHeader";
import { BookingsPagination } from "../components/customer/BookingsPagination";
import { SectionLayout } from "@/components/landing/section-layout/SectionLayout";

export default function Bookings() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<CustomerBookingStatus | undefined>(undefined);
  const limit = 10;

  const { data, isLoading } = useBookings({ page, limit, status: statusFilter });

  const pagination = data?.pagination;
  const totalPages = pagination?.total_pages ?? 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // eslint-disable-next-line no-console
  console.log('[UserBookings] data', data, 'bookings', data?.bookings);

  return (
    <SectionLayout className="pb-10">
      <BookingsPageHeader
        statusFilter={statusFilter}
        onStatusFilterChange={(value) => {
          setPage(1);
          setStatusFilter(value);
        }}
      />

      <div className="space-y-6 mt-6">
        <CustomerBookingList bookings={data?.bookings} isLoading={isLoading} />
        <BookingsPagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </SectionLayout>
  );
}

