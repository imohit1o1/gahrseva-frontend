import { useState } from 'react';
import { useAdminCategories } from '../../hooks/admin/useAdminCategories';
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';
import { CategoriesTable } from '../../components/admin/categories/CategoriesTable';
import { CategoryDialog } from '../../components/admin/categories/CategoryDialog';
import type { Category, CreateCategoryInput } from '../../types/admin/service';

export default function AdminCategories() {
    const { categories, isLoading, createCategory, updateCategory, deleteCategory } = useAdminCategories();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleSubmit = async (data: CreateCategoryInput) => {
        try {
            if (selectedCategory) {
                await updateCategory.mutateAsync({ _id: selectedCategory._id, ...data });
            } else {
                await createCategory.mutateAsync(data);
            }
            setIsDialogOpen(false);
            setSelectedCategory(null);
        } catch (err) {
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

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteCategory.mutate(id);
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
