'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search, Menu, X, Heart, Bell, User, Home, Truck, Sparkles,
  ShoppingBag, ChevronRight, LayoutDashboard, Settings
} from 'lucide-react';

// Mock hook for notifications
const useNotifications = () => {
  return {
    unreadCount: 3,
    notifications: [
      { id: 1, title: 'Price Drop', message: 'A saved apartment is 10% cheaper.', time: '2m ago', read: false },
      { id: 2, title: 'New Message', message: 'Landlord John replied to you.', time: '1h ago', read: false },
    ]
  };
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowNotifications(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
      <>
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3'
                    : 'bg-transparent py-5'
            }`}
        >
          <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

            {/* --- LOGO --- */}
            <Link href="/" className="flex items-center gap-3 group relative z-50">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${isScrolled ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-indigo-600 shadow-sm'}`}>
                <Home className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
              <span className={`text-xl font-extrabold tracking-tight leading-none transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-900'}`}>
                RentEase
              </span>
              </div>
            </Link>

            {/* --- DESKTOP NAV --- */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-gray-200/60 shadow-sm">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                            isActive
                                ? 'bg-gray-900 text-white shadow-md'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-300' : 'text-gray-400'}`} />
                      {link.label}
                    </Link>
                );
              })}
            </nav>

            {/* --- RIGHT ACTIONS --- */}
            <div className="flex items-center gap-2 md:gap-3">

              {/* Mobile Search Trigger */}
              <button className="w-10 h-10 flex items-center justify-center text-gray-600 bg-white/80 hover:bg-gray-50 rounded-full border border-gray-100 shadow-sm transition-colors lg:hidden">
                <Search className="w-5 h-5" />
              </button>

              {/* Dashboard Link (Desktop) */}
              <Link
                  href="/dashboard"
                  className="hidden md:flex w-10 h-10 items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                  title="Dashboard"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Link>

              {/* Notifications */}
              <div className="relative hidden md:block">
                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                        showNotifications ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                      <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
                  )}
                </button>

                {/* Elegant Notification Dropdown */}
                <div
                    className={`absolute right-0 top-[calc(100%+0.5rem)] w-80 bg-white rounded-[24px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-40 origin-top-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        showNotifications ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
                    }`}
                >
                  <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-extrabold text-sm text-gray-900">Notifications</h3>
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full transition-colors">Mark read</button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((n) => (
                        <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-gray-50/80 transition-colors cursor-pointer flex gap-4">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-sm font-bold text-gray-900">{n.title}</p>
                              <span className="text-[10px] font-bold text-gray-400">{n.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">{n.message}</p>
                          </div>
                        </div>
                    ))}
                  </div>
                  <Link href="/notifications" className="block w-full p-4 text-center text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                    View full inbox
                  </Link>
                </div>
              </div>

              {/* Wishlist */}
              <Link
                  href="/favorites"
                  className="hidden md:flex w-10 h-10 items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <div className="hidden md:block w-px h-6 bg-gray-200 mx-2" />

              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                <Link href="/auth" className="hidden md:block text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                  Log in
                </Link>
                <Link
                    href="/auth"
                    className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign Up
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-900 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Invisible backdrop to close notifications when clicking outside */}
        {showNotifications && (
            <div className="fixed inset-0 z-30 hidden md:block" onClick={() => setShowNotifications(false)} />
        )}

        {/* --- PREMIUM MOBILE DRAWER --- */}
        <div
            className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${
                mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
        >
          {/* Animated Blur Backdrop */}
          <div
              className={`absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-500 ease-out ${
                  mobileMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel (iOS Bottom-Sheet Style Side Menu) */}
          <div
              className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white rounded-l-[32px] shadow-[0_0_40px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
                  mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            {/* Drawer Header */}
            <div className="p-6 pb-4 flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Home className="w-5 h-5" />
              </div>
              <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">

              {/* User Profile Snippet */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-200 shadow-sm">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-gray-900">Welcome Guest</p>
                  <p className="text-xs font-semibold text-gray-500">Sign in to manage bookings</p>
                </div>
              </div>

              {/* Main Links */}
              <div className="mb-8">
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 ml-2">Main Menu</p>
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group flex items-center justify-between p-3.5 rounded-2xl hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-sm transition-all">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-base font-bold text-gray-700 group-hover:text-gray-900">{link.label}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 transition-colors" />
                        </Link>
                    )
                  })}
                </div>
              </div>

              {/* Secondary Links */}
              <div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 ml-2">Account</p>
                <div className="space-y-1">
                  <Link href="/dashboard" className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 font-bold transition-colors">
                    <LayoutDashboard className="w-5 h-5 text-gray-400" /> Dashboard
                  </Link>
                  <Link href="/settings" className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 font-bold transition-colors">
                    <Settings className="w-5 h-5 text-gray-400" /> Settings
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer (Fixed CTA) */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white to-transparent">
              <Link
                  href="/auth"
                  className="flex items-center justify-center w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-base shadow-xl shadow-gray-900/10 active:scale-[0.98] transition-all hover:bg-indigo-600"
              >
                Log In / Sign Up
              </Link>
            </div>

          </div>
        </div>
      </>
  );
}