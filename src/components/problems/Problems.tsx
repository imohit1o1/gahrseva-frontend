import { EyeOff, ShieldAlert, Clock, type LucideIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { PROBLEM_POINTS } from '../../constants';

const ICON_MAP: Record<string, LucideIcon> = {
    EyeOff,
    ShieldAlert,
    Clock,
};

export function Problems() {
    return (
        <section className="py-14 sm:py-16">
            <div className="flex flex-col gap-10">

                {/* Heading */}
                <div className="text-center mx-auto max-w-2xl">
                    <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                        Finding reliable workers is <span className="text-destructive">difficult</span>
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                        We know the struggle of letting strangers into your home. That's why we built GharSeva to fix the broken industry standards.
                    </p>
                </div>

                {/* Problem Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {PROBLEM_POINTS.map((problem) => {
                        const Icon = ICON_MAP[problem.icon];
                        return (
                            <Card key={problem.label} className="flex flex-col items-center gap-3 p-6 text-center shadow-sm">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                                    {Icon && <Icon size={24} />}
                                </div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    {problem.label}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {problem.description}
                                </p>
                            </Card>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
