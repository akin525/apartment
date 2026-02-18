'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Bed, Bath, Maximize, Heart, Star, Filter,
  X, Grid3X3, List, SlidersHorizontal, ArrowUpDown,
  Home, ChevronDown, Check, Loader2
} from 'lucide-react';
import { apartments, states, cities, apartmentTypes } from '@/lib/data';

export default function ApartmentsPage() {
  // --- STATE ---
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    type: '',
    bedrooms: '',
    status: '',
    minPrice: 0,
    maxPrice: 5000000
  });
  const [sortBy, setSortBy] = useState('featured');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Simulate loading on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // --- FILTER LOGIC ---
  const filteredApartments = useMemo(() => {
    let result = [...apartments];

    // Text Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
          a.title.toLowerCase().includes(q) ||
          a.address.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q)
      );
    }

    // Dropdown Filters
    if (filters.state) result = result.filter(a => a.state === filters.state);
    if (filters.city) result = result.filter(a => a.city === filters.city);
    if (filters.type) result = result.filter(a => a.type === filters.type);
    if (filters.bedrooms) result = result.filter(a => a.bedrooms >= parseInt(filters.bedrooms));
    if (filters.status) result = result.filter(a => a.status === filters.status);

    // Price Filter
    result = result.filter(a => a.price >= filters.minPrice && a.price <= filters.maxPrice);

    // Sorting
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id.localeCompare(a.id)); break; // Mock date sort
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  // Handlers
  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      state: '', city: '', type: '', bedrooms: '', status: '',
      minPrice: 0, maxPrice: 5000000
    });
    setSearchQuery('');
  };

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== '' && v !== 0 && v !== 5000000).length;

  return (
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">

        {/* ==================== HEADER ==================== */}
        <div className="bg-[#0D0D2B] relative overflow-hidden pb-12 pt-28 md:pt-32">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-white">Search</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Find your next stay
              </h1>
              <p className="text-slate-400 text-lg">
                Search {apartments.length}+ verified properties with best-in-class amenities.
              </p>
            </div>
          </div>
        </div>

        {/* ==================== CONTROLS BAR ==================== */}
        <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
          <div className="container mx-auto px-4 md:px-6 py-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

              {/* Search Input */}
              <div className="relative w-full md:max-w-md group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                    type="text"
                    placeholder="Search city, area, or building..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none placeholder:text-slate-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                        showFilters || activeFilterCount > 0
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                      <span className="ml-1 bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                  )}
                </button>

                <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block" />

                <div className="relative hidden md:block">
                  <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent font-bold text-sm text-slate-700 py-2 pl-2 pr-8 cursor-pointer focus:outline-none"
                  >
                    <option value="featured">Recommended</option>
                    <option value="newest">Newest Added</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Filters Panel */}
            {showFilters && (
                <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-slide-down">

                  {/* Filter Items */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">State</label>
                    <select
                        value={filters.state}
                        onChange={(e) => { handleFilterChange('state', e.target.value); handleFilterChange('city', ''); }}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:border-indigo-500"
                    >
                      <option value="">All States</option>
                      {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">City</label>
                    <select
                        value={filters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                        disabled={!filters.state}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                    >
                      <option value="">All Cities</option>
                      {filters.state && cities[filters.state]?.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Type</label>
                    <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:border-indigo-500"
                    >
                      <option value="">Any Type</option>
                      {apartmentTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Beds</label>
                    <select
                        value={filters.bedrooms}
                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:border-indigo-500"
                    >
                      <option value="">Any</option>
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ Beds</option>)}
                    </select>
                  </div>

                  <div className="col-span-2 space-y-1">
                    <div className="flex justify-between">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Max Price</label>
                      <span className="text-[10px] font-bold text-indigo-600">₦{Number(filters.maxPrice).toLocaleString()}</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="10000000" step="100000"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-4 lg:col-span-6 flex justify-end pt-2">
                    <button onClick={clearFilters} className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1">
                      <X className="w-3 h-3" /> Clear Filters
                    </button>
                  </div>
                </div>
            )}
          </div>
        </div>

        {/* ==================== LISTINGS GRID ==================== */}
        <div className="container mx-auto px-4 md:px-6 py-8">

          {isLoading ? (
              /* Loading Skeleton */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-sm animate-pulse">
                      <div className="h-48 bg-slate-100 rounded-2xl mb-4" />
                      <div className="h-6 bg-slate-100 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-slate-100 rounded w-1/2" />
                    </div>
                ))}
              </div>
          ) : filteredApartments.length > 0 ? (
              /* Real Data */
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6 max-w-4xl mx-auto'}>

                {filteredApartments.map((apt) => (
                    <Link
                        key={apt.id}
                        href={`/apartment/${apt.id}`}
                        className={`group bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 rounded-[24px] overflow-hidden ${
                            viewMode === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'
                        }`}
                    >
                      {/* Image Section */}
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-full md:w-72 h-64 md:h-auto' : 'h-64 w-full'}`}>
                        <img
                            src={apt.images[0]}
                            alt={apt.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        {/* Status Badge */}
                        <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide backdrop-blur-md shadow-sm ${
                        apt.status === 'Available'
                            ? 'bg-emerald-500/90 text-white'
                            : 'bg-orange-500/90 text-white'
                    }`}>
                      {apt.status}
                    </span>
                          {apt.featured && (
                              <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-indigo-600/90 text-white uppercase tracking-wide backdrop-blur-md shadow-sm">
                        Featured
                      </span>
                          )}
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={(e) => toggleSave(e, apt.id)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all group/btn"
                        >
                          <Heart className={`w-4 h-4 transition-colors ${savedIds.includes(apt.id) ? 'fill-red-500 text-red-500' : 'text-white group-hover/btn:text-red-500'}`} />
                        </button>

                        {/* Price (Bottom Left) */}
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-xl font-bold">₦{(apt.price / 1000000).toFixed(1)}M</p>
                          <p className="text-[10px] opacity-80 font-medium uppercase tracking-wider">Per Year</p>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                              {apt.title}
                            </h3>
                            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                              <Star className="w-3 h-3 text-orange-400 fill-current" />
                              <span className="text-xs font-bold text-slate-700">{apt.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-4">
                            <MapPin className="w-3.5 h-3.5" />
                            {apt.area}, {apt.city}
                          </div>

                          <p className={`text-xs text-slate-500 leading-relaxed mb-4 ${viewMode === 'list' ? 'line-clamp-2' : 'line-clamp-3'}`}>
                            {apt.description}
                          </p>
                        </div>

                        {/* Footer Icons */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-4 text-slate-500">
                            <div className="flex items-center gap-1.5 tooltip" title="Bedrooms">
                              <Bed className="w-4 h-4" />
                              <span className="text-xs font-bold">{apt.bedrooms}</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Bathrooms">
                              <Bath className="w-4 h-4" />
                              <span className="text-xs font-bold">{apt.bathrooms}</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Square Footage">
                              <Maximize className="w-4 h-4" />
                              <span className="text-xs font-bold">{apt.sqft}</span>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {apt.type}
                    </span>
                        </div>
                      </div>
                    </Link>
                ))}
              </div>
          ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No properties found</h3>
                <p className="text-slate-500 max-w-xs mx-auto mb-8">
                  We couldn't find any apartments matching your exact filters. Try adjusting your search.
                </p>
                <button onClick={clearFilters} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                  Clear All Filters
                </button>
              </div>
          )}
        </div>

      </div>
  );
}