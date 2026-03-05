export function BackgroundBlobs() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-10 top-[20%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -right-10 top-[25%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>
    );
}
