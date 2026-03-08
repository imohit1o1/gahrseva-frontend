import { Calendar, Clock, MapPin, ReceiptText, Loader2 } from 'lucide-react';
import type { Booking } from '../../../types/booking';

interface BookingListProps {
    bookings: Booking[] | undefined;
    isLoading: boolean;
}

export function BookingList({ bookings, isLoading }: BookingListProps) {
    return (
        <div className="grid gap-4 min-h-[400px]">
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary/40" />
                </div>
            ) : bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div key={booking._id} className="group relative bg-background border border-border/60 rounded-3xl p-6 transition-all hover:shadow-xl hover:shadow-primary/5">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className="hidden sm:flex size-14 rounded-2xl bg-muted items-center justify-center text-muted-foreground">
                                    <ReceiptText size={24} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                            ID: {booking._id.slice(-6)}
                                        </span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${booking.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                            booking.status === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                                                'bg-amber-500/10 text-amber-500'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold">Service Booking</h3>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{new Date(booking.schedule_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            <span>{new Date(booking.schedule_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="flex flex-col">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                                    <div className="flex items-center gap-1 text-xs font-medium">
                                        <MapPin size={14} className="text-primary" />
                                        <span className="line-clamp-1 max-w-[200px]">
                                            {booking.address
                                                ? `${booking.address.area ?? ''}${booking.address.area && (booking.address.city || booking.address.pincode) ? ', ' : ''}${booking.address.city ?? ''}${
                                                      booking.address.pincode ? ` - ${booking.address.pincode}` : ''
                                                  }`
                                                : 'Address not available'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Amount</p>
                                    <p className="text-xl font-black text-foreground">₹{booking.price}</p>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-border/60 text-xs font-bold hover:bg-accent transition-colors">Details</button>
                                    <button className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/10">Manage</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl bg-muted/20">
                    <ReceiptText className="size-12 text-muted-foreground mb-4 opacity-20" />
                    <p className="text-muted-foreground font-medium">No bookings found.</p>
                </div>
            )}
        </div>
    );
}
