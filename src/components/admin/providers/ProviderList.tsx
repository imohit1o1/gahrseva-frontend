import { CheckCircle2, Star, BadgeCheck, XCircle, Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';
import type { ServiceProvider } from '../../../types/admin/service';

interface ProviderListProps {
    providers: ServiceProvider[] | undefined;
    isLoading: boolean;
    approveProvider: any;
    rejectProvider: any;
}

export function ProviderList({ providers, isLoading, approveProvider, rejectProvider }: ProviderListProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 min-h-[400px]">
            {isLoading ? (
                <div className="col-span-full flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary/40" />
                </div>
            ) : providers && providers.length > 0 ? (
                providers.map((provider) => (
                    <div key={provider._id} className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden">
                                    <BadgeCheck size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        {provider.business_name}
                                        {provider.is_verified && <CheckCircle2 size={16} className="text-green-500" />}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{provider.description || 'No description.'}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full text-xs font-black">
                                    <Star size={12} fill="currentColor" />
                                    <span>{provider.rating}</span>
                                </div>
                                <span className="text-[10px] text-muted-foreground mt-1">{provider.review_count} reviews</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-3 rounded-2xl bg-muted/50 border border-border/40">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Price Mode</p>
                                <p className="font-bold text-sm">₹{provider.base_price}/hr</p>
                            </div>
                            <div className="p-3 rounded-2xl bg-muted/50 border border-border/40">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Experience</p>
                                <p className="font-bold text-sm">{provider.experience_years} Years</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {!provider.is_verified ? (
                                <>
                                    <Button
                                        onClick={() => approveProvider.mutate(provider._id)}
                                        disabled={approveProvider.isPending}
                                        className="flex-1 rounded-xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20"
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => rejectProvider.mutate(provider._id)}
                                        disabled={rejectProvider.isPending}
                                        className="flex-1 rounded-xl font-bold border-destructive/20 text-destructive hover:bg-destructive/5"
                                    >
                                        Reject
                                    </Button>
                                </>
                            ) : (
                                <Button variant="outline" className="flex-1 rounded-xl font-bold border-green-500/20 text-green-500 bg-green-500/5">
                                    Verified
                                </Button>
                            )}
                            <Button variant="outline" className="flex-1 rounded-xl font-bold">View Profile</Button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl bg-muted/20">
                    <XCircle className="size-12 text-muted-foreground mb-4 opacity-20" />
                    <p className="text-muted-foreground font-medium">No providers found.</p>
                </div>
            )}
        </div>
    );
}
