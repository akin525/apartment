'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin, Calendar, Clock, Truck, Package, ArrowRight, CheckCircle2,
  X, Info, Shield, Star, Zap, CreditCard, Banknote, ChevronLeft,
  Navigation, Box, ArrowLeft
} from 'lucide-react';

// Mock Data for the component to function standalone
const truckTypes = [
  { id: 'mini', name: 'Mini Van', capacity: '500kg', pricePerKm: 2500, description: 'Best for single items & boxes', icon: <Truck className="w-8 h-8" /> },
  { id: 'midi', name: 'Midi Truck', capacity: '2 Tons', pricePerKm: 4500, description: '1-Bedroom apartment moves', icon: <Truck className="w-8 h-8" /> },
  { id: 'maxi', name: 'Box Body', capacity: '5 Tons', pricePerKm: 8000, description: '3+ Bedroom full relocation', icon: <Truck className="w-8 h-8" /> },
];

const itemCategories = [
  'Furniture', 'Electronics', 'Kitchenware', 'Wardrobe Boxes',
  'Appliances', 'Mattresses', 'Office Desk', 'Fragile Art'
];

export default function TruckBookingPage() {
  // State
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Form Data
  const [locations, setLocations] = useState({ pickup: '', dropoff: '' });
  const [schedule, setSchedule] = useState({ date: '', time: '' });
  const [selectedTruckId, setSelectedTruckId] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Derived State
  const selectedTruck = truckTypes.find(t => t.id === selectedTruckId);
  const distance = 24.5; // Mock distance
  const basePrice = selectedTruck ? selectedTruck.pricePerKm * distance : 0;
  const serviceFee = 2500;
  const insurance = 1500;
  const total = basePrice + serviceFee + insurance;

  // Handlers
  const toggleItem = (item: string) => {
    setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleNext = () => {
    setLoading(true);
    // Simulate API validation
    setTimeout(() => {
      setLoading(false);
      setStep(prev => prev + 1);
    }, 400);
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBookingComplete(true);
    }, 1500);
  };

  const steps = [
    { num: 1, label: 'Route' },
    { num: 2, label: 'Vehicle' },
    { num: 3, label: 'Details' },
    { num: 4, label: 'Pay' },
  ];

  if (bookingComplete) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Booking Confirmed!</h2>
            <p className="text-slate-500 mb-8">
              Your driver <span className="font-bold text-slate-900">Michael</span> is scheduled to arrive at {schedule.time} on {schedule.date}.
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-slate-500 text-sm">Booking ID</span>
                <span className="font-mono font-bold text-slate-900">#TRK-8829</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-sm">Total Paid</span>
                <span className="font-bold text-slate-900">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href="/dashboard" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                Track Driver
              </Link>
              <Link href="/" className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                Home
              </Link>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white pb-20">

        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-sm">
              <ArrowLeft className="w-4 h-4" /> Exit
            </Link>
            <span className="font-bold text-slate-900">ParkMyLoad™</span>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* LEFT COLUMN: Main Form */}
            <div className="lg:col-span-2">

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0" />
                  <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 rounded-full z-0 transition-all duration-500"
                      style={{ width: `${((step - 1) / 3) * 100}%` }}
                  />

                  {steps.map((s) => (
                      <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                step >= s.num
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110'
                                    : 'bg-white border-2 border-slate-200 text-slate-400'
                            }`}
                        >
                          {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s.num ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {s.label}
                    </span>
                      </div>
                  ))}
                </div>
              </div>

              {/* STEP 1: ROUTE */}
              {step === 1 && (
                  <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-100 animate-fade-in">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Where are we moving?</h2>

                    <div className="grid gap-6">
                      {/* Map Visualizer */}
                      <div className="h-48 bg-slate-100 rounded-2xl relative overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80"
                            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                            alt="Map"
                        />

                        {/* Overlay Route Line */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <path d="M 100 100 Q 250 50 400 120" stroke="#6366f1" strokeWidth="3" fill="none" strokeDasharray="6 4" className="animate-pulse" />
                        </svg>

                        {/* Markers */}
                        <div className="absolute top-[80px] left-[90px] w-4 h-4 bg-indigo-600 rounded-full ring-4 ring-white shadow-lg animate-bounce" />
                        <div className="absolute top-[110px] left-[390px] w-4 h-4 bg-emerald-500 rounded-full ring-4 ring-white shadow-lg animate-bounce delay-100" />
                      </div>

                      {/* Inputs */}
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                            <Navigation className="w-4 h-4" />
                          </div>
                          <input
                              type="text"
                              placeholder="Pickup Location"
                              value={locations.pickup}
                              onChange={e => setLocations({...locations, pickup: e.target.value})}
                              className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                          />
                        </div>

                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <input
                              type="text"
                              placeholder="Drop-off Location"
                              value={locations.dropoff}
                              onChange={e => setLocations({...locations, dropoff: e.target.value})}
                              className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Date/Time */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                              type="date"
                              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-500"
                              onChange={e => setSchedule({...schedule, date: e.target.value})}
                          />
                        </div>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <select
                              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 appearance-none"
                              onChange={e => setSchedule({...schedule, time: e.target.value})}
                          >
                            <option>Select Time</option>
                            <option>Morning (8am - 12pm)</option>
                            <option>Afternoon (12pm - 4pm)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
              )}

              {/* STEP 2: VEHICLE */}
              {step === 2 && (
                  <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-100 animate-fade-in">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Select a vehicle</h2>
                    <div className="grid gap-4">
                      {truckTypes.map((truck) => (
                          <div
                              key={truck.id}
                              onClick={() => setSelectedTruckId(truck.id)}
                              className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                  selectedTruckId === truck.id
                                      ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-600'
                                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                              }`}
                          >
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${selectedTruckId === truck.id ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                              {truck.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h3 className="font-bold text-slate-900">{truck.name}</h3>
                                <span className="text-sm font-bold text-indigo-600">₦{truck.pricePerKm.toLocaleString()}<span className="text-slate-400 text-xs font-normal">/km</span></span>
                              </div>
                              <p className="text-xs text-slate-500 mb-2">{truck.description}</p>
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-600 uppercase">
                             <Box className="w-3 h-3" /> {truck.capacity}
                           </span>
                            </div>

                            {/* Radio Circle */}
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedTruckId === truck.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                              {selectedTruckId === truck.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
              )}

              {/* STEP 3: ITEMS & DETAILS */}
              {step === 3 && (
                  <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-100 animate-fade-in">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">What are we moving?</h2>
                    <p className="text-slate-500 text-sm mb-6">Select generic categories to help the driver prepare.</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                      {itemCategories.map((item) => (
                          <button
                              key={item}
                              onClick={() => toggleItem(item)}
                              className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                                  selectedItems.includes(item)
                                      ? 'bg-slate-900 text-white border-slate-900'
                                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                              }`}
                          >
                            {item}
                          </button>
                      ))}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Driver Notes</h3>
                    <textarea
                        placeholder="E.g. Gate code is 1234, watch out for the narrow stairs..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        rows={4}
                    />
                  </div>
              )}

              {/* STEP 4: PAYMENT */}
              {step === 4 && (
                  <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-100 animate-fade-in">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Payment Method</h2>

                    <div className="space-y-3 mb-8">
                      {['Credit / Debit Card', 'Bank Transfer', 'Pay on Delivery'].map((method) => (
                          <button
                              key={method}
                              onClick={() => setPaymentMethod(method)}
                              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                                  paymentMethod === method
                                      ? 'border-indigo-600 bg-indigo-50/30'
                                      : 'border-slate-200 hover:bg-slate-50'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center">
                                {method.includes('Card') ? <CreditCard className="w-5 h-5 text-slate-600" /> : <Banknote className="w-5 h-5 text-slate-600" />}
                              </div>
                              <span className="font-bold text-slate-700">{method}</span>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method ? 'border-indigo-600' : 'border-slate-300'}`}>
                              {paymentMethod === method && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                            </div>
                          </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-sm font-medium">
                      <Shield className="w-5 h-5" />
                      Payments are held in escrow until delivery is confirmed.
                    </div>
                  </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8">
                {step > 1 ? (
                    <button
                        onClick={() => setStep(prev => prev - 1)}
                        className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                      Back
                    </button>
                ) : <div />}

                <button
                    onClick={step === 4 ? handlePayment : handleNext}
                    disabled={loading}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:bg-indigo-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : step === 4 ? `Pay ₦${total.toLocaleString()}` : 'Continue'}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: Sticky Summary */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">

                {/* Price Card */}
                <div className="bg-white rounded-[24px] p-6 shadow-xl shadow-slate-200/60 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-6">Order Summary</h3>

                  {/* Route Summary */}
                  <div className="relative pl-6 border-l-2 border-slate-100 space-y-6 mb-6">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 bg-indigo-600 rounded-full ring-4 ring-white" />
                      <p className="text-xs text-slate-400 font-bold uppercase">Pickup</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{locations.pickup || 'Select location'}</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 bg-emerald-500 rounded-full ring-4 ring-white" />
                      <p className="text-xs text-slate-400 font-bold uppercase">Drop-off</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{locations.dropoff || 'Select location'}</p>
                    </div>
                  </div>

                  {/* Vehicle */}
                  {selectedTruck && (
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-6">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 shadow-sm">{selectedTruck.icon}</div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{selectedTruck.name}</p>
                          <p className="text-xs text-slate-500">{distance} km est. distance</p>
                        </div>
                      </div>
                  )}

                  <div className="space-y-3 pt-6 border-t border-slate-100">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Base Fare</span>
                      <span>₦{basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Service Fee</span>
                      <span>₦{serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Goods Insurance</span>
                      <span>₦{insurance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100">
                      <span className="font-extrabold text-slate-900">Total</span>
                      <span className="text-xl font-extrabold text-indigo-600">₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-3 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 text-xs font-bold">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span>Fastest delivery in Lagos</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
  );
}