'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search, Menu, X, Heart, Bell, User, Home, Truck, Sparkles,
  ShoppingBag, LogIn, ChevronRight, LayoutDashboard, Settings
} from 'lucide-react';

// Using a mock hook for notifications to keep component clean
const useNotifications = () => {
  return { unreadCount: 3, notifications: [
      { id: 1, title: 'Price Drop', message: 'A saved apartment is 10% cheaper.', read: false },
      { id: 2, title: 'New Message', message: 'Landlord John replied to you.', read: false },
    ]};
};

const navLinks = [
  { href: '/apartments', label: 'Apartments', icon: Home },
  { href: '/truck-booking', label: 'Logistics', icon: Truck },
  { href: '/cleaning', label: 'Cleaning', icon: Sparkles },
  { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const pathname = usePathname();
  const { unreadCount, notifications } = useNotifications();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowNotifications(false);
  }, [pathname]);

  return (
      <>
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
                isScrolled
                    ? 'h-16 bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-sm'
                    : 'h-20 bg-transparent border-transparent'
            }`}
        >
          <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">

            {/* --- LOGO --- */}
            <Link href="/" className="flex items-center gap-2 group relative z-50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <Home className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">
                RentEase
              </span>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                Smart Living
              </span>
              </div>
            </Link>

            {/* --- DESKTOP NAV --- */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-gray-200/50 shadow-sm mx-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                            isActive
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-white/80'
                        }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-300' : 'text-slate-400'}`} />
                      {link.label}
                    </Link>
                );
              })}
            </nav>

            {/* --- RIGHT ACTIONS --- */}
            <div className="flex items-center gap-2 md:gap-4">

              {/* Search Trigger (Mobile/Desktop) */}
              <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-full transition-colors lg:hidden">
                <Search className="w-5 h-5" />
              </button>

              {/* Dashboard Link (Desktop) - ADDED THIS */}
              <Link
                  href="/dashboard"
                  className="hidden md:flex w-10 h-10 items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                  title="Dashboard"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Link>

              {/* Notifications */}
              <div className="relative hidden md:block">
                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                        showNotifications ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'
                    }`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                      <div className="absolute right-0 top-full mt-4 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-40 animate-fade-in origin-top-right">
                        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                          <h3 className="font-bold text-sm text-slate-900">Notifications</h3>
                          <Link href="/notifications" className="text-xs font-semibold text-indigo-600 hover:underline">Mark all read</Link>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {notifications.map((n) => (
                              <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-semibold text-slate-800">{n.title}</p>
                                  <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                                </div>
                              </div>
                          ))}
                        </div>
                      </div>
                    </>
                )}
              </div>

              {/* Wishlist */}
              <Link
                  href="/favorites"
                  className="hidden md:flex w-10 h-10 items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Divider */}
              <div className="hidden md:block w-px h-6 bg-gray-200" />

              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                <Link href="/auth" className="hidden md:block text-sm font-bold text-slate-600 hover:text-slate-900">
                  Log in
                </Link>
                <Link
                    href="/auth"
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Get Started
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900 bg-gray-100 rounded-xl"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* --- MOBILE DRAWER MENU --- */}
        <div
            className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${
                mobileMenuOpen ? 'visible' : 'invisible'
            }`}
        >
          {/* Backdrop */}
          <div
              className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${
                  mobileMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div
              className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out ${
                  mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <div className="flex flex-col h-full">

              {/* Drawer Header */}
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <span className="text-lg font-bold text-slate-900">Menu</span>
                <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6">

                {/* User Profile Snippet (Mobile) */}
                <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl mb-8">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-indigo-900">Welcome Guest</p>
                    <p className="text-xs text-indigo-600/80">Sign in to manage bookings</p>
                  </div>
                </div>

                {/* Main Links */}
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                        >
                          <Icon className="w-5 h-5 text-slate-400" />
                          {link.label}
                        </Link>
                    )
                  })}
                </div>

                <div className="my-6 border-t border-gray-100" />

                {/* Secondary Links */}
                <div className="space-y-1">
                  <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-900">
                    <LayoutDashboard className="w-5 h-5" /> Dashboard
                  </Link>
                  <Link href="/settings" className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-900">
                    <Settings className="w-5 h-5" /> Settings
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <Link
                    href="/auth"
                    className="flex items-center justify-center w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
                >
                  Log In / Sign Up
                </Link>
              </div>

            </div>
          </div>
        </div>
      </>
  );
}