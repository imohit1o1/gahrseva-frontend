export function PendingStatusAlert() {
    return (
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
    );
}
