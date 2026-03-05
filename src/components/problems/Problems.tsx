import { EyeOff, ShieldAlert, Clock, type LucideIcon } from 'lucide-react';
import { PROBLEM_POINTS } from '../../constants';

const ICON_MAP: Record<string, LucideIcon> = {
    EyeOff,
    ShieldAlert,
    Clock,
};

export function Problems() {
    return (
        <section className="py-8 sm:py-12 relative overflow-hidden">
            {/* Background subtle tint */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-destructive/2 to-transparent -z-10" />

            <div className="flex flex-col gap-12 sm:gap-16">

                {/* Heading */}
                <div className="text-center mx-auto max-w-2xl px-4">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Finding reliable workers is <span className="text-destructive relative inline-block">
                            difficult
                            <svg className="absolute -bottom-1 left-0 w-full h-2 text-destructive/20" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" /></svg>
                        </span>
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                        We know the struggle of letting strangers into your home. That's why we built GharSeva to fix the broken industry standards.
                    </p>
                </div>

                {/* Problem Cards */}
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 px-4">
                    {PROBLEM_POINTS.map((problem) => {
                        const Icon = ICON_MAP[problem.icon];
                        return (
                            <div key={problem.label} className="group relative flex flex-col items-center text-center">
                                {/* Animated icon container */}
                                <div className="mb-6 relative h-20 w-20 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-destructive/10 rounded-3xl rotate-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-destructive/10 text-destructive shadow-md transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-destructive/20">
                                        {Icon && <Icon size={30} strokeWidth={1.5} />}
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-foreground">
                                    {problem.label}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground max-w-[260px]">
                                    {problem.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
