import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "@tanstack/react-router"
import type { Category } from "@/types/category"
import { Loader2, ArrowRight, User, Mail, Lock, MapPin, Briefcase, IndianRupee, Image as ImageIcon, FileText, Check, X, PartyPopper } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useUpload } from "@/hooks/useUpload"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { useAuth } from "@/hooks/useAuth"
import { useCategories } from "@/hooks/useCategories"
import { serviceProviderRegisterSchema, type ServiceProviderRegisterValues } from "@/schemas/auth"

export function ServiceProviderRegisterForm() {
    const { registerServiceProvider, isLoading, error } = useAuth()
    const { categories, isLoading: isCategoriesLoading } = useCategories()
    const { uploadImage, isUploading, uploadError } = useUpload()
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)

    const form = useForm<ServiceProviderRegisterValues>({
        resolver: zodResolver(serviceProviderRegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            category_id: "",
            city: "",
            area: "",
            pincode: "",
            base_price: 0,
            experience: 0,
            avatar: "",
            description: "",
        },
    })

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = await uploadImage(file)
            if (url) {
                form.setValue("avatar", url, { shouldValidate: true })
            }
        }
    }

    const onSubmit = async (values: ServiceProviderRegisterValues) => {
        const result = await registerServiceProvider(values)
        if (result.success) {
            setShowSuccessDialog(true)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 max-w-7xl mx-auto py-10 px-4 md:px-0">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <span className="text-sm font-black uppercase tracking-[0.3em] text-primary">Join Us</span>
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
                    Become a <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Service Provider</span>
                </h1>
                <p className="text-base text-muted-foreground mx-auto max-w-2xl font-medium">
                    Join our network of verified professionals and grow your business today.
                </p>
            </div>

            {error && (
                <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold text-center animate-in fade-in slide-in-from-top-4">
                    {error}
                </div>
            )}

            {/* Form Body Container */}
            <div className="bg-background border border-border/60 rounded-[2.5rem] p-6 lg:p-12 shadow-xl space-y-12">
                {/* [ PERSONAL INFORMATION & LOCATION ] */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border/40" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-foreground/40 bg-background px-4 py-1 rounded-full border border-border/40">
                            Personal Information & Location
                        </h3>
                        <div className="h-px flex-1 bg-border/40" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Field orientation="vertical">
                            <FieldLabel required>First Name</FieldLabel>
                            <FieldContent>
                                <div className="relative group">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 size-4 transition-colors group-focus-within:text-primary" />
                                    <Input placeholder="John" className="pl-11 h-12 rounded-xl transition-all border-border/60 focus:border-primary/40 focus:ring-primary/10 bg-background" {...form.register("first_name")} />
                                </div>
                                <FieldError errors={[form.formState.errors.first_name]} />
                            </FieldContent>
                        </Field>

                        <Field orientation="vertical">
                            <FieldLabel required>Last Name</FieldLabel>
                            <FieldContent>
                                <div className="relative group">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 size-4 transition-colors group-focus-within:text-primary" />
                                    <Input placeholder="Doe" className="pl-11 h-12 rounded-xl transition-all border-border/60 focus:border-primary/40 focus:ring-primary/10 bg-background" {...form.register("last_name")} />
                                </div>
                                <FieldError errors={[form.formState.errors.last_name]} />
                            </FieldContent>
                        </Field>

                        <Field orientation="vertical">
                            <FieldLabel required>Email Address</FieldLabel>
                            <FieldContent>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 size-4 transition-colors group-focus-within:text-primary" />
                                    <Input placeholder="john@example.com" className="pl-11 h-12 rounded-xl transition-all border-border/60 focus:border-primary/40 focus:ring-primary/10 bg-background" {...form.register("email")} />
                                </div>
                                <FieldError errors={[form.formState.errors.email]} />
                            </FieldContent>
                        </Field>

                        <Field orientation="vertical">
                            <FieldLabel required>Password</FieldLabel>
                            <FieldContent>
                                <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 size-4 transition-colors group-focus-within:text-primary" />
                                    <Input type="password" placeholder="••••••••" className="pl-11 h-12 rounded-xl transition-all border-border/60 focus:border-primary/40 focus:ring-primary/10 bg-background" {...form.register("password")} />
                                </div>
                                <FieldError errors={[form.formState.errors.password]} />
                            </FieldContent>
                        </Field>

                        <Field orientation="vertical">
                            <FieldLabel required>City</FieldLabel>
                            <FieldContent>
                                <div className="relative group">
                                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 size-4 transition-colors group-focus-within:text-primary" />
                                    <Input placeholder="Noida" className="pl-11 h-12 rounded-xl transition-all border-border/60 focus:border-primary/40 focus:ring-primary/10 bg-background" {...form.register("city")} />
                                </div>
                                <FieldError errors={[form.formState.errors.city]} />
                            </FieldContent>
                        </Field>

                        <Field orientation="vertical">
                            <FieldLabel required>Area</FieldLabel>
                            <FieldContent>
                                <div className="relative group">
                                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 size-4 transition-colors group-focus-within:text-primary" />
                                    <Input placeholder="Sector 62" className="pl-11 h-12 rounded-xl transition-all border-border/60 focus:border-primary/40 focus:ring-primary/10 bg-background" {...form.register("area")} />
                                </div>
                                <FieldError errors={[form.formState.errors.area]} />
                            </FieldContent>
                        </Field>

                        <Field orientation="vertical">
                            <FieldLabel required>Pincode</FieldLabel>
                            <FieldContent>
                                <div className="relative group">
                                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 size-4 transition-colors group-focus-within:text-primary" />
                                    <Input placeholder="201301" className="pl-11 h-12 rounded-xl transition-all border-border/60 focus:border-primary/40 focus:ring-primary/10 bg-background" {...form.register("pincode")} />
                                </div>
                                <FieldError errors={[form.formState.errors.pincode]} />
                            </FieldContent>
                        </Field>
                    </div>
                    <p className="text-[11px] text-muted-foreground/60 italic px-1 font-medium">
                        *Tip: Complete all fields accurately to set up your profile.*
                    </p>
                </div>

                {/* [ PROFESSIONAL DETAILS ] */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border/40" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-foreground/40 bg-background px-4 py-1 rounded-full border border-border/40">
                            Professional Details
                        </h3>
                        <div className="h-px flex-1 bg-border/40" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Field orientation="vertical">
                            <FieldLabel required>Service Category</FieldLabel>
                            <FieldContent>
                                <Select onValueChange={(value) => form.setValue("category_id", value)} disabled={isCategoriesLoading}>
                                    <SelectTrigger className="h-12 rounded-xl border-border/60 bg-background">
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="size-4 text-muted-foreground/40" />
                                            {isCategoriesLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="size-3 animate-spin" />
                                                    <span className="text-muted-foreground">Loading categories...</span>
                                                </div>
                                            ) : (
                                                <SelectValue placeholder="Select category" />
                                            )}
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {categories?.map((cat: Category) => (
                                            <SelectItem key={cat._id} value={cat._id} className="rounded-lg">
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FieldError errors={[form.formState.errors.category_id]} />
                            </FieldContent>
                        </Field>

                        <Field orientation="vertical">
                            <FieldLabel required>Base Price (₹)</FieldLabel>
                            <FieldContent>
                                <div className="relative group">
                                    <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 size-4 transition-colors group-focus-within:text-primary" />
                                    <Input type="number" placeholder="500" className="pl-11 h-12 rounded-xl transition-all border-border/60 focus:border-primary/40 focus:ring-primary/10 bg-background" {...form.register("base_price", { valueAsNumber: true })} />
                                </div>
                                <FieldError errors={[form.formState.errors.base_price]} />
                            </FieldContent>
                        </Field>

                        <Field orientation="vertical">
                            <FieldLabel required>Experience (Years)</FieldLabel>
                            <FieldContent>
                                <div className="relative group">
                                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 size-4 transition-colors group-focus-within:text-primary" />
                                    <Input type="number" placeholder="5" className="pl-11 h-12 rounded-xl transition-all border-border/60 focus:border-primary/40 focus:ring-primary/10 bg-background" {...form.register("experience", { valueAsNumber: true })} />
                                </div>
                                <FieldError errors={[form.formState.errors.experience]} />
                            </FieldContent>
                        </Field>

                        <div className="lg:col-span-4">
                            <Field orientation="vertical">
                                <FieldLabel required>Service Description</FieldLabel>
                                <FieldContent>
                                    <div className="relative group">
                                        <FileText className="absolute left-3.5 top-4 text-muted-foreground/40 size-4 transition-colors group-focus-within:text-primary" />
                                        <Textarea placeholder="Tell us about your services, skills, and expertise..." className="pl-11 min-h-[120px] rounded-2xl transition-all border-border/60 focus:border-primary/40 focus:ring-primary/10 bg-background resize-none" {...form.register("description")} />
                                    </div>
                                    <FieldError errors={[form.formState.errors.description]} />
                                </FieldContent>
                            </Field>
                        </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground/60 italic px-1 font-medium">
                        *Tip: Be clear and concise to attract more clients.*
                    </p>
                </div>

                {/* [ AVATAR IMAGE ] */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border/40" />
                        <h3 className="text-xs font-black uppercase tracking-widest text-foreground/40 bg-background px-4 py-1 rounded-full border border-border/40">
                            Avatar Image
                        </h3>
                        <div className="h-px flex-1 bg-border/40" />
                    </div>

                    <Field orientation="vertical">
                        <FieldContent>
                            <div className="flex items-center gap-6 p-6 rounded-3xl border border-dashed border-border/60 bg-background transition-all hover:bg-background/80 group">
                                <div className="relative shrink-0">
                                    {form.watch("avatar") ? (
                                        <>
                                            <div className="size-24 rounded-2xl overflow-hidden border-2 border-primary shadow-2xl shadow-primary/20">
                                                <img src={form.watch("avatar")} alt="Preview" className="size-full object-cover" />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => form.setValue("avatar", "")}
                                                className="absolute -top-2 -right-2 p-1.5 rounded-full bg-destructive text-white shadow-lg transition-all hover:scale-110 active:scale-95"
                                            >
                                                <X size={14} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="size-24 rounded-2xl border-2 border-dashed border-border/40 bg-background flex flex-col items-center justify-center text-muted-foreground/20 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                                            <ImageIcon size={32} />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 space-y-3">
                                    <p className="text-sm text-foreground font-bold">
                                        Select Profile Picture
                                    </p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Upload a clear professional photo. Recommended size: 400x400px.
                                    </p>
                                    <div className="relative isolate group/input">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={isUploading}
                                            className="h-10 text-xs p-1 pr-3 file:mr-3 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer rounded-2xl border-border/40 bg-background"
                                        />
                                        {isUploading && (
                                            <div className="absolute inset-0 z-10 bg-background/80 flex items-center justify-center rounded-2xl">
                                                <div className="flex items-center gap-2 text-[11px] text-primary font-black animate-pulse">
                                                    <Loader2 className="animate-spin size-3" />
                                                    Uploading...
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {form.watch("avatar") && !isUploading && (
                                        <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-black uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full w-fit">
                                            <Check size={12} />
                                            Upload Complete
                                        </div>
                                    )}
                                    {uploadError && (
                                        <p className="text-[10px] text-destructive font-bold bg-destructive/5 px-3 py-1 rounded-full w-fit">{uploadError}</p>
                                    )}
                                </div>
                            </div>
                            <input type="hidden" {...form.register("avatar")} />
                            <FieldError errors={[form.formState.errors.avatar]} />
                        </FieldContent>
                    </Field>
                    <p className="text-[11px] text-muted-foreground/60 italic px-1 font-medium">
                        *Tip: Upload a clear profile picture to increase trust.*
                    </p>
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
                <Button
                    type="submit"
                    className="group relative w-full h-16 text-lg font-black bg-primary hover:bg-primary/90 text-white rounded-[2rem] shadow-2xl shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95 overflow-hidden"
                    disabled={isLoading}
                >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                        {isLoading ? (
                            <Loader2 className="animate-spin size-6" />
                        ) : (
                            <>
                                Complete Registration
                                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </div>
                </Button>
            </div>

            <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <AlertDialogContent className="rounded-[2.5rem] p-8 md:p-12 border-border/60 shadow-2xl animate-in zoom-in-95 duration-300">
                    <AlertDialogHeader className="space-y-6">
                        <div className="mx-auto size-24 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-bounce">
                            <PartyPopper size={48} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-3 text-center">
                            <AlertDialogTitle className="text-3xl font-black tracking-tight text-foreground">
                                Registration Successful!
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-base text-muted-foreground font-medium leading-relaxed">
                                Welcome to the <span className="text-primary font-bold">GharSeva</span> family. Your professional profile has been created successfully. You can now log in to start receiving service requests.
                            </AlertDialogDescription>
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-10 sm:justify-center">
                        <AlertDialogAction asChild>
                            <Link
                                to="/login"
                                className="h-14 px-10 text-base font-black bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                            >
                                Continue to Login
                                <ArrowRight className="size-5" />
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </form>
    )
}
