'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Bed, Bath, Maximize, Heart, Star,
  X, Grid3X3, List, SlidersHorizontal, ChevronDown,
  Home, Map
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

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
          a.title.toLowerCase().includes(q) ||
          a.address.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q)
      );
    }

    if (filters.state) result = result.filter(a => a.state === filters.state);
    if (filters.city) result = result.filter(a => a.city === filters.city);
    if (filters.type) result = result.filter(a => a.type === filters.type);
    if (filters.bedrooms) result = result.filter(a => a.bedrooms >= parseInt(filters.bedrooms));
    if (filters.status) result = result.filter(a => a.status === filters.status);

    result = result.filter(a => a.price >= filters.minPrice && a.price <= filters.maxPrice);

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id.localeCompare(a.id)); break;
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
      <div className="min-h-screen bg-gray-50 font-sans selection:bg-indigo-500 selection:text-white pb-24">

        {/* ==================== PAGE HEADER (Airy & Clean) ==================== */}
        <div className="bg-white border-b border-gray-200 pt-32 pb-12 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-6">
              <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-900">Discover Properties</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Find your next perfect stay
            </h1>
            <p className="text-gray-500 text-lg font-medium">
              Browse through <span className="text-gray-900 font-bold">{apartments.length}+</span> verified premium properties tailored to your lifestyle.
            </p>
          </div>
        </div>

        {/* ==================== STICKY CONTROLS BAR ==================== */}
        <div className="sticky top-[72px] md:top-[80px] z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all">
          <div className="container mx-auto px-4 md:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

              {/* Premium Search Input */}
              <div className="relative w-full md:max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                    type="text"
                    placeholder="Search city, area, or building..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm font-bold text-gray-900 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none placeholder:text-gray-400 shadow-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${
                        showFilters || activeFilterCount > 0
                            ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm'
                    }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                      <span className="ml-1 bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                  )}
                </button>

                <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block" />

                {/* Sort Dropdown */}
                <div className="relative hidden md:flex items-center bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                  <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent font-bold text-sm text-gray-700 pr-6 cursor-pointer focus:outline-none"
                  >
                    <option value="featured">Recommended</option>
                    <option value="newest">Newest Added</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Toggles */}
                <div className="flex bg-gray-100 p-1 rounded-full border border-gray-200 ml-auto md:ml-2">
                  <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Filters Panel (Clean SaaS Look) */}
            {showFilters && (
                <div className="mt-4 pt-6 border-t border-gray-100 animate-slide-down">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">State</label>
                      <select
                          value={filters.state}
                          onChange={(e) => { handleFilterChange('state', e.target.value); handleFilterChange('city', ''); }}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                      >
                        <option value="">All States</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">City</label>
                      <select
                          value={filters.city}
                          onChange={(e) => handleFilterChange('city', e.target.value)}
                          disabled={!filters.state}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        <option value="">All Cities</option>
                        {filters.state && cities[filters.state]?.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">Property Type</label>
                      <select
                          value={filters.type}
                          onChange={(e) => handleFilterChange('type', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                      >
                        <option value="">Any Type</option>
                        {apartmentTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">Bedrooms</label>
                      <select
                          value={filters.bedrooms}
                          onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                      >
                        <option value="">Any Size</option>
                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ Beds</option>)}
                      </select>
                    </div>

                    <div className="col-span-2 lg:col-span-1 space-y-1.5">
                      <div className="flex justify-between items-end pl-1">
                        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Max Price</label>
                        <span className="text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">₦{(filters.maxPrice / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="pt-2">
                        <input
                            type="range"
                            min="0" max="10000000" step="100000"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-end pt-6">
                    <button onClick={clearFilters} className="text-xs font-bold text-gray-500 hover:text-red-500 flex items-center gap-1.5 transition-colors px-4 py-2 rounded-full hover:bg-red-50">
                      <X className="w-3.5 h-3.5" /> Clear All Filters
                    </button>
                  </div>
                </div>
            )}
          </div>
        </div>

        {/* ==================== LISTINGS GRID ==================== */}
        <div className="container mx-auto px-4 md:px-8 py-10">

          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm font-bold text-gray-500">
              Showing <span className="text-gray-900 font-extrabold">{filteredApartments.length}</span> properties
            </p>
          </div>

          {isLoading ? (
              /* Loading Skeleton */
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'grid-cols-1 gap-6 max-w-4xl mx-auto'}`}>
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className={`bg-white rounded-[24px] p-3 border border-gray-100 shadow-sm animate-pulse ${viewMode === 'list' ? 'flex gap-4' : 'flex flex-col'}`}>
                      <div className={`bg-gray-100 rounded-[16px] ${viewMode === 'list' ? 'w-64 h-48' : 'w-full aspect-[4/3] mb-4'}`} />
                      <div className={`flex-1 ${viewMode === 'list' ? 'py-4' : ''}`}>
                        <div className="h-6 bg-gray-100 rounded-md w-3/4 mb-3" />
                        <div className="h-4 bg-gray-100 rounded-md w-1/2 mb-6" />
                        <div className="h-10 bg-gray-50 rounded-xl w-full mt-auto" />
                      </div>
                    </div>
                ))}
              </div>
          ) : filteredApartments.length > 0 ? (
              /* Real Data */
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6 max-w-4xl mx-auto'}>

                {filteredApartments.map((apt) => (
                    <Link
                        key={apt.id}
                        href={`/apartment/${apt.id}`}
                        className={`group bg-white border border-gray-200 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 rounded-[24px] p-3 ${
                            viewMode === 'list' ? 'flex flex-col sm:flex-row gap-5' : 'flex flex-col'
                        }`}
                    >
                      {/* Image Section */}
                      <div className={`relative overflow-hidden rounded-[16px] bg-gray-100 ${viewMode === 'list' ? 'w-full sm:w-72 h-56 shrink-0' : 'aspect-[4/3] w-full mb-4'}`}>
                        <img
                            src={apt.images[0]}
                            alt={apt.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />

                        {/* Top Tags */}
                        <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-extrabold text-gray-900 uppercase tracking-widest shadow-sm">
                      {apt.type}
                    </span>
                          {apt.featured && (
                              <span className="bg-indigo-600/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-extrabold text-white uppercase tracking-widest shadow-sm">
                        Featured
                      </span>
                          )}
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={(e) => toggleSave(e, apt.id)}
                            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all shadow-sm z-10"
                        >
                          <Heart className={`w-5 h-5 transition-colors ${savedIds.includes(apt.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
                        </button>
                      </div>

                      {/* Content Section */}
                      <div className={`flex flex-col justify-between flex-1 px-2 ${viewMode === 'list' ? 'py-2' : 'pb-2'}`}>
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                              {apt.title}
                            </h3>
                            <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md border border-orange-100 shrink-0">
                              <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                              <span className="text-xs font-bold text-orange-700">{apt.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium mb-4">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {apt.area}, {apt.city}
                          </div>

                          {viewMode === 'list' && (
                              <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2">
                                {apt.description}
                              </p>
                          )}
                        </div>

                        {/* Footer Specs & Price */}
                        <div className={`flex items-center justify-between border-gray-100 ${viewMode === 'list' ? 'mt-auto' : 'pt-4 border-t'}`}>
                          <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
                            <div className="flex items-center gap-1.5" title="Bedrooms">
                              <Bed className="w-4 h-4 text-gray-400" />
                              <span>{apt.bedrooms}</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Bathrooms">
                              <Bath className="w-4 h-4 text-gray-400" />
                              <span>{apt.bathrooms}</span>
                            </div>
                            <div className="flex items-center gap-1.5 hidden sm:flex" title="Square Footage">
                              <Maximize className="w-4 h-4 text-gray-400" />
                              <span>{apt.sqft}</span>
                            </div>
                          </div>

                          <p className="text-lg font-extrabold text-gray-900">
                            ₦{(apt.price / 1000000).toFixed(1)}M<span className="text-gray-400 font-medium text-xs">/yr</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                ))}
              </div>
          ) : (
              /* Elegant Empty State */
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[32px] border border-gray-200 shadow-sm max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                  <Map className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">No properties found</h3>
                <p className="text-gray-500 text-lg max-w-md mx-auto mb-8 font-medium">
                  We couldn't find any apartments matching your exact criteria. Try broadening your search.
                </p>
                <button onClick={clearFilters} className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-indigo-600 hover:shadow-lg transition-all active:scale-95">
                  Clear All Filters
                </button>
              </div>
          )}
        </div>

      </div>
  );
}