import { Plus, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';
import type { Category } from '../../../types/admin/service';

interface CategoryListProps {
    categories: Category[] | undefined;
    isLoading: boolean;
    deleteCategory: any;
}

export function CategoryList({ categories, isLoading, deleteCategory }: CategoryListProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 min-h-[300px]">
            {isLoading ? (
                <div className="col-span-full flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary/40" />
                </div>
            ) : categories && categories.length > 0 ? (
                categories.map((category) => (
                    <div key={category._id} className="group relative flex flex-col items-center p-6 bg-background border border-border/60 rounded-3xl transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                            <Plus size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-foreground text-center line-clamp-1">{category.name}</h3>
                        <p className="text-xs text-muted-foreground text-center mt-1 line-clamp-2 min-h-[32px]">
                            {category.description || 'No description provided.'}
                        </p>
                        <div className="mt-4 w-full flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 rounded-xl text-xs font-bold">Edit</Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={deleteCategory.isPending}
                                onClick={() => deleteCategory.mutate(category._id)}
                                className="flex-1 rounded-xl text-xs font-bold border-destructive/20 text-destructive hover:bg-destructive/5"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl bg-muted/20">
                    <AlertCircle className="size-12 text-muted-foreground mb-4 opacity-20" />
                    <p className="text-muted-foreground font-medium">No categories found.</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Start by adding a new category.</p>
                </div>
            )}
        </div>
    );
}
