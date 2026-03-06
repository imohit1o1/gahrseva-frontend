import { ProviderCard } from '../../providers/ProviderCard';
import { MOCK_PROVIDERS } from '../../../constants';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { SectionLayout } from '../section-layout/SectionLayout';

export function FeaturedProviders() {
    // Pick top 4 featured providers
    const featuredProviders = MOCK_PROVIDERS.filter(p => p.is_featured).slice(0, 4);

    if (featuredProviders.length === 0) return null;

    return (
        <SectionLayout>
            {/* Header Container */}
            <div className="text-center">
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    Featured Providers
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                    Top-rated experts ready to serve you today
                </p>
            </div>

            {/* Body Container*/}
            <div className="flex flex-col gap-6">
                {/* Link Button  */}
                <div className="flex justify-end">
                    <Link
                        to="/providers"
                        className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2"
                    >
                        View all providers
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Providers grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredProviders.map(provider => (
                        <ProviderCard key={provider.id} provider={provider} />
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}