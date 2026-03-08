import { useAuthStore } from "../../store/authStore";
import { DashboardHeader } from "../../components/providers/dashboard/DashboardHeader";
import { PendingStatusAlert } from "../../components/providers/dashboard/PendingStatusAlert";
import { DashboardStats } from "../../components/providers/dashboard/DashboardStats";
import { RecentBookings } from "../../components/providers/dashboard/RecentBookings";
import { DashboardEmptyState } from "../../components/providers/dashboard/DashboardEmptyState";

export default function ServiceProviderDashboard() {
    const auth = useAuthStore();

    return (
        <div className="space-y-6">
            <DashboardHeader />

            {!auth.user?.is_approved && (
                <PendingStatusAlert />
            )}

            <DashboardStats />
            <RecentBookings />
            <DashboardEmptyState />
        </div>
    );
}
