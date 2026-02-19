'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Search, Home, Truck, Sparkles, ShoppingBag, ArrowRight,
  MapPin, Bed, Bath, Maximize, Heart, CheckCircle2,
  ArrowUpRight, Wallet, Star, ShieldCheck, Users, PlayCircle,
  ChevronRight
} from 'lucide-react';
import { apartments } from '@/lib/data';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('rent');
  const featuredApartments = apartments.filter(a => a.featured).slice(0, 3);

  return (
      <div className="bg-gray-50 font-sans selection:bg-indigo-500 selection:text-white pb-20">

        {/* ==================== IMMERSIVE LIGHT HERO ==================== */}
        <section className="relative min-h-[90vh] w-full flex flex-col justify-center pt-32 pb-24 overflow-hidden">

          {/* --- Bright & Airy Background --- */}
          <div className="absolute inset-0 z-0">
            <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop"
                alt="Bright Luxury Interior"
                className="w-full h-full object-cover scale-105 animate-float-slow opacity-80"
            />
            {/* Gradients to fade smoothly into the gray-50 background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-gray-50/80 to-gray-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50/90 via-gray-50/50 to-transparent" />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-3xl">

              {/* Premium Trust Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full mb-8 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
                <span className="text-[11px] font-extrabold text-gray-800 tracking-widest uppercase">
                The Next Generation of Living
              </span>
              </div>

              {/* Clean, High-Contrast Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-gray-900 leading-[1.05] mb-6 tracking-tight">
                Find your place. <br />
                <span className="text-indigo-600">Live your life.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-12 font-medium leading-relaxed">
                RentEase seamlessly connects you to premium apartments, top-tier movers, and trusted cleaners—all from one elegant platform.
              </p>

              {/* --- PRISTINE SEARCH INTERFACE --- */}
              <div className="bg-white/80 backdrop-blur-2xl border border-gray-200 p-3 rounded-[32px] max-w-4xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">

                {/* Tab Switcher */}
                <div className="flex gap-2 mb-3 px-2 border-b border-gray-100 pb-3">
                  {['rent', 'buy', 'short-let'].map((tab) => (
                      <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-6 py-2 rounded-full text-xs font-extrabold transition-all duration-300 uppercase tracking-widest ${
                              activeTab === tab
                                  ? 'bg-gray-900 text-white shadow-md'
                                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                      >
                        {tab.replace('-', ' ')}
                      </button>
                  ))}
                </div>

                {/* Search Inputs */}
                <div className="bg-white rounded-[24px] p-2 flex flex-col md:flex-row gap-2 shadow-sm border border-gray-50">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">

                    <div className="px-6 py-4 hover:bg-gray-50 transition-colors rounded-2xl cursor-pointer group">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors block mb-1">Location</label>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        <input type="text" placeholder="Where to?" className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none" />
                      </div>
                    </div>

                    <div className="px-6 py-4 hover:bg-gray-50 transition-colors rounded-2xl cursor-pointer group">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors block mb-1">Type</label>
                      <div className="flex items-center gap-3">
                        <Home className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        <select className="w-full bg-transparent text-sm font-bold text-gray-900 focus:outline-none appearance-none cursor-pointer">
                          <option>Any Type</option>
                          <option>Apartment</option>
                          <option>Duplex</option>
                          <option>Villa</option>
                        </select>
                      </div>
                    </div>

                    <div className="px-6 py-4 hover:bg-gray-50 transition-colors rounded-2xl cursor-pointer group">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors block mb-1">Max Budget</label>
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        <input type="text" placeholder="₦ Limit" className="w-full bg-transparent text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none" />
                      </div>
                    </div>

                  </div>

                  {/* Search Button */}
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-[20px] px-10 py-4 md:py-0 font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 group">
                    <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Search</span>
                  </button>
                </div>
              </div>

              {/* Hero Footer Stats */}
              <div className="mt-12 flex items-center gap-8 pt-8 max-w-2xl">
                {[
                  { value: '2k+', label: 'Verified Homes' },
                  { value: '4.9/5', label: 'User Rating' },
                  { value: '24h', label: 'Fastest Move-in' },
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col border-l-2 border-indigo-100 pl-4 first:border-l-0 first:pl-0">
                      <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{stat.value}</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ==================== BENTO GRID ECOSYSTEM ==================== */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 md:px-8">

            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
              <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest mb-4 border border-indigo-100">
                The Ecosystem
              </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Everything you need <br /> to <span className="text-indigo-600">settle in perfectly.</span>
                </h2>
              </div>
              <Link href="/services" className="group flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors bg-white border border-gray-200 shadow-sm px-6 py-3 rounded-full">
                Explore Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[300px]">

              {/* 1. Logistics (Large) */}
              <div className="md:col-span-6 lg:col-span-8 bg-white rounded-[32px] p-10 border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                      <Truck className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">ParkMyLoad™</h3>
                    <p className="text-gray-500 text-lg max-w-sm font-medium leading-relaxed">Book a moving van instantly, track your driver, and move safely with zero friction.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-gray-50 text-gray-600 border border-gray-100 rounded-lg text-xs font-bold">Instant Quote</span>
                    <span className="px-4 py-2 bg-gray-50 text-gray-600 border border-gray-100 rounded-lg text-xs font-bold">GPS Tracking</span>
                  </div>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/2769/2769339.png" alt="Truck" className="absolute -bottom-6 -right-6 w-56 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 grayscale" />
              </div>

              {/* 2. Cleaning (Tall) */}
              <div className="md:col-span-3 lg:col-span-4 bg-gray-900 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <Sparkles className="w-6 h-6 text-indigo-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Pro Cleaning</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed">Top-rated professionals for move-in, move-out, or deep restorative cleaning.</p>
                  <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900" />)}
                      </div>
                      <span className="text-xs font-bold text-gray-300">500+ Verified Pros</span>
                    </div>
                    <button className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">Book a Cleaner</button>
                  </div>
                </div>
              </div>

              {/* 3. Marketplace (Medium) */}
              <div className="md:col-span-3 lg:col-span-4 bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-500">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">Marketplace</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">Don't move unwanted items. Sell to neighbors or buy premium used furniture.</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                  Browse Items <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* 4. Verification (Wide) */}
              <div className="md:col-span-6 lg:col-span-8 bg-emerald-50 rounded-[32px] p-10 border border-emerald-100 relative overflow-hidden group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-emerald-100/50 transition-colors">
                <div className="relative z-10 max-w-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    <span className="font-extrabold text-emerald-700 tracking-widest uppercase text-[10px]">Zero Scam Guarantee</span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Relocating from afar?</h3>
                  <p className="text-gray-600 text-lg font-medium">We dispatch a verified agent to inspect the property and stream live video before you pay a dime.</p>
                </div>
                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-md hover:scale-110 transition-transform shrink-0">
                  <ArrowUpRight className="w-8 h-8" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== ELEGANT PROPERTY LISTINGS ==================== */}
        <section className="py-24 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4 md:px-8">

            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="text-indigo-600 font-extrabold tracking-widest uppercase text-[10px] mb-2 block">Curated Living</span>
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Featured Properties</h2>
              </div>
              <div className="flex gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-200">
                <button className="px-6 py-2.5 rounded-full bg-white text-sm font-bold text-gray-900 shadow-sm">For Rent</button>
                <button className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">For Sale</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredApartments.map((apt) => (
                  <Link href={`/apartment/${apt.id}`} key={apt.id} className="group flex flex-col bg-white rounded-[24px] p-3 border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">

                    {/* Image Card */}
                    <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden bg-gray-100 mb-4">
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
                      </div>

                      <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-600 hover:bg-white hover:text-red-500 transition-all duration-300 shadow-sm">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Info Container */}
                    <div className="px-2 pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{apt.title}</h3>
                        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">
                          <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                          <span className="text-xs font-bold text-orange-700">4.8</span>
                        </div>
                      </div>

                      <p className="text-gray-500 text-sm mb-5 flex items-center gap-1.5 font-medium">
                        <MapPin className="w-4 h-4 text-gray-400" /> {apt.area}, {apt.city}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
                          <div className="flex items-center gap-1.5"><Bed className="w-4 h-4 text-gray-400" /> {apt.bedrooms}</div>
                          <div className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-gray-400" /> {apt.bathrooms}</div>
                          <div className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-gray-400" /> {apt.sqft}</div>
                        </div>

                        <p className="text-lg font-extrabold text-gray-900">
                          ₦{(apt.price / 1000000).toFixed(1)}M<span className="text-gray-400 font-medium text-xs">/yr</span>
                        </p>
                      </div>
                    </div>
                  </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <button className="inline-flex items-center gap-2 text-gray-900 font-extrabold hover:text-indigo-600 transition-colors border-b-2 border-gray-200 hover:border-indigo-600 pb-1">
                View all 200+ properties <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-24 px-4 md:px-8">
          <div className="container mx-auto">
            <div className="bg-indigo-600 rounded-[40px] overflow-hidden relative min-h-[400px] flex items-center shadow-2xl shadow-indigo-600/20">

              {/* Abstract Background */}
              <div className="absolute inset-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[80px] pointer-events-none" />
                {/* Subtle Pattern */}
                <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              </div>

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-10 lg:p-20 w-full items-center">

                <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/50 rounded-full border border-indigo-400/50 w-fit mb-8 backdrop-blur-md">
                    <Users className="w-4 h-4 text-indigo-100" />
                    <span className="text-[10px] font-extrabold text-white tracking-widest uppercase">Join 50,000+ Happy Users</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                    Ready to upgrade <br/> your lifestyle?
                  </h2>

                  <p className="text-indigo-100 text-lg mb-10 max-w-md leading-relaxed font-medium">
                    Stop jumping between apps. RentEase brings listings, movers, and cleaners into one unified dashboard.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-base hover:scale-105 transition-transform shadow-lg">
                      Get Started Free
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-indigo-300 text-white rounded-full font-bold text-base hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2">
                      <PlayCircle className="w-5 h-5" /> Watch Demo
                    </button>
                  </div>
                </div>

                {/* Right Side: Clean Mockup UI */}
                <div className="hidden lg:flex items-center justify-center relative">
                  <div className="relative bg-white rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.2)] w-full max-w-md transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 border border-gray-100">

                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                      <div>
                        <p className="text-gray-400 text-[10px] font-extrabold uppercase tracking-widest mb-1">Live Status</p>
                        <p className="text-gray-900 text-xl font-bold">Move in Progress</p>
                      </div>
                      <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                        <Truck className="w-6 h-6 text-emerald-600" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-gray-900 text-sm font-bold mb-3">
                          <span>Driver Arriving</span>
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">12 mins</span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full w-[75%] bg-emerald-500 rounded-full relative">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[move_1s_linear_infinite]" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          JC
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 leading-tight">James Cooper</p>
                          <p className="text-[10px] font-bold text-gray-500 mt-0.5 uppercase tracking-wide">ParkMyLoad Driver • 4.9 ★</p>
                        </div>
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