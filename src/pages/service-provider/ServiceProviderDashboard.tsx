import { useAuthStore } from "../../store/authStore";
import { DashboardHeader } from "../../components/providers/dashboard/DashboardHeader";
import { PendingStatusAlert } from "../../components/providers/dashboard/PendingStatusAlert";
import { DashboardStats } from "../../components/providers/dashboard/DashboardStats";
import { DashboardEmptyState } from "../../components/providers/dashboard/DashboardEmptyState";
import { useProviderAnalytics } from "../../hooks/service-provider/useProviderAnalytics";
import { Loader2 } from "lucide-react";

export default function ServiceProviderDashboard() {
    const auth = useAuthStore();
    const { data: analytics, isLoading } = useProviderAnalytics();

    return (
        <div className="space-y-6">
            <DashboardHeader />

            {!auth.user?.is_approved && (
                <PendingStatusAlert />
            )}

            {auth.user?.is_approved && (
                <>
                    {isLoading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="size-8 animate-spin text-primary" />
                        </div>
                    ) : analytics ? (
                        <>
                            <DashboardStats stats={analytics} />
                            {analytics.totalBookings === 0 && <DashboardEmptyState />}
                        </>
                    ) : null}
                </>
            )}
        </div>
    );
}
