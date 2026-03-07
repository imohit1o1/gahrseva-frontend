import { useAdminProviders } from '../../hooks/admin/useAdminProviders';
import { ProviderList } from '../../components/admin/providers/ProviderList';

export default function AdminProviders() {
    const { providers, isLoading, approveProvider, rejectProvider } = useAdminProviders();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Provider Management</h1>
                    <p className="text-muted-foreground">
                        Review and verify service providers on the platform.
                    </p>
                </div>
            </div>

            <ProviderList
                providers={providers}
                isLoading={isLoading}
                approveProvider={approveProvider}
                rejectProvider={rejectProvider}
            />
        </div>
    );
}
