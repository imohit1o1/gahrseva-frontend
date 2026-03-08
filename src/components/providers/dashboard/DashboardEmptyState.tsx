import { useProviderAnalytics } from "../../../hooks/service-provider/useProviderAnalytics";
import { useAuthStore } from "../../../store/authStore";
import { Loader2 } from "lucide-react";

export function DashboardEmptyState() {
    const { user } = useAuthStore();
    const { data: stats, isLoading } = useProviderAnalytics();

    // Only show if user is approved and we've confirmed there are no bookings
    if (!user?.is_approved || (!isLoading && stats?.totalBookings !== 0)) return null;

    return (
        <div className="p-12 rounded-[3rem] bg-background border border-border/60 shadow-sm text-center space-y-4">
            {isLoading ? (
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="size-8 animate-spin text-primary/40" />
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/40">Checking activity...</span>
                </div>
            ) : (
                <>
                    <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                        <span className="text-2xl font-black">?</span>
                    </div>
                    <h3 className="text-xl font-black text-foreground">No activity yet</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                        Once you start receiving bookings, they will appear here. Keep your profile updated to attract more customers!
                    </p>
                </>
            )}
        </div>
    );
}
