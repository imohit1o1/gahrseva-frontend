import { useState } from 'react';
import { useAdminCategories } from '../../hooks/admin/useAdminCategories';
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';
import { CategoryList } from '../../components/admin/categories/CategoryList';
import { CategoryForm } from '../../components/admin/categories/CategoryForm';

export default function AdminCategories() {
    const { categories, isLoading, createCategory, deleteCategory } = useAdminCategories();
    const [isAdding, setIsAdding] = useState(false);

    const handleCreate = async (data: { name: string; description: string }) => {
        try {
            await createCategory.mutateAsync(data);
            setIsAdding(false);
        } catch (err) {
            console.error('Failed to create category', err);
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
                <Button onClick={() => setIsAdding(!isAdding)} className="rounded-xl font-bold">
                    {isAdding ? 'Cancel' : (
                        <>
                            <Plus size={18} className="mr-2" />
                            Add Category
                        </>
                    )}
                </Button>
            </div>

            {isAdding && (
                <CategoryForm onSubmit={handleCreate} isPending={createCategory.isPending} />
            )}

            <CategoryList categories={categories} isLoading={isLoading} deleteCategory={deleteCategory} />
        </div>
    );
}
