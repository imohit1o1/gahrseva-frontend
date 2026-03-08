import { Clock, CheckCircle2, PlayCircle, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
    { id: 'requested', title: 'Pending', icon: Clock, color: 'amber' },
    { id: 'accepted', title: 'Accepted', icon: CheckCircle2, color: 'blue' },
    { id: 'in_progress', title: 'In Progress', icon: PlayCircle, color: 'purple' },
    { id: 'completed', title: 'Completed', icon: Coffee, color: 'emerald' }
];

const colorMap: Record<string, { text: string, border: string, bg: string, ring: string, line: string, iconBg: string }> = {
    amber: { text: 'text-amber-600', border: 'border-amber-200', bg: 'bg-amber-50', ring: 'ring-amber-400/20', line: 'bg-amber-200', iconBg: 'bg-amber-100/50' },
    blue: { text: 'text-blue-600', border: 'border-blue-200', bg: 'bg-blue-50', ring: 'ring-blue-400/20', line: 'bg-blue-200', iconBg: 'bg-blue-100/50' },
    purple: { text: 'text-purple-600', border: 'border-purple-200', bg: 'bg-purple-50', ring: 'ring-purple-400/20', line: 'bg-purple-200', iconBg: 'bg-purple-100/50' },
    emerald: { text: 'text-emerald-600', border: 'border-emerald-200', bg: 'bg-emerald-50', ring: 'ring-emerald-400/20', line: 'bg-emerald-200', iconBg: 'bg-emerald-100/50' },
    neutral: { text: 'text-muted-foreground/40', border: 'border-muted', bg: 'bg-muted/5', ring: 'ring-transparent', line: 'bg-muted', iconBg: 'bg-muted/10' }
};

interface BookingProgressStepperProps {
    status: string;
    className?: string;
}

export function BookingProgressStepper({ status, className }: BookingProgressStepperProps) {
    const getStepState = (stepId: string) => {
        if (stepId === 'requested') {
            return { completed: true, active: status === 'requested' };
        }
        if (stepId === 'accepted') {
            const isAtLeastAccepted = ['accepted', 'confirmed', 'in_progress', 'completed', 'cancelled', 'rejected'].includes(status);
            const isCancelledEarly = ['rejected'].includes(status);
            return { completed: isAtLeastAccepted, active: status === 'accepted' || status === 'confirmed' || isCancelledEarly, cancelled: isCancelledEarly };
        }
        if (stepId === 'in_progress') {
            const isAtLeastInProgress = ['in_progress', 'completed', 'cancelled'].includes(status);
            return { completed: isAtLeastInProgress, active: status === 'in_progress' };
        }
        if (stepId === 'completed') {
            const isFinished = ['completed', 'cancelled'].includes(status);
            return { completed: isFinished, active: isFinished, cancelled: status === 'cancelled' };
        }
        return { completed: false, active: false };
    };

    const getCurrentStepIndex = () => {
        if (['completed', 'cancelled'].includes(status)) return 3;
        if (['in_progress'].includes(status)) return 2;
        if (['accepted', 'confirmed', 'rejected'].includes(status)) return 1;
        return 0;
    };
    const currentIndex = getCurrentStepIndex();

    return (
        <div className={cn("relative py-6 overflow-hidden sm:overflow-visible border-t border-border", className)}>
            <div className="relative z-10 grid grid-cols-4 gap-4">
                {/* Connecting lines */}
                <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-0.5 md:block">
                    {/* Background line */}
                    <div className="absolute inset-0 border-t-2 border-dashed border-muted/50" />
                    {/* Active progress line */}
                    <div
                        className="absolute inset-y-0 left-0 border-t-2 border-primary transition-all duration-1000 ease-in-out"
                        style={{ width: `${(currentIndex / 3) * 100}%` }}
                    />
                </div>
                {STEPS.map((step, index) => {
                    const Icon = step.icon;
                    const { completed, active, cancelled } = getStepState(step.id);
                    const isFilled = completed || active;
                    const colors = isFilled ? colorMap[step.color] : colorMap.neutral;

                    return (
                        <div key={step.id} className="group relative flex flex-col items-center text-center gap-4">
                            <div className={cn(
                                "relative size-12 flex items-center justify-center rounded-2xl border-2 transition-all duration-700 z-20",
                                "group-hover:scale-110 group-hover:-rotate-6",
                                isFilled ? cn(colors.bg, colors.border, "shadow-lg shadow-" + step.color + "-500/10") : "bg-background border-muted border-dashed",
                                active && "ring-8 " + colors.ring,
                                cancelled && "border-destructive/40 bg-destructive/5"
                            )}>
                                <Icon size={20} strokeWidth={isFilled ? 2 : 1} className={cn(
                                    "transition-all duration-500 group-hover:scale-125",
                                    isFilled ? colors.text : "text-muted-foreground/30",
                                    cancelled && "text-destructive"
                                )} />

                                {/* Rotating border for active state */}
                                {active && (
                                    <div className={cn(
                                        "absolute -inset-1 rounded-[1.1rem] border-2 border-dashed animate-[spin_10s_linear_infinite] opacity-50",
                                        colors.border
                                    )} />
                                )}

                                {/* Success/Error checkmarks */}
                                {completed && !active && !cancelled && (
                                    <div className="absolute -top-1.5 -right-1.5 size-4 rounded-md bg-emerald-500 text-[8px] flex items-center justify-center text-white border-2 border-background shadow-sm animate-in zoom-in-50 duration-300">
                                        ✓
                                    </div>
                                )}
                                {cancelled && (
                                    <div className="absolute -top-1.5 -right-1.5 size-4 rounded-md bg-destructive text-[8px] flex items-center justify-center text-white border-2 border-background shadow-sm font-black animate-in zoom-in-50 duration-300">
                                        ✕
                                    </div>
                                )}

                                {/* Step order number */}
                                <div className={cn(
                                    "absolute -bottom-1.5 right-1/2 translate-x-1/2 flex h-4 px-2 items-center justify-center rounded-full text-[8px] font-black shadow-sm border-2 border-background leading-none bg-background",
                                    isFilled ? colors.text : "text-muted-foreground/40"
                                )}>
                                    {index + 1}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.2em] transition-colors block leading-none",
                                    isFilled ? "text-foreground" : "text-muted-foreground/30",
                                    cancelled && "text-destructive"
                                )}>
                                    {step.title}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
