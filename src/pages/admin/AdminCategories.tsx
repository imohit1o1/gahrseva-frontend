import { useState } from 'react';
import { useAdminCategories } from '../../hooks/admin/useAdminCategories';
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';
import { CategoriesTable } from '../../components/admin/categories/CategoriesTable';
import { CategoryDialog } from '../../components/admin/categories/CategoryDialog';
import type { Category, CreateCategoryInput } from '../../types/category';
import { toast } from 'sonner';

export default function AdminCategories() {
    const { categories, isLoading, createCategory, updateCategory, deleteCategory } = useAdminCategories();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleSubmit = async (data: CreateCategoryInput) => {
        try {
            if (selectedCategory) {
                await updateCategory.mutateAsync({ _id: selectedCategory._id, ...data });
                toast.success('Category Updated', {
                    description: `Category "${data.name}" has been successfully updated.`
                });
            } else {
                await createCategory.mutateAsync(data);
                toast.success('Category Created', {
                    description: `New category "${data.name}" is now ready for use.`
                });
            }
            setIsDialogOpen(false);
            setSelectedCategory(null);
        } catch (err) {
            toast.error('Operation Failed', {
                description: 'We encountered an error while saving the category.'
            });
            console.error('Failed to save category', err);
        }
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsDialogOpen(true);
    };

    const handleAddClick = () => {
        setSelectedCategory(null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCategory.mutateAsync(id);
            toast.success('Category Deleted', {
                description: 'The category has been successfully removed from the system.'
            });
        } catch (err) {
            toast.error('Delete Failed', {
                description: 'An error occurred while trying to delete the category.'
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Category Management</h1>
                    <p className="text-muted-foreground">
                        Manage service categories and tags.
                    </p>
                </div>
                <Button onClick={handleAddClick} className="rounded-xl font-bold">
                    <Plus size={18} className="mr-2" />
                    Add Category
                </Button>
            </div>

            <CategoryDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSubmit={handleSubmit}
                isPending={createCategory.isPending || updateCategory.isPending}
                category={selectedCategory}
            />

            <CategoriesTable
                categories={categories}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deleteCategory.isPending ? (deleteCategory.variables as string) : null}
            />
        </div>
    );
}
