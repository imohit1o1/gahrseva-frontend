import { MousePointerClick, CalendarDays, Home as HomeIcon, type LucideIcon } from 'lucide-react';
import { HOW_IT_WORKS } from '../../../constants';
import { SectionLayout } from '../section-layout/SectionLayout';

const ICON_MAP: Record<string, LucideIcon> = {
    MousePointerClick,
    CalendarDays,
    Home: HomeIcon
};

export function HowItWorks() {
    return (
        <SectionLayout>
            <div className="relative px-8 py-16 sm:px-16 sm:py-24">
                {/* Heading container */}
                <div className="relative z-10 mx-auto mb-16 max-w-2xl text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Simple Process</span>
                    <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                        How it <span className="text-primary">works</span>
                    </h2>
                </div>

                {/* Body container */}
                <div className="relative z-10 grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-12">
                    {/* Connecting line for desktop */}
                    <div className="absolute left-[15%] right-[15%] top-12 hidden h-0.5 border-t-2 border-dashed border-primary/30 md:block" />

                    {HOW_IT_WORKS.map((step: { title: string; description: string; icon: string }, index: number) => {
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
        </SectionLayout>
    );
}
