import { Star, Trash2, Eye, EyeOff, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';
import type { Review } from '../../../hooks/admin/useAdminReviews';

interface ReviewListProps {
    reviews: Review[] | undefined;
    isLoading: boolean;
    hideReview: any;
    showReview: any;
    deleteReview: any;
}

export function ReviewList({ reviews, isLoading, hideReview, showReview, deleteReview }: ReviewListProps) {
    return (
        <div className="grid gap-4 min-h-[400px]">
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin text-primary/40" />
                </div>
            ) : reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className={`rounded-3xl border border-border/60 bg-card p-6 shadow-sm transition-all ${review.is_hidden ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-0.5 text-amber-500">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    fill={i < review.rating ? "currentColor" : "none"}
                                                    className={i < review.rating ? "" : "text-muted-foreground/30"}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded-full">
                                            {review.rating}/5
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-medium">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MessageSquare size={18} className="mt-1 text-primary shrink-0" />
                                    <p className="text-sm font-medium leading-relaxed text-foreground/90 italic">
                                        "{review.comment}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 pt-2 border-t border-border/40">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">User ID</span>
                                        <span className="text-xs font-bold">{review.user_id}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Provider ID</span>
                                        <span className="text-xs font-bold">{review.provider_id}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-2 shrink-0">
                                {!review.is_hidden ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => hideReview.mutate(review._id)}
                                        disabled={hideReview.isPending}
                                        className="flex-1 md:w-32 rounded-xl text-xs font-bold border-amber-500/20 text-amber-600 hover:bg-amber-500/5 group"
                                    >
                                        <EyeOff size={14} className="mr-2 group-hover:scale-110 transition-transform" />
                                        Hide
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => showReview.mutate(review._id)}
                                        disabled={showReview.isPending}
                                        className="flex-1 md:w-32 rounded-xl text-xs font-bold border-green-500/20 text-green-600 hover:bg-green-500/5 group"
                                    >
                                        <Eye size={14} className="mr-2 group-hover:scale-110 transition-transform" />
                                        Show
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteReview.mutate(review._id)}
                                    disabled={deleteReview.isPending}
                                    className="flex-1 md:w-32 rounded-xl text-xs font-bold border-destructive/20 text-destructive hover:bg-destructive/5 group"
                                >
                                    <Trash2 size={14} className="mr-2 group-hover:scale-110 transition-transform" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl bg-muted/20">
                    <MessageSquare className="size-12 text-muted-foreground mb-4 opacity-20" />
                    <p className="text-muted-foreground font-medium">No reviews found.</p>
                </div>
            )}
        </div>
    );
}
