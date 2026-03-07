import { Link } from '@tanstack/react-router';
import { FOOTER_LINKS, SOCIAL_LINKS, LOGO } from '../../../constants';
import { useCategories } from '../../../hooks/useCategories';

export function FooterTop() {
    const { categories } = useCategories();

    // Replace static services with API categories
    const footerLinks = {
        ...FOOTER_LINKS,
        Services: categories?.slice(0, 4).map(c => c.name) || FOOTER_LINKS.Services
    };
    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand column */}
            <div className="lg:col-span-2">
                <Link to="/" className="inline-flex items-center">
                    <img src={LOGO.full} alt="GharSeva" className="h-10 w-32 object-cover" />
                </Link>
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
            {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                    <h3 className="mb-4 text-sm font-semibold text-foreground">{category}</h3>
                    <ul className="space-y-2.5">
                        {links.map((link) => (
                            <li key={link}>
                                <Link
                                    to="/"
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
