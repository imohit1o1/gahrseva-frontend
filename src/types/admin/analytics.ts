export interface AdminAnalyticsOverview {
    totalUsers: number;
    totalProviders: number;
    totalApprovedProviders: number;
    totalBookings: number;
    totalCompletedBookings: number;
    totalCancelledBookings: number;
    totalReviews: number;
    totalRevenue: number;
}

export type AdminAnalyticsResponse = AdminAnalyticsOverview;
