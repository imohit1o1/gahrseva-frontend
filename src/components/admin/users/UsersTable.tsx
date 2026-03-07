import { Loader2 } from 'lucide-react';
import type { User } from '../../../types/auth';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Checkbox } from "../../ui/checkbox";
import { UserTableRow } from './UserTableRow';

interface UsersTableProps {
    users: User[] | undefined;
    isLoading: boolean;
}

const HEADER_CLASS = "px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground h-auto";

const TABLE_HEADERS = [
    { id: 'avatar', label: 'Avatar', className: 'w-16' },
    { id: 'email', label: 'Email' },
    { id: 'name', label: 'Name' },
    { id: 'city', label: 'City' },
    { id: 'area', label: 'Area' },
    { id: 'pincode', label: 'Pincode' },
    { id: 'status', label: 'Profile Status' },
    { id: 'actions', label: 'Actions', className: 'text-right' },
];

export function UsersTable({ users, isLoading }: UsersTableProps) {
    const handleEditClick = (userId: string) => {
        console.log('Edit user:', userId);
    };

    const handleDeleteClick = (userId: string) => {
        console.log('Delete user:', userId);
    };

    return (
        <div className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm">
            <div className="min-h-[300px]">
                <Table>
                    <TableHeader className="bg-muted/50 border-b border-border/60">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-14 px-6 py-4 h-auto">
                                <Checkbox aria-label="Select all" />
                            </TableHead>
                            {TABLE_HEADERS.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className={`${HEADER_CLASS} ${header.className || ''}`}
                                >
                                    {header.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-border/40">
                        {isLoading ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={9} className="px-6 py-20 text-center text-primary/40 h-auto">
                                    <div className="flex justify-center">
                                        <Loader2 className="animate-spin" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : users && users.length > 0 ? (
                            users.map((user) => (
                                <UserTableRow
                                    key={user._id}
                                    user={user}
                                    onEdit={handleEditClick}
                                    onDelete={handleDeleteClick}
                                    isDeleting={false}
                                />
                            ))
                        ) : (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={9} className="px-6 py-12 text-center text-muted-foreground h-auto">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

