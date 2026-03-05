import logo from '../../assets/full-gharseva-logo.webp';
import { FOOTER_LINKS, SOCIAL_LINKS } from '../../constants';

export function FooterTop() {
    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand column */}
            <div className="lg:col-span-2">
                <a href="/" className="inline-flex items-center">
                    <img src={logo} alt="GharSeva" className="h-10 w-32 object-cover" />
                </a>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    Professional home services at your doorstep. Trusted by thousands of happy customers across India.
                </p>

                {/* Socials */}
                <div className="mt-5 flex items-center gap-3">
                    {SOCIAL_LINKS.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                <div key={category}>
                    <h3 className="mb-4 text-sm font-semibold text-foreground">{category}</h3>
                    <ul className="space-y-2.5">
                        {links.map((link) => (
                            <li key={link}>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
