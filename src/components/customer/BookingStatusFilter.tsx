import { SlidersHorizontal } from "lucide-react";
import type { CustomerBookingStatus } from "@/types/customerBooking";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";

const STATUS_OPTIONS: { label: string; value: CustomerBookingStatus | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Requested", value: "requested" },
  { label: "Accepted", value: "accepted" },
  { label: "Confirmed", value: "confirmed" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Rejected", value: "rejected" },
];

export interface BookingStatusFilterProps {
  value: CustomerBookingStatus | undefined;
  onChange: (value: CustomerBookingStatus | undefined) => void;
}

export function BookingStatusFilter({ value, onChange }: BookingStatusFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <SlidersHorizontal size={16} />
          <span>Filter by status</span>
          {value != null && (
            <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-primary">
              Active
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <PopoverHeader className="px-3 pt-3 pb-2">
          <PopoverTitle className="text-sm font-semibold">
            Filter by status
          </PopoverTitle>
        </PopoverHeader>
        <div className="flex flex-col gap-0.5 pb-2">
          {STATUS_OPTIONS.map((option) => {
            const isActive =
              value === option.value || (value == null && option.value === undefined);
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => onChange(option.value)}
                className={[
                  "px-3 py-2 text-left text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
