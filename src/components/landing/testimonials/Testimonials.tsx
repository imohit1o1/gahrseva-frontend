import * as React from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../../constants';
import { SectionLayout } from '../section-layout/SectionLayout';
import { Card } from '../../ui/card';
export function Testimonials() {

    return (
        <SectionLayout>
            {/* Heading container */}
            <div className="text-center mb-16 px-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block text-center">Real Stories</span>
                <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl text-center">
                    What Our Customers <span className="text-primary">Say</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground text-center mx-auto max-w-2xl">
                    Trusted by thousands of happy families for reliable home services
                </p>
            </div>

            {/* Infinite Scroll Container */}
            <div className="relative w-full overflow-hidden py-4">
                {/* Gradient Masks for fade effect */}
                <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent md:w-32" />
                <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent md:w-32" />

                <div className="animate-infinite-scroll">
                    {/* Duplicate the list to ensure seamless looping */}
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((t, index) => (
                        <div key={index} className="w-[300px] md:w-[400px] px-3 shrink-0">
                            <Card className="relative overflow-hidden py-6 px-8 flex flex-col justify-between gap-5 border-slate-100/60 bg-white shadow-sm rounded-[2.5rem] h-full min-h-[220px]">
                                {/* Quote icon background */}
                                <div className="absolute top-6 right-8 text-primary/5">
                                    <Quote size={60} fill="currentColor" strokeWidth={0} />
                                </div>

                                {/* Review content */}
                                <div className="relative z-10 flex flex-col gap-4">
                                    <div className="flex gap-1 text-primary">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" />
                                        ))}
                                    </div>
                                    <p className="text-base font-semibold text-slate-800 leading-snug tracking-tight line-clamp-3">
                                        "{t.review}"
                                    </p>
                                </div>

                                {/* User information */}
                                <div className="relative z-10 flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-12 w-12 shrink-0">
                                            <div className="absolute inset-0 bg-primary/20 rounded-xl rotate-6" />
                                            <div className="relative h-full w-full overflow-hidden rounded-xl border-2 border-white bg-slate-50">
                                                <img
                                                    src={t.avatar}
                                                    alt={t.user}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-base font-black text-slate-900 leading-none mb-1">
                                                {t.user}
                                            </div>
                                            <div className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">
                                                {t.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative bottom indicator */}
                                <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-50/50">
                                    <div className="h-full w-full bg-primary/40" />
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}
