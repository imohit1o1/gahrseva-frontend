export function DashboardHeader() {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Provider <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-muted-foreground font-medium">
                Welcome back! Here's an overview of your service performance.
            </p>
        </div>
    );
}
