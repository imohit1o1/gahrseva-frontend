import { IndianRupee, Ban, CheckCircle2, Clock, Star, XCircle } from 'lucide-react';
import { useProviderAnalytics } from "../../../hooks/service-provider/useProviderAnalytics";
import { useAuthStore } from "../../../store/authStore";

export function DashboardStats() {
    const { user } = useAuthStore();
    const { data: stats, isLoading } = useProviderAnalytics();

    if (!user?.is_approved) return null;

    const primary = [
        { label: "Total Earnings", value: stats ? `₹${stats.totalRevenue.toLocaleString()}` : "₹0", icon: IndianRupee, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { label: "Completed Jobs", value: stats?.completedBookings ?? 0, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { label: "In Progress", value: stats?.activeBookings ?? 0, icon: Clock, color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
        { label: "Pending Requests", value: stats?.pendingBookings ?? 0, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" }
    ];

    const secondary = [
        { label: "User Cancelled", value: stats?.cancelledBookings ?? 0, icon: Ban, color: "text-destructive" },
        { label: "Rejected by You", value: 0, icon: XCircle, color: "text-destructive" },
        { label: "Total Reviews", value: stats?.totalReviews ?? 0, icon: Star, color: "text-amber-500" },
        { label: "Customer Rating", value: stats?.averageRating?.toFixed(1) ?? "0.0", icon: Star, color: "text-purple-500" }
    ];

    return (
        <div className="space-y-4">
            {/* Primary Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {primary.map((stat, i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${stat.border} bg-card shadow-sm group hover:shadow-md transition-all`}>
                        <div className={`shrink-0 flex items-center justify-center size-12 rounded-xl border border-border/50 ${stat.bg} ${stat.color} transition-transform group-hover:scale-105`}>
                            <stat.icon size={24} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 leading-none mb-1.5 truncate">{stat.label}</span>
                            <span className="text-xl font-black tracking-tight leading-none text-foreground">
                                {isLoading ? "..." : stat.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Secondary Stats */}
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
                {secondary.map((stat, i) => (
                    <div key={i} className="flex items-center gap-3 bg-muted/20 border border-border/40 rounded-xl p-2.5">
                        <div className={`shrink-0 p-1.5 rounded-lg bg-background shadow-sm ${stat.color}`}>
                            <stat.icon size={14} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 leading-tight truncate">{stat.label}</span>
                            <span className="text-sm font-black">{isLoading ? "..." : stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
