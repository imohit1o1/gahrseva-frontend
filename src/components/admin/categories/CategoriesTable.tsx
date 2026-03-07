import { Loader2 } from 'lucide-react';
import type { Category } from '../../../types/admin/service';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { Checkbox } from "../../ui/checkbox";
import { CategoryTableRow } from './CategoryTableRow';

interface CategoriesTableProps {
    categories: Category[] | undefined;
    isLoading: boolean;
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
    isDeleting: string | null;
}

const HEADER_CLASS = "px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground h-auto";

const TABLE_HEADERS = [
    { id: 'image', label: 'Image', className: 'w-32' },
    { id: 'name', label: 'Name' },
    { id: 'slug', label: 'Slug' },
    { id: 'order', label: 'Sort Order' },
    { id: 'featured', label: 'Featured' },
    { id: 'active', label: 'Active' },
    { id: 'actions', label: 'Actions', className: 'text-right' },
];

export function CategoriesTable({ categories, isLoading, onEdit, onDelete, isDeleting }: CategoriesTableProps) {
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
                                <TableCell colSpan={8} className="px-6 py-20 text-center text-primary/40 h-auto">
                                    <div className="flex justify-center">
                                        <Loader2 className="animate-spin" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <CategoryTableRow
                                    key={category._id}
                                    category={category}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    isDeleting={isDeleting === category._id}
                                />
                            ))
                        ) : (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={8} className="px-6 py-12 text-center text-muted-foreground h-auto">
                                    No categories found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
