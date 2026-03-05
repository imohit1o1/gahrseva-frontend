export function FooterBottom() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
            <p className="text-xs text-muted-foreground">
                © {currentYear} GharSeva. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <a href="#" className="transition-colors hover:text-primary">Privacy</a>
                <span>·</span>
                <a href="#" className="transition-colors hover:text-primary">Terms</a>
                <span>·</span>
                <a href="#" className="transition-colors hover:text-primary">Cookies</a>
            </div>
        </div>
    );
}
