import {
    Sparkles, Droplets, Zap, Hammer,
    PaintBucket, Bug, Sprout, WashingMachine,
    ArrowRight, type LucideIcon,
} from 'lucide-react';
import { Card } from '../ui/card';
import { CATEGORIES } from '../../constants';

const ICON_MAP: Record<string, LucideIcon> = {
    Sparkles, Droplets, Zap, Hammer,
    PaintBucket, Bug, Sprout, WashingMachine,
};

export function Categories() {
    return (
        <section className="py-14 sm:py-16">

            {/* Body container */}
            <div className="flex flex-col gap-6">

                {/* 1st container — heading only */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                        Browse by Category
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Pick the service you need and we'll handle the rest
                    </p>
                </div>

                {/* 2nd container — see all + cards */}
                <div className="flex flex-col gap-4">

                    {/* See all */}
                    <div className="flex justify-end">
                        <a
                            href="#"
                            className="flex items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-70"
                        >
                            See all
                            <ArrowRight size={14} />
                        </a>
                    </div>

                    {/* Category cards */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {CATEGORIES.map((category) => {
                            const Icon = ICON_MAP[category.icon];
                            return (
                                <a key={category.label} href={category.href} className="group block">
                                    <Card className="gap-0 py-0 transition-shadow hover:shadow-md">
                                        <div className="flex flex-col items-center gap-3 p-6 text-center">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                                {Icon && <Icon size={22} />}
                                            </div>
                                            <span className="text-sm font-medium text-foreground">
                                                {category.label}
                                            </span>
                                        </div>
                                    </Card>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
