import { Loader2, XCircle } from 'lucide-react';
import type { ServiceProvider } from '../../../types/provider';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Checkbox } from "../../ui/checkbox";
import { ProviderTableRow } from './ProviderTableRow';

interface ProvidersTableProps {
    providers: ServiceProvider[] | undefined;
    isLoading: boolean;
    approveProvider: any;
    rejectProvider: any;
    deleteProvider: any;
    onView: (id: string) => void;
    onEdit: (id: string) => void;
}

const HEADER_CLASS = "px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground h-auto";

const TABLE_HEADERS = [
    { id: 'provider', label: 'Provider' },
    { id: 'category', label: 'Category' },
    { id: 'price', label: 'Price' },
    { id: 'experience', label: 'Exp' },
    { id: 'availability', label: 'Available' },
    { id: 'featured', label: 'Featured' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions', className: 'text-right' },
];

export function ProvidersTable({
    providers,
    isLoading,
    approveProvider,
    rejectProvider,
    deleteProvider,
    onView,
    onEdit
}: ProvidersTableProps) {
    return (
        <div className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm">
            <div className="min-h-[400px]">
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
                            <TableRow className="hover:bg-transparent border-0">
                                <TableCell colSpan={9} className="px-6 py-20 text-center text-primary/40 h-auto">
                                    <div className="flex justify-center">
                                        <Loader2 className="animate-spin" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : providers && providers.length > 0 ? (
                            providers.map((provider) => (
                                <ProviderTableRow
                                    key={provider._id}
                                    provider={provider}
                                    onApprove={(id) => approveProvider.mutate(id)}
                                    onReject={(id) => rejectProvider.mutate(id)}
                                    onDelete={(id) => deleteProvider.mutate(id)}
                                    onView={onView}
                                    onEdit={onEdit}
                                    isApproving={approveProvider.isPending && approveProvider.variables === provider._id}
                                    isRejecting={rejectProvider.isPending && rejectProvider.variables === provider._id}
                                    isDeleting={deleteProvider.isPending && deleteProvider.variables === provider._id}
                                />
                            ))
                        ) : (
                            <TableRow className="hover:bg-transparent border-0">
                                <TableCell colSpan={9} className="px-6 py-20 text-center h-auto">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <XCircle className="size-10 text-muted-foreground/20" strokeWidth={1.5} />
                                        <p className="text-muted-foreground font-medium text-sm">No providers found.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
