import { useAdminUsers } from '../../hooks/admin/useAdminUsers';
import { UsersTable } from '../../components/admin/users/UsersTable';

export default function AdminUsers() {
    const { data, isLoading } = useAdminUsers();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <p className="text-muted-foreground">
                    View and manage all registered users in the GharSeva platform.
                </p>
            </div>

            <UsersTable users={data?.users} isLoading={isLoading} />
        </div>
    );
}
