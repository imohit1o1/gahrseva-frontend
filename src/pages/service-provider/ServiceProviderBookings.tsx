export default function ServiceProviderBookings() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                    Service <span className="text-primary">Bookings</span>
                </h1>
                <p className="text-muted-foreground font-medium">
                    Manage your upcoming and past service requests.
                </p>
            </div>

            <div className="p-16 rounded-[3rem] bg-background border border-border/60 shadow-sm text-center space-y-4">
                <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <span className="text-2xl font-black">📅</span>
                </div>
                <h3 className="text-xl font-black text-foreground">No bookings found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                    You haven't received any bookings yet. Keep your profile active to start getting requests!
                </p>
            </div>
        </div>
    );
}
