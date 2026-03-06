import { ServiceProviderCard } from '../../providers/ServiceProviderCard';
import { MOCK_SERVICE_PROVIDERS } from '../../../constants';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { SectionLayout } from '../section-layout/SectionLayout';

export function FeaturedServiceProviders() {
    // Pick top 4 featured service providers
    const featuredServiceProviders = MOCK_SERVICE_PROVIDERS.filter(p => p.is_featured).slice(0, 4);

    if (featuredServiceProviders.length === 0) return null;

    return (
        <SectionLayout>
            {/* Header Container */}
            <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Experts</span>
                <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    Featured <span className="text-primary">Service Providers</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground mx-auto max-w-2xl">
                    Top-rated experts ready to serve you today
                </p>
            </div>

            {/* Body Container*/}
            <div className="flex flex-col gap-6">
                {/* Link Button  */}
                <div className="flex justify-end">
                    <Link
                        to="/service-providers"
                        className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2"
                    >
                        View all service providers
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Service Providers grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredServiceProviders.map(provider => (
                        <ServiceProviderCard key={provider.id} provider={provider} />
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}