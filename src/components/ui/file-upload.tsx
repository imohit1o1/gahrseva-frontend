import React from "react";
import { Loader2, X, Image as ImageIcon, Check } from "lucide-react";
import { useUpload } from "@/hooks/useUpload";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FileUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
    label: string;
    description: string;
    icon?: React.ReactNode;
    accept?: string;
    className?: string;
    disabled?: boolean;
    variant?: 'primary' | 'purple' | 'emerald' | 'blue';
}

const variants = {
    primary: {
        border: 'border-primary/20',
        bg: 'bg-primary/[0.02]',
        hoverBg: 'hover:bg-primary/[0.05]',
        iconBg: 'bg-primary/5',
        iconColor: 'text-primary/40',
        iconHover: 'group-hover:border-primary/60',
        fileBtn: 'file:bg-primary hover:file:bg-primary/90',
        progress: 'text-primary'
    },
    purple: {
        border: 'border-purple-500/20',
        bg: 'bg-purple-500/[0.02]',
        hoverBg: 'hover:bg-purple-500/[0.05]',
        iconBg: 'bg-purple-500/5',
        iconColor: 'text-purple-500/40',
        iconHover: 'group-hover:border-purple-500/60',
        fileBtn: 'file:bg-purple-500 hover:file:bg-purple-600',
        progress: 'text-purple-600'
    },
    emerald: {
        border: 'border-emerald-500/20',
        bg: 'bg-emerald-500/[0.02]',
        hoverBg: 'hover:bg-emerald-500/[0.05]',
        iconBg: 'bg-emerald-500/5',
        iconColor: 'text-emerald-500/40',
        iconHover: 'group-hover:border-emerald-500/60',
        fileBtn: 'file:bg-emerald-500 hover:file:bg-emerald-600',
        progress: 'text-emerald-600'
    },
    blue: {
        border: 'border-blue-500/20',
        bg: 'bg-blue-500/[0.02]',
        hoverBg: 'hover:bg-blue-500/[0.05]',
        iconBg: 'bg-blue-500/5',
        iconColor: 'text-blue-500/40',
        iconHover: 'group-hover:border-blue-500/60',
        fileBtn: 'file:bg-blue-500 hover:file:bg-blue-600',
        progress: 'text-blue-600'
    }
};

export function FileUpload({
    value,
    onChange,
    onRemove,
    label,
    description,
    icon,
    accept = "image/*",
    className,
    disabled,
    variant = 'primary'
}: FileUploadProps) {
    const { uploadImage, isUploading, uploadError } = useUpload();
    const style = variants[variant];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = await uploadImage(file);
            if (url) {
                onChange(url);
            }
        }
    };

    return (
        <div className={cn(
            "flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[2rem] border-2 border-dashed transition-all group",
            style.border,
            style.bg,
            style.hoverBg,
            className
        )}>
            <div className="relative shrink-0">
                {value ? (
                    <>
                        <div className={cn(
                            "size-24 rounded-2xl overflow-hidden border-2 shadow-2xl",
                            variant === 'primary' ? "border-primary shadow-primary/20" :
                                variant === 'purple' ? "border-purple-500 shadow-purple-500/20" :
                                    "border-emerald-500 shadow-emerald-500/20"
                        )}>
                            <img src={value} alt="Preview" className="size-full object-cover" />
                        </div>
                        {onRemove && (
                            <button
                                type="button"
                                onClick={onRemove}
                                className="absolute -top-2 -right-2 p-1.5 rounded-full bg-destructive text-white shadow-lg transition-all hover:scale-110 active:scale-95"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </>
                ) : (
                    <div className={cn(
                        "size-24 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center",
                        style.iconBg,
                        style.iconColor,
                        style.iconHover
                    )}>
                        {icon || <ImageIcon size={32} />}
                    </div>
                )}
            </div>

            <div className="flex-1 space-y-3 w-full">
                <div>
                    <h4 className="text-sm font-black text-foreground uppercase tracking-tight">{label}</h4>
                    <p className="text-[10px] text-muted-foreground font-bold leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="relative isolate group/input">
                    <Input
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        disabled={isUploading || disabled}
                        className={cn(
                            "h-10 text-xs p-1 pr-3 file:mr-3 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:text-white cursor-pointer rounded-2xl bg-background",
                            style.border,
                            style.fileBtn
                        )}
                    />
                    {isUploading && (
                        <div className="absolute inset-0 z-10 bg-background/80 flex items-center justify-center rounded-2xl">
                            <div className={cn("flex items-center gap-2 text-[11px] font-black animate-pulse", style.progress)}>
                                <Loader2 className="animate-spin size-3" />
                                Uploading...
                            </div>
                        </div>
                    )}
                </div>

                {value && !isUploading && (
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
    );
}
