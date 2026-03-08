import { useState } from "react";
import { useProviderBookings, useUpdateBookingStatus } from "../../hooks/service-provider/useProviderBookings";
import { BookingsTable } from "../../components/providers/bookings/BookingsTable";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "../../components/ui/pagination";

export default function ServiceProviderBookings() {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading } = useProviderBookings({ page, limit });
    const updateStatus = useUpdateBookingStatus();

    const pagination = data?.pagination;
    const totalPages = pagination?.totalPages || 1;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                    Service <span className="text-primary">Bookings</span>
                </h1>
                <p className="text-muted-foreground font-medium">
                    Manage and track all your service requests in one place.
                </p>
            </div>

            <div className="space-y-6">
                <BookingsTable
                    bookings={data?.bookings}
                    isLoading={isLoading}
                    updateStatus={updateStatus}
                />

                {totalPages > 1 && (
                    <div className="flex justify-center pt-4">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(page - 1)}
                                        className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {[...Array(totalPages)].map((_, i) => (
                                    <PaginationItem key={i + 1}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(i + 1)}
                                            isActive={page === i + 1}
                                            className="cursor-pointer"
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(page + 1)}
                                        className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}
