import { MapPin, Clock, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/card';

export function ProviderCard({ provider }: { provider: any }) {
    return (
        <Card className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-primary/30 p-5 flex flex-col gap-4">

            {/* Header: Avatar & Top-level Info */}
            <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                    <img
                        src={provider.image}
                        alt={provider.name}
                        className="h-16 w-16 rounded-full object-cover shadow-sm ring-2 ring-slate-100"
                    />
                    {provider.is_approved && (
                        <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5">
                            <ShieldCheck className="fill-emerald-500 text-white" size={18} />
                        </div>
                    )}
                </div>

                <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                                {provider.name}
                            </h3>
                            <span className="text-xs font-medium text-slate-500 mt-1 block">
                                {provider.category}
                            </span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-lg font-black text-slate-900">{provider.price}<span className="text-xs font-normal text-slate-500">/hr</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle: Stats & Description */}
            <CardContent className="p-0 flex-1 space-y-3">
                <div className="flex items-center gap-3 text-xs font-medium text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                    <div className="flex items-center gap-1">
                        <Star className="fill-amber-400 text-amber-400" size={14} />
                        <span className="text-slate-900 font-bold">{provider.rating}</span>
                        <span className="text-slate-400">({provider.reviews})</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <div className="flex items-center gap-1">
                        <Clock size={14} className="text-slate-400" />
                        {provider.experience}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="truncate max-w-[80px]">Greater Noida</span>
                    </div>
                </div>

                <p className="line-clamp-2 text-sm text-slate-600 leading-relaxed">
                    {provider.description}
                </p>
            </CardContent>

            {/* Footer */}
            <CardFooter className="p-0 pt-2 mt-auto">
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900/5 py-2.5 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-900 hover:text-white active:scale-[0.98]">
                    View Profile
                    <ArrowRight size={16} />
                </button>
            </CardFooter>
        </Card>
    );
}