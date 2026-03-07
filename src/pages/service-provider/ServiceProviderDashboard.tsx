import { useAuthStore } from "../../store/authStore";

export default function ServiceProviderDashboard() {
    const auth = useAuthStore();

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                    Provider <span className="text-primary">Dashboard</span>
                </h1>
                <p className="text-muted-foreground font-medium">
                    Welcome back! Here's an overview of your service performance.
                </p>
            </div>

            {!auth.user?.isVerified && (
                <div className="p-6 rounded-[2rem] bg-orange-50 border border-orange-100 flex flex-col md:flex-row items-center gap-4 text-orange-900 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="size-12 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0">
                        <svg className="size-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="font-black text-lg">Account Pending Approval</h4>
                        <p className="text-sm font-medium opacity-80">
                            Your account is currently under review by our team. You'll be able to receive bookings once your profile is verified.
                        </p>
                    </div>
                </div>
            )}

            {auth.user?.isVerified && (
                <>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="p-8 rounded-[2rem] bg-background border border-border/60 shadow-sm flex flex-col gap-1">
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Total Earnings</span>
                            <span className="text-3xl font-black text-foreground">₹0</span>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-background border border-border/60 shadow-sm flex flex-col gap-1">
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Total Bookings</span>
                            <span className="text-3xl font-black text-foreground">0</span>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-background border border-border/60 shadow-sm flex flex-col gap-1">
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Average Rating</span>
                            <span className="text-3xl font-black text-foreground">0.0</span>
                        </div>
                    </div>

                    <div className="p-12 rounded-[3rem] bg-background border border-border/60 shadow-sm text-center space-y-4">
                        <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                            <span className="text-2xl font-black">?</span>
                        </div>
                        <h3 className="text-xl font-black text-foreground">No activity yet</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                            Once you start receiving bookings, they will appear here. Keep your profile updated to attract more customers!
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
