import { useAdminReviews } from '../../hooks/admin/useAdminReviews';
import { ReviewList } from '../../components/admin/reviews/ReviewList';

export default function AdminReviews() {
    const { reviews, isLoading, hideReview, showReview, deleteReview } = useAdminReviews();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Review Management</h1>
                <p className="text-muted-foreground">
                    Monitor and moderate user reviews across the platform.
                </p>
            </div>

            <ReviewList
                reviews={reviews}
                isLoading={isLoading}
                hideReview={hideReview}
                showReview={showReview}
                deleteReview={deleteReview}
            />
        </div>
    );
}
