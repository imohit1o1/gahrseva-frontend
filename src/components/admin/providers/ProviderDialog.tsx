import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, ShieldCheck, Clock, Briefcase, IndianRupee, Mail, Star } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import type { ServiceProvider } from '../../../types/provider';
import { Badge } from "../../ui/badge";

const providerSchema = z.object({
    firstname: z.string().min(1, 'First name is required'),
    lastname: z.string().min(1, 'Last name is required'),
    base_price: z.number().min(0, 'Price must be 0 or greater'),
    experience: z.number().min(0, 'Experience must be 0 or greater'),
    city: z.string().min(1, 'City is required'),
    area: z.string().min(1, 'Area is required'),
    pincode: z.string().min(6, 'Valid pincode is required'),
    is_available: z.boolean(),
    is_featured: z.boolean(),
    description: z.string().optional(),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

interface ProviderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: 'view' | 'edit';
    providerId: string | null;
    provider: ServiceProvider | null;
    isLoading: boolean;
    onSubmit: (data: ProviderFormValues) => Promise<void>;
    isUpdating: boolean;
}

export function ProviderDialog({
    open,
    onOpenChange,
    mode,
    provider,
    isLoading,
    onSubmit,
    isUpdating
}: ProviderDialogProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<ProviderFormValues>({
        resolver: zodResolver(providerSchema),
    });

    useEffect(() => {
        if (provider && open) {
            const names = (provider.user_id?.display_name || '').split(' ');
            reset({
                firstname: names[0] || '',
                lastname: names.slice(1).join(' ') || '',
                base_price: provider.base_price,
                experience: provider.experience,
                city: provider.city,
                area: provider.area,
                pincode: provider.pincode,
                is_available: provider.is_available,
                is_featured: provider.is_featured,
                description: provider.description || '',
            });
        }
    }, [provider, open, reset]);

    const isEdit = mode === 'edit';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-none bg-background rounded-3xl shadow-2xl">
                <DialogHeader className="px-8 pt-8 pb-4 bg-muted/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-2xl overflow-hidden border-2 border-primary/20 shadow-xl shadow-primary/5">
                                {provider?.avatar ? (
                                    <img src={provider.avatar} alt="" className="size-full object-cover" />
                                ) : (
                                    provider?.user_id?.display_name?.charAt(0) || 'P'
                                )}
                            </div>
                            <div className="space-y-1">
                                <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-2">
                                    {provider?.user_id?.display_name || 'Loading...'}
                                    {provider?.is_approved ? (
                                        <Badge className="bg-emerald-500/10 text-emerald-600 border-none rounded-full h-6 text-[9px] font-black uppercase tracking-widest px-2.5 flex items-center gap-1 ml-2">
                                            <ShieldCheck size={10} strokeWidth={3} />
                                            Verified
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-orange-500/10 text-orange-600 border-none rounded-full h-6 text-[9px] font-black uppercase tracking-widest px-2.5 flex items-center gap-1 ml-2">
                                            <Clock size={10} strokeWidth={3} />
                                            Pending
                                        </Badge>
                                    )}
                                </DialogTitle>
                                <DialogDescription className="text-xs font-bold text-muted-foreground uppercase tracking-widest as-child" asChild>
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1.5"><Mail size={12} className="text-primary/60" /> {provider?.user_id?.email}</span>
                                        <span className="flex items-center gap-1.5"><span className="size-1 rounded-full bg-border" /> {provider?.category_id?.name}</span>
                                    </div>
                                </DialogDescription>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary size-8" />
                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground animate-pulse">Fetching Detailed Info...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                        <div className="px-8 py-6 space-y-6 overflow-y-auto max-h-[60vh] scrollbar-hide">
                            {/* Basic Info Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel>First Name</FieldLabel>
                                    <Input
                                        {...register('firstname')}
                                        disabled={!isEdit}
                                        className="rounded-xl border-border/40"
                                    />
                                    <FieldError errors={[errors.firstname]} />
                                </Field>
                                <Field>
                                    <FieldLabel>Last Name</FieldLabel>
                                    <Input
                                        {...register('lastname')}
                                        disabled={!isEdit}
                                        className="rounded-xl border-border/40"
                                    />
                                    <FieldError errors={[errors.lastname]} />
                                </Field>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel className="flex items-center gap-1.5">
                                        <IndianRupee size={12} /> Pricing
                                    </FieldLabel>
                                    <Input
                                        type="number"
                                        disabled={!isEdit}
                                        {...register('base_price', { valueAsNumber: true })}
                                        className="h-10 rounded-xl bg-background border-border/40 font-bold"
                                    />
                                    <FieldError errors={[errors.base_price]} />
                                </Field>
                                <Field>
                                    <FieldLabel className="flex items-center gap-1.5">
                                        <Briefcase size={12} /> Experience
                                    </FieldLabel>
                                    <Input
                                        type="number"
                                        disabled={!isEdit}
                                        {...register('experience', { valueAsNumber: true })}
                                        className="h-10 rounded-xl bg-background border-border/40 font-bold"
                                    />
                                    <FieldError errors={[errors.experience]} />
                                </Field>
                            </div>

                            {/* Location Details */}
                            <div className="grid grid-cols-3 gap-4">
                                <Field>
                                    <FieldLabel>City</FieldLabel>
                                    <Input
                                        {...register('city')}
                                        disabled={!isEdit}
                                        className="rounded-xl border-border/40"
                                    />
                                    <FieldError errors={[errors.city]} />
                                </Field>
                                <Field>
                                    <FieldLabel>Area</FieldLabel>
                                    <Input
                                        {...register('area')}
                                        disabled={!isEdit}
                                        className="rounded-xl border-border/40"
                                    />
                                    <FieldError errors={[errors.area]} />
                                </Field>
                                <Field>
                                    <FieldLabel>Pincode</FieldLabel>
                                    <Input
                                        {...register('pincode')}
                                        disabled={!isEdit}
                                        className="rounded-xl border-border/40"
                                    />
                                    <FieldError errors={[errors.pincode]} />
                                </Field>
                            </div>

                            {/* Description Row */}
                            <Field>
                                <FieldLabel>Description</FieldLabel>
                                <Textarea
                                    {...register('description')}
                                    disabled={!isEdit}
                                    className="h-24 rounded-2xl bg-muted/10 border-border/60 p-4 font-medium leading-relaxed resize-none"
                                    placeholder="Describe the service provider..."
                                />
                                <FieldError errors={[errors.description]} />
                            </Field>

                            {/* Status Controls */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`flex items-center gap-4 p-4 rounded-2xl border border-border/40 transition-all ${isEdit ? 'bg-background hover:bg-muted/5 cursor-pointer group' : 'bg-muted/10'}`}>
                                    <Controller
                                        name="is_available"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                id="is_available"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={!isEdit}
                                                className="size-5 rounded-md border-primary/20 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-none shadow-sm"
                                            />
                                        )}
                                    />
                                    <div className="flex flex-col">
                                        <Label htmlFor="is_available" className={`text-xs font-black uppercase tracking-widest ${isEdit ? 'cursor-pointer group-hover:text-foreground' : ''}`}>Available Status</Label>
                                        <span className="text-[10px] text-muted-foreground font-medium">Currently taking new bookings</span>
                                    </div>
                                    {provider?.is_available && !isEdit && <Badge className="bg-emerald-500/10 text-emerald-600 ml-auto border-none h-5 px-1.5"><ShieldCheck size={10} /></Badge>}
                                </div>

                                <div className={`flex items-center gap-4 p-4 rounded-2xl border border-border/40 transition-all ${isEdit ? 'bg-background hover:bg-muted/5 cursor-pointer group' : 'bg-muted/10'}`}>
                                    <Controller
                                        name="is_featured"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                id="is_featured"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={!isEdit}
                                                className="size-5 rounded-md border-primary/20 data-[state=checked]:bg-amber-500 data-[state=checked]:border-none shadow-sm"
                                            />
                                        )}
                                    />
                                    <div className="flex flex-col">
                                        <Label htmlFor="is_featured" className={`text-xs font-black uppercase tracking-widest ${isEdit ? 'cursor-pointer group-hover:text-foreground' : ''}`}>Featured Status</Label>
                                        <span className="text-[10px] text-muted-foreground font-medium">Promoted on homepage carousel</span>
                                    </div>
                                    {provider?.is_featured && !isEdit && <Badge className="bg-amber-500/10 text-amber-600 ml-auto border-none h-5 px-1.5"><Star size={10} fill="currentColor" /></Badge>}
                                </div>
                            </div>

                            {/* System Information - Extra details not in table */}
                            <div className="space-y-4 pt-4 border-t border-border/40">
                                <Label className="text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                    <div className="h-0.5 w-4 bg-primary rounded-full" />
                                    System Information
                                </Label>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4 px-1">
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 block">Registration Date</span>
                                        <p className="text-xs font-bold text-foreground">
                                            {provider?.createdAt ? new Date(provider.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'N/A'}
                                            <span className="text-[10px] text-muted-foreground font-medium ml-2 uppercase">
                                                {provider?.createdAt ? new Date(provider.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 block">Last Profile Update</span>
                                        <p className="text-xs font-bold text-foreground">
                                            {provider?.updatedAt ? new Date(provider.updatedAt).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'N/A'}
                                            <span className="text-[10px] text-muted-foreground font-medium ml-2 uppercase">
                                                {provider?.updatedAt ? new Date(provider.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </span>
                                        </p>
                                    </div>

                                    {provider?.is_approved && (
                                        <>
                                            <div className="space-y-1 col-span-1">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600/60 block">Approved At</span>
                                                <p className="text-xs font-bold text-foreground">
                                                    {provider?.approved_at ? new Date(provider.approved_at).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'N/A'}
                                                </p>
                                            </div>
                                            <div className="space-y-1 col-span-1">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600/60 block">Verified By</span>
                                                <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                                    <Badge className="bg-emerald-500/5 text-emerald-600 border border-emerald-500/10 h-5 px-2 text-[9px]">ADMIN</Badge>
                                                    {provider?.approved_by?.email || 'System Admin'}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="px-8 py-5 bg-muted/20 border-t border-border/40 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-xs border-border/60 hover:bg-background"
                            >
                                {isEdit ? 'Cancel' : 'Close'}
                            </Button>
                            {isEdit && (
                                <Button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="rounded-2xl h-12 px-10 font-black uppercase tracking-widest text-xs bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    {isUpdating ? (
                                        <>
                                            <Loader2 className="mr-2 animate-spin size-4" />
                                            Saving Changes...
                                        </>
                                    ) : (
                                        'Update Profile'
                                    )}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
