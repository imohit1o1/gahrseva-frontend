import { Link } from '@tanstack/react-router';
import { MapPin, Clock, ArrowRight, Star } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

const CATEGORY_COLORS: Record<string, string> = {
    'Home Cleaning': 'bg-blue-50 text-blue-600 border-blue-100',
    'Plumbing': 'bg-cyan-50 text-cyan-600 border-cyan-100',
    'Electrical': 'bg-amber-50 text-amber-600 border-amber-100',
    'Carpentry': 'bg-orange-50 text-orange-600 border-orange-100',
    'Painting': 'bg-rose-50 text-rose-600 border-rose-100',
    'Appliance Repair': 'bg-purple-50 text-purple-600 border-purple-100',
    'Pest Control': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Gardening': 'bg-lime-50 text-lime-600 border-lime-100',
};

export function ServiceProviderCard({ provider }: { provider: any }) {
    const name = provider.user_id?.display_name || 'Service Provider';
    const categoryName = provider.category_id?.name || 'General';
    const location = `${provider.city}, ${provider.area}`;
    const price = `₹${provider.base_price}`;
    const experience = `Exp. ${provider.experience} years`;
    const rating = provider.rating || 0;
    const reviews = provider.reviews || 0;

    return (
        <Card className="group relative overflow-hidden rounded-xl bg-white transition-all hover:shadow-xl hover:border-primary/30 flex flex-col h-full py-0 gap-0">
            {/* Full-width Avatar Section */}
            <div className="relative h-56 w-full overflow-hidden shrink-0">
                <img
                    src={provider.avatar}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/20 to-transparent" />

                {/* Active Badge at Top Right */}
                {provider.is_available && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-emerald-200/60 shadow-sm">
                        <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                    </div>
                )}
            </div>

            <CardHeader className="pt-3 pb-2 px-6">
                <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                        {name}
                    </CardTitle>
                    <Badge
                        variant="outline"
                        className={cn(
                            "shrink-0 font-semibold text-[10px] uppercase tracking-wider py-0.5 px-3 rounded-full border",
                            CATEGORY_COLORS[categoryName] || 'bg-slate-50 text-slate-600 border-slate-100'
                        )}
                    >
                        {categoryName}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4 px-6 pt-2">


                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        <Clock size={12} className="text-primary" />
                        {experience}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        <MapPin size={12} className="text-primary" />
                        <span className="truncate max-w-[120px]">{location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        <Star className="fill-primary text-primary" size={12} />
                        <span>{rating} ({reviews})</span>
                    </div>
                </div>

                <CardDescription className="line-clamp-2 text-sm text-slate-500 leading-relaxed italic">
                    "{provider.description}"
                </CardDescription>
            </CardContent>

            <CardFooter className="pt-4 pb-6 border-t border-slate-50 mt-auto flex items-center justify-between gap-4 px-6">
                <div className="flex flex-col">
                    <span className="text-xl font-bold text-slate-900">{price}</span>
                </div>
                <Link
                    to="/service-providers/$providerId"
                    params={{ providerId: provider._id }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary/10 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 group/btn"
                >
                    Book Now
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
            </CardFooter>
        </Card>
    );
}