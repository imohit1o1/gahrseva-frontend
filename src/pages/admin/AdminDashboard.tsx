import { DashboardStats } from '../../components/admin/dashboard/DashboardStats';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                    Overview of GharSeva's performance and operations.
                </p>
            </div>

            <DashboardStats />
        </div>
    );
}
