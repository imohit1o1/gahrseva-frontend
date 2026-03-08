import type { ProviderAnalytics } from "../../../types/provider";

interface DashboardStatsProps {
    stats: ProviderAnalytics;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-8 rounded-[2rem] bg-background border border-border/60 shadow-sm flex flex-col gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Active Bookings</span>
                <span className="text-3xl font-black text-blue-600">{stats.activeBookings}</span>
            </div>
            <div className="p-8 rounded-[2rem] bg-background border border-border/60 shadow-sm flex flex-col gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Pending Bookings</span>
                <span className="text-3xl font-black text-amber-600">{stats.pendingBookings}</span>
            </div>
            <div className="p-8 rounded-[2rem] bg-background border border-border/60 shadow-sm flex flex-col gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Cancelled Bookings</span>
                <span className="text-3xl font-black text-destructive">{stats.cancelledBookings}</span>
            </div>
            <div className="p-8 rounded-[2rem] bg-background border border-border/60 shadow-sm flex flex-col gap-1">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Total Revenue</span>
                <span className="text-3xl font-black text-emerald-600">₹{stats.totalRevenue.toLocaleString()}</span>
            </div>
        </div>
    );
}
