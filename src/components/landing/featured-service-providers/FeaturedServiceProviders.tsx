import { ServiceProviderCard } from '../../providers/ServiceProviderCard';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Loader2 } from 'lucide-react';
import { SectionLayout } from '../section-layout/SectionLayout';
import { useProviders } from '../../../hooks/useProviders';

export function FeaturedServiceProviders() {
    const { data: providersResponse, isLoading } = useProviders({
        limit: 6,
        is_featured: 'true'
    });

    const providers = providersResponse?.data?.providers || [];

    if (!isLoading && providers.length === 0) return null;

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
                    {isLoading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="h-[280px] w-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center">
                                <Loader2 className="animate-spin text-slate-300" />
                            </div>
                        ))
                    ) : (
                        providers.map((provider: any) => (
                            <ServiceProviderCard key={provider._id} provider={provider} />
                        ))
                    )}
                </div>
            </div>
        </SectionLayout>
    );
}