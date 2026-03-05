import {
    UserCheck, CreditCard, ShieldCheck, ThumbsUp,
    MousePointerClick, CalendarDays, Home,
    Star, CheckCircle2, type LucideIcon
} from 'lucide-react';
import { Card } from '../ui/card';
import { SOLUTION_POINTS, HOW_IT_WORKS, SOCIAL_PROOF } from '../../constants';

const ICON_MAP: Record<string, LucideIcon> = {
    UserCheck, CreditCard, ShieldCheck, ThumbsUp,
    MousePointerClick, CalendarDays, Home,
    Star, CheckCircle2
};

export function Solution() {
    return (
        <section className="py-14 sm:py-16">
            <div className="flex flex-col gap-16">

                {/* --- Solution Points --- */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {SOLUTION_POINTS.map((point) => {
                        const Icon = ICON_MAP[point.icon];
                        return (
                            <div key={point.label} className="flex flex-col items-center text-center">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    {Icon && <Icon size={28} />}
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-foreground">{point.label}</h3>
                                <p className="text-sm text-muted-foreground">{point.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* --- How It Works --- */}
                <div className="rounded-3xl bg-primary/5 px-6 py-12 sm:px-12 sm:py-16">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            How it works
                        </h2>
                        <p className="mt-4 text-base text-muted-foreground">
                            Getting your home services sorted is as easy as 1-2-3.
                        </p>
                    </div>

                    <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
                        {/* Connecting line for desktop */}
                        <div className="absolute left-[15%] right-[15%] top-8 hidden h-0.5 border-t-2 border-dashed border-primary/20 md:block" />

                        {HOW_IT_WORKS.map((step, index) => {
                            const Icon = ICON_MAP[step.icon];
                            return (
                                <div key={step.title} className="relative flex flex-col items-center text-center">
                                    <div className="relative mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-background border border-primary/20 text-primary shadow-sm z-10">
                                        {Icon && <Icon size={24} />}
                                        <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground border-2 border-background">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* --- Social Proof --- */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {SOCIAL_PROOF.map((proof) => {
                        const Icon = ICON_MAP[proof.icon];
                        return (
                            <Card key={proof.label} className="flex items-center gap-5 p-6 shadow-sm transition-shadow hover:shadow-md">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                                    {Icon && <Icon size={26} className={proof.icon === 'Star' ? 'fill-current' : ''} />}
                                </div>
                                <div className="text-left">
                                    <div className="text-2xl font-black text-foreground">{proof.stat}</div>
                                    <div className="text-sm font-medium text-muted-foreground">{proof.label}</div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
