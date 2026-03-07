import { useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Upload, X, Check } from 'lucide-react';
import { useUpload } from '../../../hooks/useUpload';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Checkbox } from "../../ui/checkbox";
import { Field, FieldLabel, FieldError } from "../../ui/field";
import type { Category, CreateCategoryInput } from '../../../types/category';

const categorySchema = z.object({
    name: z.string().min(1, 'Category name is required'),
    slug: z.string().optional().or(z.literal('')),
    image: z.string().min(1, 'Category image is required'),
    description: z.string().min(1, 'Description is required'),
    sortOrder: z.number().int().min(0, 'Sort order must be 0 or greater'),
    isActive: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: CreateCategoryInput) => Promise<void>;
    isPending: boolean;
    category?: Category | null;
}

export function CategoryDialog({ open, onOpenChange, onSubmit, isPending, category }: CategoryDialogProps) {
    const { uploadImage, isUploading, uploadError } = useUpload();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
            slug: '',
            image: '',
            description: '',
            sortOrder: 0,
            isActive: true,
            isFeatured: false,
        },
    });

    const nameValue = watch('name');
    const imageValue = watch('image');

    // Auto-generate slug from name if editing the name for a new category
    useEffect(() => {
        if (!category && nameValue) {
            const generatedSlug = nameValue
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '');
            setValue('slug', generatedSlug, { shouldValidate: true });
        }
    }, [nameValue, category, setValue]);

    useEffect(() => {
        if (category && open) {
            reset({
                name: category.name,
                slug: category.slug,
                image: category.image || '',
                description: category.description || '',
                sortOrder: category.sortOrder,
                isActive: category.isActive,
                isFeatured: category.isFeatured,
            });
        } else if (!open) {
            reset({
                name: '',
                slug: '',
                image: '',
                description: '',
                sortOrder: 0,
                isActive: true,
                isFeatured: false,
            });
        }
    }, [category, open, reset]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                setValue('image', imageUrl, { shouldValidate: true });
            }
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = () => {
        setValue('image', '', { shouldValidate: true });
    };

    const onFormSubmit = async (data: CategoryFormValues) => {
        await onSubmit(data as CreateCategoryInput);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden border-none bg-background rounded-3xl shadow-2xl">
                <DialogHeader className="px-6 pt-6 pb-0">
                    <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <div className="h-8 w-1.5 bg-primary rounded-full" />
                        {category ? 'Edit Category Details' : 'Add New Category'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col">
                    <div className="px-6 py-5 space-y-5">
                        {/* First Row: Name */}
                        <div className="grid grid-cols-12 gap-4">
                            <Field className="col-span-12">
                                <FieldLabel htmlFor="name" required>Category Name</FieldLabel>
                                <Input
                                    id="name"
                                    {...register('name')}
                                    placeholder="e.g., Home Cleaning"
                                    className="rounded-xl h-11 border-muted-foreground/20 focus:ring-primary/20"
                                />
                                <FieldError errors={[errors.name]} />
                            </Field>
                        </div>

                        {/* Second Row: Slug, Sort Order */}
                        <div className="grid grid-cols-12 gap-4">
                            <Field className="col-span-8">
                                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                                <Input
                                    id="slug"
                                    {...register('slug')}
                                    placeholder="home-cleaning"
                                    className="rounded-xl h-11 border-muted-foreground/20 focus:ring-primary/20 font-mono text-xs"
                                />
                                <FieldError errors={[errors.slug]} />
                            </Field>

                            <Field className="col-span-4">
                                <FieldLabel htmlFor="sortOrder">Sort Order</FieldLabel>
                                <Input
                                    id="sortOrder"
                                    type="number"
                                    min="0"
                                    {...register('sortOrder', { valueAsNumber: true })}
                                    placeholder="0"
                                    className="rounded-xl h-11 border-muted-foreground/20 focus:ring-primary/20"
                                />
                                <FieldError errors={[errors.sortOrder]} />
                            </Field>
                        </div>

                        {/* Second Row: Description */}
                        <Field>
                            <FieldLabel htmlFor="description" required>Description</FieldLabel>
                            <Textarea
                                id="description"
                                {...register('description')}
                                placeholder="Describe this category in detail..."
                                className="rounded-2xl h-[100px] resize-none border-muted-foreground/20 focus:ring-primary/20 bg-muted/5 py-3 overflow-y-auto mt-1"
                            />
                            <FieldError errors={[errors.description]} />
                        </Field>

                        {/* Third Row: Image Upload */}
                        <div className="space-y-3">
                            <Label className="text-sm font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Category Image *</Label>
                            <div className="flex items-center gap-6 p-6 rounded-3xl border border-dashed border-border/60 bg-background transition-all hover:bg-background/80 group relative overflow-hidden">
                                {isUploading && (
                                    <div className="absolute inset-0 z-10 bg-background/80 flex items-center justify-center rounded-2xl">
                                        <div className="flex items-center gap-2 text-[11px] text-primary font-black animate-pulse">
                                            <Loader2 className="animate-spin size-3" />
                                            Uploading...
                                        </div>
                                    </div>
                                )}

                                <div className="relative shrink-0">
                                    {imageValue ? (
                                        <>
                                            <div className="size-24 rounded-2xl overflow-hidden border-2 border-primary shadow-2xl shadow-primary/20">
                                                <img src={imageValue} alt="Preview" className="size-full object-cover" />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute -top-2 -right-2 p-1.5 rounded-full bg-destructive text-white shadow-lg transition-all hover:scale-110 active:scale-95 z-20"
                                            >
                                                <X size={14} />
                                            </button>
                                        </>
                                    ) : (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="size-24 rounded-2xl border-2 border-dashed border-border/40 bg-background flex flex-col items-center justify-center text-muted-foreground/20 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all cursor-pointer"
                                        >
                                            <Upload size={32} />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 space-y-3">
                                    <p className="text-sm text-foreground font-bold">
                                        Select Category Image
                                    </p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Upload a clear image for this category. Recommended: 1200x800px.
                                    </p>
                                    <div className="relative isolate group/input">
                                        <Input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={isUploading}
                                            className="h-10 text-xs p-1 pr-3 file:mr-3 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer rounded-2xl border-border/40 bg-background"
                                        />
                                    </div>
                                    {imageValue && !isUploading && (
                                        <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-black uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full w-fit">
                                            <Check size={12} className="text-emerald-500" />
                                            Upload Complete
                                        </div>
                                    )}
                                    {uploadError && (
                                        <p className="text-[10px] text-destructive font-bold bg-destructive/5 px-3 py-1 rounded-full w-fit animate-in fade-in slide-in-from-top-1">{uploadError}</p>
                                    )}
                                </div>
                            </div>
                            {errors.image && <FieldError errors={[errors.image]} />}
                            <input type="hidden" {...register('image')} />
                        </div>

                        {/* Fourth Row: Status Flags */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl cursor-pointer hover:bg-muted/40 transition-colors group">
                                <Controller
                                    name="isActive"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="isActive"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="h-5 w-5 rounded-md border-muted-foreground/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 shadow-sm"
                                        />
                                    )}
                                />
                                <div className="flex flex-col">
                                    <Label htmlFor="isActive" className="cursor-pointer text-sm font-black uppercase tracking-widest text-foreground/80 group-hover:text-foreground">Active</Label>
                                    <span className="text-[10px] text-muted-foreground font-medium">Visible on frontend</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl cursor-pointer hover:bg-muted/40 transition-colors group">
                                <Controller
                                    name="isFeatured"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="isFeatured"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="h-5 w-5 rounded-md border-muted-foreground/30 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 shadow-sm"
                                        />
                                    )}
                                />
                                <div className="flex flex-col">
                                    <Label htmlFor="isFeatured" className="cursor-pointer text-sm font-black uppercase tracking-widest text-foreground/80 group-hover:text-foreground">Featured</Label>
                                    <span className="text-[10px] text-muted-foreground font-medium">Promoted on home</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-6 py-4 bg-muted/20 border-t border-border/50 gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="rounded-xl font-black uppercase tracking-widest text-xs hover:bg-muted"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="rounded-xl font-black uppercase tracking-widest text-xs bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 h-11"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 animate-spin" size={16} />
                                    {category ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                category ? 'Save Changes' : 'Create Category'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
