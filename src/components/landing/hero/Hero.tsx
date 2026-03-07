import { useState } from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { SERVICE_TAGS, TRUST_BADGES } from '../../../constants';
import { useCategories } from '../../../hooks/useCategories';
import { LeftIllustration } from './LeftIllustration';
import { RightIllustration } from './RightIllustration';

export function Hero() {
    const { categories } = useCategories();
    const [service, setService] = useState('');
    const [location, setLocation] = useState('');

    return (
        <section className="relative flex min-h-[calc(100vh-8rem)] flex-col justify-center text-center">

            <LeftIllustration />
            <RightIllustration />

            {/* Center Content */}
            <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4">

                {/* Pill */}
                <div className="mb-4 sm:mb-5 inline-flex self-center items-center gap-1.5 sm:gap-2 rounded-full border border-dashed border-primary/30 bg-primary/5 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-primary">
                    <CheckCircle2 size={14} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Trusted by 10,000+ homeowners across India
                </div>

                {/* Headline */}
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    Reliable Home Services
                    <span className="mt-1 block text-primary">at Your Doorstep</span>
                </h1>

                {/* Sub-headline */}
                <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
                    {SERVICE_TAGS.join(' • ')}
                </p>

                {/* Search bar */}
                <div className="mx-auto mt-10 flex max-w-2xl flex-col items-stretch gap-3 rounded-2xl border border-border/60 bg-background/80 p-3 shadow-lg backdrop-blur-sm sm:flex-row">

                    {/* Service dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex flex-1 items-center justify-between gap-2 rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm hover:border-primary/40 focus:outline-none">
                                <span className={service ? 'text-foreground' : 'text-muted-foreground'}>
                                    {service || 'Select a service'}
                                </span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted-foreground"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {categories?.map((s) => (
                                <DropdownMenuItem
                                    key={s._id}
                                    onClick={() => setService(s.name)}
                                >
                                    {s.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Location input */}
                    <div className="relative flex-1 text-left">
                        <MapPin size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Enter your location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="pl-9 py-5"
                        />
                    </div>

                    {/* CTA */}
                    <Button className="shrink-0 px-6">
                        Book Now
                    </Button>
                </div>

                {/* Trust badges */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                    {TRUST_BADGES.map(({ label }) => (
                        <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <CheckCircle2 size={14} className="text-primary" />
                            {label}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
