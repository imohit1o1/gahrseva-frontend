import { useState } from "react";
import { CheckCircle2, Loader2, Camera } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";
import { useUpdateBookingStatus } from "@/hooks/service-provider/useProviderBookings";
import type { Booking } from "@/types/booking";

interface BookingActionsPanelProps {
    booking: Booking;
}

export function BookingActionsPanel({ booking }: BookingActionsPanelProps) {
    const updateStatus = useUpdateBookingStatus();
    const [beforeImageUrl, setBeforeImageUrl] = useState<string>(booking.before_image || "");
    const [afterImageUrl, setAfterImageUrl] = useState<string>(booking.after_image || "");
    const totalAmount = booking.price;
    const platformFee = 0;
    const gstAmount = 0;
    const netEarnings = totalAmount - platformFee - gstAmount;

    return (
        <section className="space-y-6 rounded-2xl border border-border/70 bg-muted/40 p-6 shadow-sm">
            {/* Earnings breakdown */}
            <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    Earnings summary
                </h3>

                <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Total service amount</span>
                        <span className="font-semibold text-foreground">
                            ₹ {totalAmount.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Platform fee</span>
                        <span className="font-medium text-foreground">
                            ₹ {platformFee.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">GST</span>
                        <span className="font-medium text-foreground">
                            ₹ {gstAmount.toLocaleString()}
                        </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-border/60 flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-widest text-foreground">
                            Your earnings
                        </span>
                        <span className="text-base font-black text-foreground">
                            ₹ {netEarnings.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
                {booking.status === "requested" && (
                    <>
                        <button
                            onClick={() => updateStatus.mutate({ id: booking._id, status: "accepted" })}
                            disabled={updateStatus.isPending}
                            className="h-14 w-full bg-emerald-500 text-white hover:bg-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {updateStatus.isPending ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <CheckCircle2 size={18} />
                            )}
                            Accept Request
                        </button>
                        <button
                            onClick={() => updateStatus.mutate({ id: booking._id, status: "rejected" })}
                            disabled={updateStatus.isPending}
                            className="h-14 w-full border border-border text-muted-foreground bg-background hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                            Decline
                        </button>
                    </>
                )}

                {booking.status === "accepted" && (
                    <button
                        onClick={() => updateStatus.mutate({ id: booking._id, status: "confirmed" })}
                        disabled={updateStatus.isPending}
                        className="h-14 w-full bg-primary text-white hover:bg-primary/90 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98]"
                    >
                        Confirm Appointment
                    </button>
                )}

                {booking.status === "confirmed" && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-700">
                        <FileUpload
                            label="Before Service Image"
                            description="Required before you can start the job."
                            variant="primary"
                            icon={<Camera size={32} />}
                            onChange={(url) => setBeforeImageUrl(url)}
                            disabled={updateStatus.isPending}
                        />
                        <button
                            onClick={() =>
                                updateStatus.mutate({
                                    id: booking._id,
                                    status: "in_progress",
                                    before_image: beforeImageUrl,
                                })
                            }
                            disabled={updateStatus.isPending || !beforeImageUrl}
                            className="h-12 w-full bg-primary text-white hover:bg-primary/90 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-60"
                        >
                            Start Job
                        </button>
                    </div>
                )}

                {booking.status === "in_progress" && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-700">
                        <FileUpload
                            label="After Service Image"
                            description="Required to complete this booking."
                            variant="primary"
                            icon={<CheckCircle2 size={32} />}
                            onChange={(url) => setAfterImageUrl(url)}
                            disabled={updateStatus.isPending}
                        />
                        <button
                            onClick={() =>
                                updateStatus.mutate({
                                    id: booking._id,
                                    status: "completed",
                                    after_image: afterImageUrl,
                                })
                            }
                            disabled={updateStatus.isPending || !afterImageUrl}
                            className="h-12 w-full bg-emerald-500 text-white hover:bg-emerald-600 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-60"
                        >
                            Mark as Completed
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

