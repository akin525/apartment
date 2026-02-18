'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Search, Home, Truck, Sparkles, ShoppingBag, ArrowRight,
  MapPin, Bed, Bath, Maximize, Heart, CheckCircle2,
  ArrowUpRight, Wallet, Star, ShieldCheck, Users, PlayCircle
} from 'lucide-react';
import { apartments } from '@/lib/data';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('rent');
  const featuredApartments = apartments.filter(a => a.featured).slice(0, 3);

  return (
      <div className="bg-white font-sans selection:bg-indigo-500 selection:text-white">

        {/* ==================== HERO SECTION ==================== */}
        <section className="relative min-h-[92vh] w-full overflow-hidden flex flex-col justify-center pb-20">

          {/* --- Background --- */}
          <div className="absolute inset-0 z-0">
            <img
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop"
                alt="Luxury Interior"
                className="w-full h-full object-cover scale-105 animate-float-slow" // Subtle movement
            />
            {/* Complex Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            {/* Grain Texture for "Film" Look */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24">
            <div className="max-w-5xl">

              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8 animate-fade-in">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
                <span className="text-xs font-bold text-white tracking-wide uppercase">The #1 Ecosystem for Modern Living</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] mb-8 tracking-tight animate-fade-in delay-100">
                Find your place. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300">
                Live your life.
              </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-xl mb-12 font-medium leading-relaxed animate-fade-in delay-200">
                RentEase isn't just about finding an apartment. It's about moving, cleaning, furnishing, and settling in—all in one tap.
              </p>

              {/* --- SEARCH INTERFACE --- */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/20 p-2.5 rounded-[28px] max-w-4xl shadow-2xl shadow-black/40 animate-slide-up delay-300">

                {/* Tab Switcher */}
                <div className="flex gap-1 mb-2.5 px-1">
                  {['rent', 'buy', 'short-let'].map((tab) => (
                      <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-wider ${
                              activeTab === tab
                                  ? 'bg-white text-slate-900 shadow-md transform scale-105'
                                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
                          }`}
                      >
                        {tab}
                      </button>
                  ))}
                </div>

                {/* Search Bar Inputs */}
                <div className="bg-white rounded-[24px] p-2 flex flex-col md:flex-row gap-2 shadow-inner shadow-slate-200/50">

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">

                    {/* Input 1 */}
                    <div className="px-6 py-4 hover:bg-slate-50 transition-colors rounded-2xl cursor-pointer group relative">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">Location</label>
                      <div className="flex items-center gap-3 mt-1.5">
                        <MapPin className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                        <input type="text" placeholder="Where to?" className="w-full bg-transparent text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none" />
                      </div>
                    </div>

                    {/* Input 2 */}
                    <div className="px-6 py-4 hover:bg-slate-50 transition-colors rounded-2xl cursor-pointer group relative">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">Type</label>
                      <div className="flex items-center gap-3 mt-1.5">
                        <Home className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                        <select className="w-full bg-transparent text-sm font-bold text-slate-900 focus:outline-none appearance-none cursor-pointer">
                          <option>Apartment</option>
                          <option>Duplex</option>
                          <option>Villa</option>
                        </select>
                      </div>
                    </div>

                    {/* Input 3 */}
                    <div className="px-6 py-4 hover:bg-slate-50 transition-colors rounded-2xl cursor-pointer group relative">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">Budget</label>
                      <div className="flex items-center gap-3 mt-1.5">
                        <Wallet className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                        <input type="text" placeholder="Add limit" className="w-full bg-transparent text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none" />
                      </div>
                    </div>

                  </div>

                  {/* Search Button */}
                  <button className="bg-slate-900 hover:bg-indigo-600 text-white rounded-[20px] px-10 py-4 md:py-0 font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 hover:shadow-indigo-600/30 hover:scale-[1.02] active:scale-95">
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>

              {/* Hero Footer Stats */}
              <div className="mt-16 flex items-center gap-8 animate-fade-in delay-500 border-t border-white/10 pt-8 max-w-2xl">
                {[
                  { value: '2k+', label: 'Verified Homes' },
                  { value: '4.9/5', label: 'User Rating' },
                  { value: '24h', label: 'Fastest Move-in' },
                ].map((stat, i) => (
                    <div key={i}>
                      <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ==================== SOCIAL PROOF ==================== */}
        <section className="py-10 border-b border-slate-100 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-50 hover:opacity-100 transition-opacity duration-500">
              {/* Simple SVG placeholders for logos */}
              {['Google', 'Airbnb', 'Uber', 'Stripe', 'Spotify'].map((brand) => (
                  <span key={brand} className="text-xl font-black text-slate-800">{brand}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== BENTO GRID SERVICES ==================== */}
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">The Ecosystem</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                  Everything you need <br /> to <span className="text-indigo-600">settle in.</span>
                </h2>
              </div>
              <Link href="/services" className="group flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-200 pb-1 hover:border-indigo-600 transition-all">
                Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[300px]">

              {/* 1. Logistics (Large) */}
              <div className="md:col-span-6 lg:col-span-8 bg-white rounded-[32px] p-10 border border-slate-100 hover:border-indigo-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                      <Truck className="w-7 h-7" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">ParkMyLoad™</h3>
                    <p className="text-slate-500 text-lg max-w-sm">The "Uber" for moving trucks. Book a van instantly, track your driver, and move safely.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">Instant Quote</span>
                    <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">GPS Tracking</span>
                  </div>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/2769/2769339.png" alt="Truck" className="absolute -bottom-4 -right-4 w-48 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0" />
              </div>

              {/* 2. Cleaning (Tall) */}
              <div className="md:col-span-3 lg:col-span-4 bg-[#0D0D2B] rounded-[32px] p-8 text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6 text-cyan-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Pro Cleaning</h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">Top-rated cleaners for move-in, move-out, or deep cleaning.</p>
                  <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#0D0D2B]" />)}
                      </div>
                      <span className="text-xs font-bold text-slate-300">500+ Pros</span>
                    </div>
                    <button className="w-full py-3 bg-white text-[#0D0D2B] rounded-xl font-bold text-sm hover:bg-cyan-50 transition-colors">Book Now</button>
                  </div>
                </div>
              </div>

              {/* 3. Marketplace (Medium) */}
              <div className="md:col-span-3 lg:col-span-4 bg-white rounded-[32px] p-8 border border-slate-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Marketplace</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Don't move unwanted items. Sell them to verified neighbors or buy used furniture for cheap.</p>
              </div>

              {/* 4. Verification (Wide) */}
              <div className="md:col-span-6 lg:col-span-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[32px] p-10 text-white relative overflow-hidden group flex items-center justify-between">
                <div className="relative z-10 max-w-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-6 h-6 text-emerald-100" />
                    <span className="font-bold text-emerald-100 tracking-wide uppercase text-xs">Scam Protection</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-3">Not in the city?</h3>
                  <p className="text-emerald-50 text-lg">We send a verified agent to inspect the property, take video, and ensure it actually exists before you pay.</p>
                </div>
                <button className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:text-emerald-600 transition-all hover:scale-110 shrink-0">
                  <ArrowUpRight className="w-8 h-8" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== FEATURED LISTINGS ==================== */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <span className="text-indigo-600 font-bold tracking-wider uppercase text-xs mb-2 block">Curated Living</span>
                <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Featured Apartments</h2>
              </div>

              <div className="flex gap-2">
                <button className="px-6 py-3 rounded-full border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">For Rent</button>
                <button className="px-6 py-3 rounded-full border border-transparent bg-slate-900 text-sm font-bold text-white shadow-lg">For Sale</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredApartments.map((apt) => (
                  <Link
                      href={`/apartment/${apt.id}`}
                      key={apt.id}
                      className="group flex flex-col gap-4"
                  >
                    {/* Image Card */}
                    <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-slate-100">
                      <img
                          src={apt.images[0]}
                          alt={apt.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Status Tag */}
                      <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 shadow-sm border border-black/5">
                      {apt.type}
                    </span>
                      </div>

                      {/* Like Button */}
                      <div className="absolute top-4 right-4">
                        <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all duration-300">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Price Tag (Bottom Left) */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/20">
                        <p className="text-sm font-extrabold text-slate-900">
                          ₦{(apt.price / 1000000).toFixed(1)}M <span className="text-slate-500 font-medium text-xs">/yr</span>
                        </p>
                      </div>
                    </div>

                    {/* Info */}
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{apt.title}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                          <span className="text-sm font-bold text-slate-900">4.8</span>
                        </div>
                      </div>

                      <p className="text-slate-500 text-sm mb-4 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {apt.area}, {apt.city}
                      </p>

                      <div className="flex items-center gap-6 text-sm font-medium text-slate-600 border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-2"><Bed className="w-4 h-4 text-slate-400" /> {apt.bedrooms} Beds</div>
                        <div className="flex items-center gap-2"><Bath className="w-4 h-4 text-slate-400" /> {apt.bathrooms} Baths</div>
                        <div className="flex items-center gap-2"><Maximize className="w-4 h-4 text-slate-400" /> {apt.sqft} sqft</div>
                      </div>
                    </div>
                  </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <button className="inline-flex items-center gap-2 text-slate-900 font-extrabold hover:text-indigo-600 transition-colors">
                Show more properties <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-24 px-4 md:px-6 bg-slate-50">
          <div className="container mx-auto">
            <div className="bg-[#0D0D2B] rounded-[48px] overflow-hidden relative min-h-[500px] flex items-center">

              {/* Abstract Background */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-indigo-600/30 to-transparent rounded-full blur-[120px] -mr-40 -mt-40" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full blur-[100px] -ml-20 -mb-20" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
              </div>

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-12 lg:p-24 w-full">
                <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 w-fit mb-6">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-100">Join 50,000+ Happy Tenants</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                    Ready to upgrade <br/> your lifestyle?
                  </h2>
                  <p className="text-slate-400 text-lg mb-10 max-w-md leading-relaxed">
                    Stop jumping between apps. RentEase brings listings, movers, and cleaners into one dashboard.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-white text-[#0D0D2B] rounded-2xl font-bold text-base hover:scale-105 transition-transform shadow-xl shadow-white/10">
                      Get Started Free
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-2xl font-bold text-base hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                      <PlayCircle className="w-5 h-5" /> Watch Demo
                    </button>
                  </div>
                </div>

                {/* Right Side: Mockup or Abstract Graphic */}
                <div className="hidden lg:block relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[440px] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[40px] rotate-6 opacity-50 blur-xl animate-pulse-glow" />
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                    {/* Mock UI Card */}
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-white/60 text-xs font-bold uppercase">Current Status</p>
                        <p className="text-white text-xl font-bold">Moving in Progress</p>
                      </div>
                      <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Truck className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-emerald-400 rounded-full" />
                      </div>
                      <div className="flex justify-between text-white/80 text-sm font-medium">
                        <span>Driver Arriving</span>
                        <span>12 mins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
  );
}