import { Link } from '@tanstack/react-router';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '../../ui/navigation-menu';
import { NAV_LINKS } from '../../../constants';
import { useCategories } from '../../../hooks/useCategories';
import { chunkIntoColumns } from '../../../lib/array-utils';
import { Loader2 } from 'lucide-react';

export function DesktopNav() {
    const { categories, isLoading } = useCategories();

    const chunkedCategories = chunkIntoColumns(categories, 3);

    const columnTitles = ['Home Maintenance', 'Cleaning & Pest', 'Appliance & Others'];

    return (
        <div className="hidden lg:flex">
            <NavigationMenu>
                <NavigationMenuList className="gap-2">
                    {NAV_LINKS.map((link) => {
                        if (link.label === 'Categories') {
                            return (
                                <NavigationMenuItem key={link.label}>
                                    <NavigationMenuTrigger className="px-2 py-1.5 text-sm font-medium text-foreground/70 bg-transparent hover:bg-transparent focus:bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary">
                                        {link.label}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-[600px] p-6 grid grid-cols-3 gap-8">
                                            {isLoading ? (
                                                <div className="col-span-full py-10 flex justify-center">
                                                    <Loader2 className="animate-spin text-primary/40" />
                                                </div>
                                            ) : chunkedCategories.map((group, idx) => (
                                                <div key={idx} className="space-y-4">
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary/60 px-2">
                                                        {columnTitles[idx]}
                                                    </h4>
                                                    <ul className="space-y-1">
                                                        {group.map((item) => (
                                                            <li key={item._id}>
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        to={`${NAV_LINKS[2].href}?category_slug=${encodeURIComponent(item.slug)}`}
                                                                        className="block rounded-xl p-2.5 transition-all hover:bg-primary/5 group/navitem"
                                                                    >
                                                                        <p className="text-sm font-bold text-foreground group-hover/navitem:text-primary">
                                                                            {item.name}
                                                                        </p>
                                                                        <p className="mt-0.5 text-[11px] text-muted-foreground leading-tight line-clamp-2">
                                                                            {item.description}
                                                                        </p>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            );
                        }

                        // Home, Providers, About, Contact - all as separate top-level nav items
                        const isExternal = link.href.startsWith('http');
                        const isSection = link.href.startsWith('#');

                        return (
                            <NavigationMenuItem key={link.label}>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to={isSection ? "/" : (isExternal ? link.href : link.href)}
                                        hash={isSection ? link.href.replace('#', '') : undefined}
                                        target={isExternal ? "_blank" : undefined}
                                        className="px-2 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-transparent hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        );
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
