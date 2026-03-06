import {
    UserCheck, CreditCard, ShieldCheck, ThumbsUp,
    MousePointerClick, CalendarDays, Home,
    Star, CheckCircle2, type LucideIcon
} from 'lucide-react';
import { Card } from '../../ui/card';
import { SOLUTION_POINTS, HOW_IT_WORKS, SOCIAL_PROOF } from '../../../constants';

const ICON_MAP: Record<string, LucideIcon> = {
    UserCheck, CreditCard, ShieldCheck, ThumbsUp,
    MousePointerClick, CalendarDays, Home,
    Star, CheckCircle2
};

export function Solution() {
    return (
        <section className="py-8 sm:py-12 relative px-4 sm:px-0">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col gap-20">

                {/* --- Solution Points --- */}
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {SOLUTION_POINTS.map((point) => {
                        const Icon = ICON_MAP[point.icon];
                        return (
                            <div key={point.label} className="group flex flex-col items-center text-center">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:-translate-y-2 group-hover:rotate-3">
                                    {Icon && <Icon size={30} strokeWidth={1.5} />}
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary leading-tight px-2">{point.label}</h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* --- How It Works --- */}
                <div className="relative rounded-[3rem] bg-linear-to-b from-primary/5 to-transparent border border-primary/10 px-8 py-16 sm:px-16 sm:py-24 overflow-hidden shadow-2xl shadow-primary/5">
                    {/* Glowing highlight */}
                    <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-y-1/2 bg-linear-to-r from-transparent via-primary/50 to-transparent" />

                    <div className="relative z-10 mx-auto mb-16 max-w-2xl text-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Simple Process</span>
                        <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                            How it <span className="text-primary italic">works</span>
                        </h2>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-12">
                        {/* Connecting line for desktop */}
                        <div className="absolute left-[15%] right-[15%] top-12 hidden h-0.5 border-t-2 border-dashed border-primary/30 md:block" />

                        {HOW_IT_WORKS.map((step, index) => {
                            const Icon = ICON_MAP[step.icon];
                            return (
                                <div key={step.title} className="group relative flex flex-col items-center text-center">
                                    <div className="relative mb-8 flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem] bg-background border-2 border-primary/20 text-primary shadow-xl z-20 transition-all duration-500 group-hover:border-primary group-hover:scale-105 group-hover:shadow-primary/10">
                                        {Icon && <Icon size={40} strokeWidth={1} />}
                                        <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-base font-black text-white shadow-lg border-2 border-background">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold text-foreground tracking-tight">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed px-4">{step.description}</p>
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
                            <Card key={proof.label} className="group flex items-center gap-6 p-8 border-border/50 bg-background transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 rounded-[2rem]">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-primary text-white shadow-lg shadow-primary/30 transition-all duration-500 group-hover:rotate-6">
                                    {Icon && <Icon size={28} className={proof.icon === 'Star' ? 'fill-current' : ''} />}
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-3xl font-extrabold text-foreground tracking-tighter">{proof.stat}</div>
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
