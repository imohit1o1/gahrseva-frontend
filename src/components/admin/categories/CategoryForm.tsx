import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';

interface CategoryFormProps {
    onSubmit: (data: { name: string; description: string }) => Promise<void>;
    isPending: boolean;
}

export function CategoryForm({ onSubmit, isPending }: CategoryFormProps) {
    const [newName, setNewName] = useState('');
    const [newDesc, setNewDesc] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ name: newName, description: newDesc });
        setNewName('');
        setNewDesc('');
    };

    return (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Create New Category</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="rounded-xl border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="e.g., Home Cleaning"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        className="rounded-xl border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 h-24"
                        placeholder="Describe the category..."
                    />
                </div>
                <Button type="submit" disabled={isPending} className="w-full rounded-xl font-bold">
                    {isPending ? <Loader2 className="animate-spin" size={18} /> : 'Create Category'}
                </Button>
            </form>
        </div>
    );
}
