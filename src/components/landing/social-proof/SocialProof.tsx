import { Star, UserCheck, CheckCircle2, type LucideIcon } from 'lucide-react';
import { Card } from '../../ui/card';
import { SOCIAL_PROOF } from '../../../constants';
import { SectionLayout } from '../section-layout/SectionLayout';

const ICON_MAP: Record<string, LucideIcon> = {
    Star,
    UserCheck,
    CheckCircle2
};

export function SocialProof() {
    return (
        <SectionLayout>
            {/* Heading container */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    What Our Customers <span className="text-primary">Say</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground">
                    Trusted by thousands of happy families for reliable home services
                </p>
            </div>

            {/* Body container */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {SOCIAL_PROOF.map((proof) => {
                    const Icon = ICON_MAP[proof.icon];
                    return (
                        <Card key={proof.label} className="group relative overflow-hidden p-8 sm:p-10 flex flex-col items-center text-center gap-6 border-slate-100 bg-white transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 rounded-[3.5rem] shadow-sm">
                            {/* Decorative background flare */}
                            <div className="absolute -right-6 -top-6 h-28 w-28 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Icon container */}
                            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-slate-50 text-primary shadow-inner transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-12">
                                {Icon && <Icon size={32} strokeWidth={1.5} className={proof.icon === 'Star' ? 'fill-current' : ''} />}
                            </div>

                            <div className="relative z-10 flex flex-col gap-2">
                                <div className="text-4xl font-black text-slate-900 tracking-tighter sm:text-5xl leading-none">
                                    {proof.stat}
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors duration-300 leading-tight">
                                    {proof.label}
                                </div>
                            </div>

                            {/* Decorative bottom bar */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-100 rounded-t-full group-hover:bg-primary group-hover:w-24 transition-all duration-500" />
                        </Card>
                    );
                })}
            </div>
        </SectionLayout>
    );
}
