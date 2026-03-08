export function DashboardEmptyState() {
    return (
        <div className="p-12 rounded-[3rem] bg-background border border-border/60 shadow-sm text-center space-y-4">
            <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <span className="text-2xl font-black">?</span>
            </div>
            <h3 className="text-xl font-black text-foreground">No activity yet</h3>
            <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                Once you start receiving bookings, they will appear here. Keep your profile updated to attract more customers!
            </p>
        </div>
    );
}
