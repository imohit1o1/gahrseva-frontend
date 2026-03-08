import { useParams, Link } from "@tanstack/react-router";
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    Mail,
    CheckCircle2,
    XCircle,
    PlayCircle,
    Loader2,
    Image as ImageIcon
} from "lucide-react";
import { useProviderBookingById } from "../../hooks/service-provider/useProviderBookings";
import { Badge } from "../../components/ui/badge";
import { BookingProgressStepper } from "@/components/service-provider/BookingProgressStepper";
import { BookingActionsPanel } from "@/components/service-provider/BookingActionsPanel";
import { cn } from "../../lib/utils";

const statusConfig: Record<string, { label: string, color: string, bg: string, icon: any }> = {
    requested: { label: 'Pending Request', color: 'text-amber-600', bg: 'bg-amber-500/10', icon: PlayCircle },
    accepted: { label: 'Accepted', color: 'text-blue-600', bg: 'bg-blue-500/10', icon: CheckCircle2 },
    confirmed: { label: 'Confirmed', color: 'text-indigo-600', bg: 'bg-indigo-500/10', icon: CheckCircle2 },
    in_progress: { label: 'In Progress', color: 'text-purple-600', bg: 'bg-purple-500/10', icon: PlayCircle },
    completed: { label: 'Completed', color: 'text-emerald-600', bg: 'bg-emerald-500/10', icon: CheckCircle2 },
    cancelled: { label: 'Cancelled by User', color: 'text-destructive', bg: 'bg-destructive/10', icon: XCircle },
    rejected: { label: 'Rejected by You', color: 'text-destructive', bg: 'bg-destructive/10', icon: XCircle },
};

export default function ServiceProviderBookingDetail() {
    const { bookingId } = useParams({ from: '/service-provider/bookings/$bookingId' });
    const { data: booking, isLoading } = useProviderBookingById(bookingId);

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary/40" />
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-black text-foreground">Booking not found</h2>
                <Link to="/service-provider/bookings" className="text-primary font-bold hover:underline mt-4 inline-block">
                    Back to Bookings
                </Link>
            </div>
        );
    }

    const status = statusConfig[booking.status] || { label: booking.status, color: 'text-muted-foreground', bg: 'bg-muted/10', icon: Clock };


    const formattedDate = new Intl.DateTimeFormat('en-IN', { dateStyle: 'full' }).format(new Date(booking.schedule_at));
    const formattedTime = new Intl.DateTimeFormat('en-IN', { timeStyle: 'short' }).format(new Date(booking.schedule_at));

    return (
        <div className="space-y-8 pb-10">

            {/* Header */}
            <header className="space-y-6">
                <div className="flex items-center justify-between">
                    <Link
                        to="/service-provider/bookings"
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all"
                    >
                        <ArrowLeft size={14} /> Back
                    </Link>
                    <Badge variant="secondary" className={cn(status.bg, status.color, "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border-0")}>
                        {status.label}
                    </Badge>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-tight italic">Service Detail</h1>
            </header>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Information Container*/}
                <div className="lg:col-span-7 space-y-10">
                    <section className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
                            {/* Customer */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                    <Mail size={12} /> Customer
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-lg font-black shrink-0 border border-primary/10 shadow-sm">
                                        {booking.user_id?.display_name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-black text-foreground truncate">{booking.user_id?.display_name}</span>
                                        <span className="text-[10px] text-muted-foreground font-bold truncate leading-none mt-1 uppercase tracking-tight italic">{booking.user_id?.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                    <Calendar size={12} /> Date & Time
                                </h3>
                                <div>
                                    <p className="text-sm font-black text-foreground">{formattedDate}</p>
                                    <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-tight italic leading-none">{formattedTime}</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                    <MapPin size={12} /> Client Location
                                </h3>
                                <div>
                                    <p className="text-sm font-black text-foreground">{booking.address?.area}</p>
                                    <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-tight italic leading-none">{booking.address?.city}, {booking.address?.pincode}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <BookingProgressStepper status={booking.status} />


                    {/* Service Proofs */}
                    {(booking.before_image || booking.after_image) && (
                        <section className="space-y-8 border-t border-border pt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2">
                                <ImageIcon size={12} /> Service Proofs
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                {booking.before_image && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-1 bg-muted/30 rounded-full inline-block">Before Image</span>
                                        </div>
                                        <div className="relative group overflow-hidden rounded-2xl border aspect-video bg-muted shadow-inner">
                                            <img
                                                src={booking.before_image}
                                                alt="Before Service"
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                )}
                                {booking.after_image && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-1 bg-muted/30 rounded-full inline-block">After Image</span>
                                        </div>
                                        <div className="relative group overflow-hidden rounded-2xl border aspect-video bg-muted shadow-inner">
                                            <img
                                                src={booking.after_image}
                                                alt="After Service"
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>

                {/* Actions Container */}
                <div className="lg:col-span-5 space-y-12">
                    <BookingActionsPanel booking={booking} />
                </div>
            </div>
        </div>
    );
}
