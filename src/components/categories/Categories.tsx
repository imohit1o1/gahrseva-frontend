import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../constants';

// We map labels to a cleaner import if needed, but since we use public-relative src paths in CATEGORIES, 
// and they are in src/assets, we can just use those strings or use new URL for robustness in Vite
export function Categories() {
    return (
        <section className="py-8 sm:py-12">

            {/* Body container */}
            <div className="flex flex-col gap-10">

                {/* Heading container */}
                <div className="text-center">
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Browse by Category
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                        Pick the service you need and we'll handle the rest
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    {/* See all — pushed to the right */}
                    <div className="flex justify-end pr-2">
                        <a
                            href="#"
                            className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2"
                        >
                            See all
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    {/* Categories grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 px-4 sm:px-0">
                        {CATEGORIES.map((category) => (
                            <a
                                key={category.label}
                                href={category.href}
                                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
                            >
                                {/* Transparent Image Wrapper */}
                                <div className="relative mb-4 aspect-square w-full max-w-[140px] overflow-visible">
                                    <img
                                        src={category.image}
                                        alt={category.label}
                                        className="h-full w-full object-contain mix-blend-multiply filter drop-shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-xl"
                                    />
                                </div>
                                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                    {category.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
