import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../../constants';
import { Link } from '@tanstack/react-router';
import { SectionLayout } from '../section-layout/SectionLayout';

export function Categories() {
    return (
        <SectionLayout>
            {/* Heading container */}
            <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Explore</span>
                <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    Browse by <span className="text-primary">Category</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground mx-auto max-w-2xl">
                    Pick the service you need and we'll handle the rest
                </p>
            </div>

            {/* Body container */}
            <div className="flex flex-col gap-6">

                {/* See all button */}
                <div className="flex justify-end">
                    <Link
                        to="/providers"
                        className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2"
                    >
                        See all
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Categories grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12">
                    {CATEGORIES.map((category) => (
                        <Link
                            key={category.label}
                            to="/providers"
                            className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
                        >
                            {/* Image wrapper */}
                            <div className="relative mb-4 aspect-square w-full max-w-[140px]">
                                <img
                                    src={category.image}
                                    alt={category.label}
                                    className="h-full w-full object-contain mix-blend-multiply filter drop-shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-xl"
                                />
                            </div>
                            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                {category.label}
                            </span>
                        </Link>
                    ))}
                </div>

            </div>
        </SectionLayout>
    );
}