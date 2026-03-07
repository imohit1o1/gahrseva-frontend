import { Loader2, Edit2, Trash2 } from 'lucide-react';
import { TableCell, TableRow } from "../../ui/table";
import { Checkbox } from "../../ui/checkbox";
import { Badge } from "../../ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { AlertCircle } from 'lucide-react';
import type { Category } from '../../../types/category';

interface CategoryTableRowProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
    isDeleting: boolean;
}

export function CategoryTableRow({ category, onEdit, onDelete, isDeleting }: CategoryTableRowProps) {
    return (
        <TableRow key={category._id} className="hover:bg-muted/30 transition-colors border-0">
            <TableCell className="px-6 py-4 h-auto">
                <Checkbox aria-label={`Select ${category.name}`} />
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                {category.image ? (
                    <img src={category.image} alt={category.name} className="w-20 rounded-xl object-cover bg-muted ring-1 ring-border/50" />
                ) : (
                    <div className="w-20 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                        {category.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                <span className="font-bold text-foreground text-sm">{category.name}</span>
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{category.slug}</code>
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                <span className="text-sm font-mono font-medium">{category.sortOrder}</span>
            </TableCell>
            <TableCell className="px-6 py-4 h-auto text-sm">
                {category.isFeatured ? (
                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-black rounded-full border-0">
                        Featured
                    </Badge>
                ) : (
                    <span className="text-muted-foreground/40">-</span>
                )}
            </TableCell>
            <TableCell className="px-6 py-4 h-auto">
                {category.isActive ? (
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-black rounded-full border-0">
                        Active
                    </Badge>
                ) : (
                    <Badge variant="secondary" className="bg-muted text-muted-foreground px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-black rounded-full border-0">
                        Inactive
                    </Badge>
                )}
            </TableCell>
            <TableCell className="px-6 py-4 text-right h-auto">
                <div className="flex items-center justify-end gap-1">
                    <button
                        onClick={() => onEdit(category)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary"
                        title="Edit Category"
                    >
                        <Edit2 size={16} />
                    </button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button
                                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-destructive disabled:opacity-30"
                                title="Delete Category"
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Trash2 size={16} />
                                )}
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-3xl p-0 overflow-hidden border-none shadow-2xl max-w-[380px]">
                            <div className="bg-destructive/5 px-5 py-5">
                                <AlertDialogHeader className="space-y-2">
                                    <AlertDialogTitle className="text-base font-black tracking-tight flex items-center gap-2 text-destructive">
                                        <AlertCircle size={18} strokeWidth={2.5} />
                                        Delete Category?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-xs font-medium leading-relaxed text-muted-foreground/80">
                                        Are you sure you want to delete <span className="text-foreground font-bold">"{category.name}"</span>?
                                        This action cannot be undone and will permanently remove this category from the system.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                            </div>
                            <AlertDialogFooter className="p-3 flex items-center justify-end gap-2 bg-background border-t border-border/40">
                                <AlertDialogCancel className="rounded-xl font-bold border-none bg-muted/50 hover:bg-muted h-9 px-4 mt-0 text-[11px]">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete(category._id)}
                                    className="rounded-xl font-black bg-destructive hover:bg-destructive/90 text-white h-9 px-5 shadow-lg shadow-destructive/20 transition-all active:scale-95 text-[11px]"
                                >
                                    Delete Now
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </TableCell>
        </TableRow>
    );
}
