import { Search, X, SlidersHorizontal, Check } from 'lucide-react';
import { CATEGORIES, PagintationConstants } from '../../constants';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { ServiceProviderCard } from './ServiceProviderCard';
import { useProviders } from '../../hooks/useProviders';
import { cn } from '../../lib/utils';
import { SectionLayout } from '../landing/section-layout/SectionLayout';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../ui/popover';

export function ServiceProviders() {
    const searchParams = useSearch({ from: '/public/service-providers' });
    const navigate = useNavigate({ from: '/service-providers' });


    const selectedCategorySlug = searchParams.category_slug || null;
    const currentPage = searchParams.page || PagintationConstants.PAGE;
    const searchQuery = searchParams.search || '';
    const isAvailable = searchParams.is_available === 'true';
    const itemsPerPage = PagintationConstants.LIMIT;

    const { data: providersResponse, isLoading: isProvidersLoading } = useProviders({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        category_slug: selectedCategorySlug || undefined,
        is_available: isAvailable ? 'true' : undefined
    });

    const providers = providersResponse?.data?.providers || [];
    const pagination = providersResponse?.data?.pagination;
    const totalPages = pagination?.total_pages || 0;
    const totalResults = pagination?.total || 0;

    const setSelectedCategory = (val: string | null) => {
        navigate({
            search: (prev: any) => ({ ...prev, category_slug: val || undefined, page: 1 }),
            replace: true,
        });
    };

    const setSearchQuery = (val: string) => {
        navigate({
            search: (prev: any) => ({ ...prev, search: val || undefined, page: 1 }),
            replace: true,
        });
    };

    const toggleAvailability = () => {
        navigate({
            search: (prev: any) => ({
                ...prev,
                is_available: prev.is_available === 'true' ? undefined : 'true',
                page: 1
            }),
            replace: true,
        });
    };

    const setPage = (page: number) => {
        navigate({
            search: (prev: any) => ({ ...prev, page }),
            replace: true,
        });
    };

    const clearFilters = () => {
        navigate({
            search: {},
            replace: true,
        });
    };

    return (
        <SectionLayout>
            {/* Premium Header with Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                        Service <span className="text-primary italic font-black">Providers</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        {totalResults} professional{totalResults !== 1 ? 's' : ''} found in your area
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {/* Search Field */}
                    <div className="relative w-full sm:w-72 group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="City or area..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50/50 border border-slate-200 focus:border-primary/30 focus:bg-white rounded-xl py-2.5 pl-10 pr-10 text-sm font-semibold text-slate-900 placeholder:text-slate-400 transition-all outline-hidden"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <Popover>
                        <PopoverTrigger asChild>
                            <button className={cn(
                                "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all active:scale-95",
                                (isAvailable || (selectedCategorySlug && !CATEGORIES.slice(0, 4).some(c => c.slug === selectedCategorySlug)))
                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                            )}>
                                <SlidersHorizontal size={16} />
                                More Filters
                                {(isAvailable || selectedCategorySlug) && (
                                    <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white text-[10px] text-slate-900 ml-1 font-black">
                                        {(isAvailable ? 1 : 0) + (selectedCategorySlug ? 1 : 0)}
                                    </span>
                                )}
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-2 rounded-2xl border-slate-200 shadow-xl mr-4" align="end">
                            <div className="flex flex-col">
                                <div className="px-3 py-2 flex items-center justify-between border-b border-slate-50 mb-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filters</span>
                                    {(isAvailable || selectedCategorySlug) && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-[10px] font-bold text-primary hover:underline px-1"
                                        >
                                            Reset All
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={toggleAvailability}
                                    className={cn(
                                        "flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left",
                                        isAvailable ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            isAvailable ? "bg-primary animate-pulse" : "bg-slate-300"
                                        )} />
                                        Available Now
                                    </div>
                                    {isAvailable && <Check size={14} />}
                                </button>

                                <div className="px-3 py-2 mt-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Categories</span>
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={cn(
                                            "flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-semibold transition-colors text-left",
                                            selectedCategorySlug === null ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        All Services
                                        {selectedCategorySlug === null && <Check size={14} />}
                                    </button>
                                    {CATEGORIES.map((cat) => {
                                        const isActive = selectedCategorySlug === cat.slug;
                                        return (
                                            <button
                                                key={cat.label}
                                                onClick={() => setSelectedCategory(cat.slug)}
                                                className={cn(
                                                    "flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-semibold transition-colors text-left",
                                                    isActive ? "bg-primary/5 text-primary" : "text-slate-600 hover:bg-slate-50"
                                                )}
                                            >
                                                {cat.label}
                                                {isActive && <Check size={14} />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>


            {/* Active Filters Row */}
            {(selectedCategorySlug || searchQuery || isAvailable) && (
                <div className="flex flex-wrap items-center gap-3 mb-12 animate-in fade-in slide-in-from-top-2 duration-300">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">Applied Filters:</span>

                    {searchQuery && (
                        <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                            <span>Search: {searchQuery}</span>
                            <button onClick={() => setSearchQuery('')} className="hover:text-primary transition-colors">
                                <X size={12} />
                            </button>
                        </div>
                    )}

                    {selectedCategorySlug && (
                        <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold border border-primary/20 shadow-sm">
                            <span>Category: {CATEGORIES.find(c => c.slug === selectedCategorySlug)?.label || selectedCategorySlug}</span>
                            <button onClick={() => setSelectedCategory(null)} className="hover:text-primary-foreground transition-colors bg-primary/20 rounded-full p-0.5">
                                <X size={10} />
                            </button>
                        </div>
                    )}

                    {isAvailable && (
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200 shadow-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Available Only</span>
                            <button onClick={toggleAvailability} className="hover:text-emerald-900 transition-colors">
                                <X size={12} />
                            </button>
                        </div>
                    )}

                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80 transition-all hover:bg-primary/5 px-3 py-1.5 rounded-full ml-auto group"
                    >
                        <X size={14} className="group-hover:rotate-90 transition-transform" />
                        Clear filters
                    </button>
                </div>
            )}

            {/* Providers Grid */}
            {isProvidersLoading ? (
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[300px] rounded-3xl bg-slate-50 animate-pulse" />
                    ))}
                </div>
            ) : providers.length > 0 ? (
                <>
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {providers.map((provider: any, idx: number) => (
                            <div
                                key={provider._id}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                                style={{ animationDelay: `${idx * 40}ms` }}
                            >
                                <ServiceProviderCard provider={provider} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-20 flex justify-center">
                            <Pagination>
                                <PaginationContent className="gap-2">
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setPage(Math.max(1, currentPage - 1))}
                                            className={cn(
                                                "rounded-xl border-slate-200",
                                                currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-slate-50'
                                            )}
                                        />
                                    </PaginationItem>

                                    {[...Array(totalPages)].map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                isActive={currentPage === i + 1}
                                                onClick={() => setPage(i + 1)}
                                                className={cn(
                                                    "rounded-xl border-slate-200 cursor-pointer transition-all h-10 w-10 p-0 flex items-center justify-center text-sm font-bold",
                                                    currentPage === i + 1
                                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                        : "text-slate-600 hover:bg-slate-50"
                                                )}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                                            className={cn(
                                                "rounded-xl border-slate-200",
                                                currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-slate-50'
                                            )}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/30">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 text-slate-200">
                        <Search size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">No experts found</h3>
                    <p className="mt-2 text-slate-500 font-medium max-w-xs mx-auto">
                        Try adjusting your filters or searching for something else.
                    </p>
                    <button
                        onClick={clearFilters}
                        className="mt-8 rounded-2xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all active:scale-95"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </SectionLayout>
    );
}
