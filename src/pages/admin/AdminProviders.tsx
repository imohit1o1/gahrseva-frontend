import { useState } from 'react';
import { useAdminProviders } from '../../hooks/admin/useAdminProviders';
import { useAdminProviderDetail } from '../../hooks/admin/useAdminProviderDetail';
import { ProvidersTable } from '../../components/admin/providers/ProvidersTable';
import { ProviderDialog } from '../../components/admin/providers/ProviderDialog';
import { toast } from 'sonner';

export default function AdminProviders() {
    const { providers, isLoading: isListLoading, approveProvider, rejectProvider, deleteProvider } = useAdminProviders();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<'view' | 'edit'>('view');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { provider, isLoading: isDetailLoading, updateProvider } = useAdminProviderDetail(selectedId);

    const handleOpenDialog = (id: string, mode: 'view' | 'edit') => {
        setSelectedId(id);
        setDialogMode(mode);
        setDialogOpen(true);
    };

    const handleUpdateProvider = async (data: any) => {
        try {
            await updateProvider.mutateAsync(data);
            setDialogOpen(false);
            toast.success('Profile Updated', {
                description: 'The service provider profile has been successfully updated.'
            });
        } catch (error) {
            toast.error('Update Failed', {
                description: 'We encountered an error while trying to update the provider profile.'
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">
                        Provider <span className="text-primary">Management</span>
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Review and verify service providers on the platform.
                    </p>
                </div>
            </div>

            <ProvidersTable
                providers={providers}
                isLoading={isListLoading}
                approveProvider={approveProvider}
                rejectProvider={rejectProvider}
                deleteProvider={deleteProvider}
                onView={(id) => handleOpenDialog(id, 'view')}
                onEdit={(id) => handleOpenDialog(id, 'edit')}
            />

            <ProviderDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode={dialogMode}
                providerId={selectedId}
                provider={provider || null}
                isLoading={isDetailLoading}
                onSubmit={handleUpdateProvider}
                isUpdating={updateProvider.isPending}
            />
        </div>
    );
}
