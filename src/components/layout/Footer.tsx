'use client';

import Link from 'next/link';
import {
  Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube,
  ArrowRight, Heart, Send, Smartphone, Sparkles
} from 'lucide-react';

export default function Footer() {
  return (
      <footer className="bg-gray-50 text-gray-900 font-sans border-t border-gray-200 pt-16 md:pt-24">

        <div className="container mx-auto px-4 md:px-8">

          {/* --- PREMIUM NEWSLETTER SECTION --- */}
          <div className="pb-16 mb-16 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

              {/* Text */}
              <div className="text-center lg:text-left max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest">Weekly Digest</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight text-gray-900">
                  Unlock Exclusive Deals
                </h3>
                <p className="text-gray-500 text-lg">
                  Join <span className="text-gray-900 font-bold">15,000+</span> tenants getting early access to price drops and listings.
                </p>
              </div>

              {/* Input - Clean & Crisp SaaS Style */}
              <div className="w-full max-w-md">
                <form className="relative flex items-center bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-300">
                  <Mail className="ml-4 w-5 h-5 text-gray-400" />
                  <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full bg-transparent border-none text-gray-900 placeholder-gray-400 focus:ring-0 px-4 py-3 text-sm font-bold outline-none"
                      required
                  />
                  <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 active:scale-95 transition-all shadow-md">
                    Subscribe
                  </button>

                  {/* Mobile only button icon */}
                  <button className="sm:hidden p-3 bg-gray-900 text-white rounded-xl hover:bg-indigo-600 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
                <p className="text-xs font-semibold text-gray-400 mt-3 text-center sm:text-left ml-2">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

            </div>
          </div>

          {/* --- MAIN GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

            {/* Column 1: Brand (Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              <Link href="/" className="flex items-center gap-3 group w-fit">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-gray-900">RentEase</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-medium">
                We are building the future of living in Africa. From finding your dream home to settling in, we make the process seamless, secure, and delightful.
              </p>

              {/* Socials */}
              <div className="flex gap-3 pt-2">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                    <a
                        key={i}
                        href="#"
                        className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                ))}
              </div>
            </div>

            {/* Column 2: Discover (Span 2) */}
            <div className="lg:col-span-2 lg:pl-4">
              <h4 className="font-extrabold text-gray-900 mb-6 uppercase tracking-widest text-xs">Discover</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Buy a Home', href: '/buy' },
                  { label: 'Rent a Home', href: '/rent' },
                  { label: 'Sell Property', href: '/sell' },
                  { label: 'Estate Projects', href: '/projects' },
                ].map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-gray-500 hover:text-indigo-600 text-sm font-bold transition-colors block hover:translate-x-1 duration-200">
                        {link.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services (Span 3) */}
            <div className="lg:col-span-3">
              <h4 className="font-extrabold text-gray-900 mb-6 uppercase tracking-widest text-xs">Ecosystem</h4>
              <ul className="space-y-4">
                {[
                  { label: 'ParkMyLoad™ Logistics', href: '/logistics', badge: 'New' },
                  { label: 'Cleaning Services', href: '/cleaning' },
                  { label: 'Marketplace', href: '/shop' },
                  { label: 'Property Verification', href: '/verify' },
                ].map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="group flex items-center gap-2 text-gray-500 hover:text-indigo-600 text-sm font-bold transition-colors hover:translate-x-1 duration-200">
                        {link.label}
                        {link.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-indigo-50 text-indigo-600 border border-indigo-100">
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
              <h4 className="font-extrabold text-gray-900 mb-6 uppercase tracking-widest text-xs">Contact Us</h4>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-500 text-sm font-medium">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                  <span>42 Marina Road, Victoria Island,<br />Lagos, Nigeria</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                  <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                  <span>+234 800 RENT EASE</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                  <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                  <span>hello@rentease.ng</span>
                </li>
              </ul>

              <div className="p-5 rounded-[24px] bg-white border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 border border-gray-100">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-gray-900">Get the App</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">iOS & Android</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="h-10 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 flex items-center justify-center transition-colors">
                    <span className="text-[11px] font-extrabold">App Store</span>
                  </button>
                  <button className="h-10 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 flex items-center justify-center transition-colors">
                    <span className="text-[11px] font-extrabold">Google Play</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- COPYRIGHT --- */}
        <div className="border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-xs font-bold">
              © 2026 RentEase Inc. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-gray-900 text-xs font-bold transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-gray-900 text-xs font-bold transition-colors">Terms</Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-gray-900 text-xs font-bold transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>

      </footer>
  );
}