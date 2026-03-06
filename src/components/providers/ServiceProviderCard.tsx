import { MapPin, Clock, ArrowRight, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/card';
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
    return (
        <Card className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-primary/30 p-5 flex flex-col gap-4">

            {/* Header: Avatar & Service Provider Info */}
            <div className="flex items-center gap-2">
                <div className="relative shrink-0">
                    <img
                        src={provider.image}
                        alt={provider.name}
                        className="h-16 w-16 rounded-full object-cover shadow-sm ring-2 ring-slate-100"
                    />
                </div>

                <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors truncate max-w-[150px]">
                                {provider.name}
                            </h3>
                            <div className="mt-1">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "font-medium text-[10px] uppercase tracking-wider",
                                        CATEGORY_COLORS[provider.category] || 'bg-slate-50 text-slate-600 border-slate-100'
                                    )}
                                >
                                    {provider.category}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex flex-col items-end pt-1">
                            <div className="flex items-center gap-1">
                                <Star className="fill-primary text-primary" size={14} />
                                <span className="text-sm font-bold text-slate-900 leading-none">{provider.rating}</span>
                                <span className="text-[10px] text-slate-400 font-medium leading-none">({provider.reviews})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle: Stats & Description */}
            <CardContent className="borde border-red-500 p-0 flex-1 flex flex-col justify-center space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="bg-slate-50/50 border-slate-200 text-slate-600 font-medium py-1 px-2.5 rounded-lg flex items-center gap-1.5 h-7">
                        <Clock size={13} className="text-slate-400" />
                        {provider.experience}
                    </Badge>
                    <Badge variant="outline" className="bg-slate-50/50 border-slate-200 text-slate-600 font-medium py-1 px-2.5 rounded-lg flex items-center gap-1.5 h-7">
                        <MapPin size={13} className="text-slate-400" />
                        <span className="truncate max-w-[200px]">{provider.location}</span>
                    </Badge>
                </div>

                <p className="line-clamp-2 text-sm text-slate-600 leading-relaxed max-h-full">
                    {provider.description}
                </p>
            </CardContent>

            {/* Footer */}
            <CardFooter className="p-0 pt-2 mt-auto flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-xl font-black text-slate-900 leading-none">{provider.price}</span>
                </div>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary/10 py-2.5 text-sm font-bold text-primary border border-primary/20 transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.98] min-w-[120px]">
                    Book Now
                    <ArrowRight size={16} />
                </button>
            </CardFooter>
        </Card>
    );
}