'use client';

import Link from 'next/link';
import {
  Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube,
  ArrowRight, Heart, Send, Smartphone
} from 'lucide-react';

export default function Footer() {
  return (
      <footer className="relative bg-[#0D0D2B] text-white overflow-hidden font-sans border-t border-white/5">

        {/* --- BACKGROUND EFFECTS --- */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large subtle glow top left */}
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
          {/* Large subtle glow bottom right */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
          {/* Dot Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
               style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
          />
        </div>

        {/* --- NEWSLETTER SECTION --- */}
        <div className="relative border-b border-white/5">
          <div className="container mx-auto px-4 md:px-6 py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

              {/* Text */}
              <div className="text-center lg:text-left max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-4 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Weekly Digest</span>
                </div>
                <h3 className="text-3xl font-bold mb-3 tracking-tight">Unlock Exclusive Deals</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Join <span className="text-white font-semibold">15,000+</span> tenants getting price drops and moving tips.
                </p>
              </div>

              {/* Input - High End Merged Style */}
              <div className="w-full max-w-md">
                <form className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-md"></div>
                  <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 transition-all focus-within:bg-white/10 focus-within:border-white/20">
                    <Mail className="ml-4 w-5 h-5 text-slate-400" />
                    <input
                        type="email"
                        placeholder="name@example.com"
                        className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 px-4 py-3 text-sm font-medium outline-none"
                        required
                    />
                    <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg">
                      Subscribe
                    </button>

                    {/* Mobile only button icon */}
                    <button className="sm:hidden p-3 bg-white text-slate-900 rounded-xl">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
                <p className="text-xs text-slate-500 mt-3 text-center sm:text-left">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="relative container mx-auto px-4 md:px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* Column 1: Brand (Span 4) */}
            <div className="lg:col-span-4 space-y-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/50">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold tracking-tight">RentEase</span>
              </Link>
              <p className="text-slate-400 text-sm leading-7 max-w-sm">
                We are building the future of living in Africa. From finding your dream home to settling in, we make the process seamless, secure, and delightful.
              </p>

              {/* Socials */}
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                    <a
                        key={i}
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                ))}
              </div>
            </div>

            {/* Column 2: Discover (Span 2) */}
            <div className="lg:col-span-2 lg:pl-4">
              <h4 className="font-bold text-white mb-6">Discover</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Buy a Home', href: '/buy' },
                  { label: 'Rent a Home', href: '/rent' },
                  { label: 'Sell Property', href: '/sell' },
                  { label: 'Estate Projects', href: '/projects' },
                ].map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-slate-400 hover:text-white text-sm font-medium transition-colors block hover:translate-x-1 duration-200">
                        {link.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services (Span 3) */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-white mb-6">Ecosystem</h4>
              <ul className="space-y-4">
                {[
                  { label: 'ParkMyLoad Logistics', href: '/logistics', badge: 'New' },
                  { label: 'Cleaning Services', href: '/cleaning' },
                  { label: 'Marketplace', href: '/shop' },
                  { label: 'Property Verification', href: '/verify' },
                ].map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="group flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors hover:translate-x-1 duration-200">
                        {link.label}
                        {link.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                        {link.badge}
                      </span>
                        )}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & App (Span 3) */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-white mb-6">Contact Us</h4>
              <ul className="space-y-5 mb-8">
                <li className="flex items-start gap-3 text-slate-400 text-sm">
                  <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>42 Marina Road, Victoria Island,<br />Lagos, Nigeria</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>+234 800 RENT EASE</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>hello@rentease.ng</span>
                </li>
              </ul>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Get the App</p>
                    <p className="text-[10px] text-slate-400">iOS & Android</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <span className="text-[10px] font-bold">App Store</span>
                  </button>
                  <button className="h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    <span className="text-[10px] font-bold">Google Play</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- COPYRIGHT --- */}
        <div className="relative border-t border-white/5 bg-[#08081C]">
          <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs font-medium">
              © 2024 RentEase Inc. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-slate-500 hover:text-white text-xs font-medium transition-colors">Privacy</Link>
              <Link href="/terms" className="text-slate-500 hover:text-white text-xs font-medium transition-colors">Terms</Link>
              <Link href="/sitemap" className="text-slate-500 hover:text-white text-xs font-medium transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
  );
}