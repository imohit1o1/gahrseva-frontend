import { Search, Filter, ArrowLeft } from 'lucide-react';
import { MOCK_PROVIDERS, CATEGORIES } from '../../constants';
import { useState } from 'react';
import { ProviderCard } from './ProviderCard';

export function ServiceProviders() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProviders = MOCK_PROVIDERS.filter(provider => {
        const matchesCategory = !selectedCategory || provider.category === selectedCategory;
        const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pt-20 pb-12 bg-slate-50/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </button>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Service Providers
                    </h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Discover top-rated professionals for your home needs.
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="sticky top-20 z-30 mb-8 rounded-2xl p-4 shadow-sm border border-slate-100 backdrop-blur-md bg-white/80">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name or service..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${selectedCategory === null
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                All Types
                            </button>
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.label}
                                    onClick={() => setSelectedCategory(cat.label)}
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${selectedCategory === cat.label
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            <Filter size={18} />
                            More Filters
                        </button>
                    </div>
                </div>

                {/* Providers Grid */}
                {filteredProviders.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProviders.map((provider) => (
                            <ProviderCard key={provider.id} provider={provider} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 rounded-full bg-slate-100 p-6">
                            <Search size={40} className="text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No providers found</h3>
                        <p className="mt-2 text-slate-500">Try adjusting your filters or search terms.</p>
                        <button
                            onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                            className="mt-6 font-semibold text-primary hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
