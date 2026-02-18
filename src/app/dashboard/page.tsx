'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User, Heart, Calendar, Truck, Sparkles, Bell, Settings, LogOut,
  MapPin, Bed, Bath, Star, ChevronRight, Clock, CheckCircle2,
  Package, Eye, Edit3, Camera, Shield, Gift, Users, TrendingUp,
  Home, ShoppingBag, MessageCircle, CreditCard, ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { apartments } from '@/lib/data';

const notifications = [
  { id: '1', type: 'booking', title: 'Inspection Confirmed', message: 'Your visit to Luxury Skyline Penthouse is confirmed.', read: false, createdAt: '2024-03-10T09:00:00Z' },
  { id: '2', type: 'system', title: 'Welcome to RentEase', message: 'Thanks for joining! Complete your profile to get started.', read: true, createdAt: '2024-03-01T10:00:00Z' },
  { id: '3', type: 'price_drop', title: 'Price Drop Alert', message: 'A saved apartment in Lekki has dropped by 5%.', read: false, createdAt: '2024-03-12T14:30:00Z' },
];

const tabs = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'saved', label: 'Saved Homes', icon: Heart },
  { id: 'bookings', label: 'My Bookings', icon: Calendar },
  { id: 'logistics', label: 'Logistics', icon: Truck },
  { id: 'cleaning', label: 'Cleaning', icon: Sparkles },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// Mock Data
const stats = [
  { label: 'Saved Homes', value: '12', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Upcoming Tours', value: '3', icon: Calendar, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { label: 'Messages', value: '5', icon: MessageCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Total Spent', value: '₦45k', icon: CreditCard, color: 'text-orange-500', bg: 'bg-orange-50' },
];

const recentActivity = [
  { id: 1, action: 'Viewed', item: 'Luxury Penthouse in Ikoyi', time: '2 hours ago', icon: Eye },
  { id: 2, action: 'Booked', item: 'Moving Truck (Lekki -> VI)', time: '1 day ago', icon: Truck },
  { id: 3, action: 'Saved', item: '3-Bed Apartment in Yaba', time: '2 days ago', icon: Heart },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar state

  return (
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white pb-10">

        {/* ==================== TOP BAR (Mobile) ==================== */}
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <span className="font-bold text-slate-900">Dashboard</span>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-100 rounded-lg">
            <ChevronDown className={`w-5 h-5 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-8">

          {/* ==================== SIDEBAR ==================== */}
          <aside className={`lg:w-64 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>

            {/* User Profile Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6 text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
                  JD
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              </div>
              <h2 className="font-bold text-slate-900 text-lg">John Doe</h2>
              <p className="text-xs text-slate-500 mb-4">Member since 2024</p>
              <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors">
                Edit Profile
              </button>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <nav className="flex flex-col p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                      <button
                          key={tab.id}
                          onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                              isActive
                                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                  );
                })}

                <div className="h-px bg-slate-100 my-2 mx-4" />

                <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* ==================== MAIN CONTENT ==================== */}
          <main className="flex-1">

            {/* --- OVERVIEW TAB --- */}
            {activeTab === 'overview' && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
                    <p className="text-slate-500 text-sm">Welcome back, here's what's happening.</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                            <stat.icon className="w-5 h-5" />
                          </div>
                          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">

                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900">Recent Activity</h3>
                        <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
                      </div>
                      <div className="space-y-6">
                        {recentActivity.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                <item.icon className="w-4 h-4 text-slate-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">
                                  <span className="font-bold">{item.action}</span> {item.item}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>

                    {/* Promo Card */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white flex flex-col justify-between shadow-xl shadow-indigo-900/20">
                      <div>
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md">
                          <Gift className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Invite Friends</h3>
                        <p className="text-indigo-100 text-sm mb-6">Earn ₦5,000 credit for every friend who books a move.</p>
                      </div>
                      <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                        Copy Invite Link
                      </button>
                    </div>

                  </div>
                </div>
            )}

            {/* --- SAVED TAB --- */}
            {activeTab === 'saved' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-900">Saved Homes</h2>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">3 Items</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {apartments.slice(0, 3).map(apt => (
                        <Link href={`/apartment/${apt.id}`} key={apt.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all">
                          <div className="relative h-40">
                            <img src={apt.images[0]} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm">
                              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-slate-900 text-sm truncate mb-1">{apt.title}</h3>
                            <p className="text-xs text-slate-500 mb-3">{apt.area}, {apt.city}</p>
                            <p className="font-bold text-indigo-600 text-sm">₦{(apt.price/1000000).toFixed(1)}M <span className="text-slate-400 font-normal">/yr</span></p>
                          </div>
                        </Link>
                    ))}
                  </div>
                </div>
            )}

            {/* --- SETTINGS TAB --- */}
            {activeTab === 'settings' && (
                <div className="max-w-2xl animate-fade-in">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h2>

                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-6">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="font-bold text-slate-900 text-sm">Personal Info</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">First Name</label>
                          <input type="text" defaultValue="John" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Last Name</label>
                          <input type="text" defaultValue="Doe" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Email Address</label>
                        <input type="email" defaultValue="john@example.com" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold" />
                      </div>
                      <div className="pt-2">
                        <button className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-indigo-600 transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="font-bold text-slate-900 text-sm">Preferences</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {['Email Notifications', 'SMS Alerts', 'Marketing Emails'].map((item) => (
                          <div key={item} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">{item}</span>
                            <div className="w-11 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
            )}

            {/* --- NOTIFICATIONS TAB --- */}
            {activeTab === 'notifications' && (
                <div className="max-w-2xl animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
                    <button className="text-xs font-bold text-indigo-600 hover:underline">Mark all read</button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                        <div key={notif.id} className={`p-4 rounded-2xl border flex gap-4 ${notif.read ? 'bg-white border-slate-100' : 'bg-indigo-50/50 border-indigo-100'}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.read ? 'bg-slate-100 text-slate-500' : 'bg-indigo-100 text-indigo-600'}`}>
                            <Bell className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{notif.title}</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
                            <p className="text-[10px] text-slate-400 mt-2">2 hours ago</p>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            )}

          </main>
        </div>
      </div>
  );
}