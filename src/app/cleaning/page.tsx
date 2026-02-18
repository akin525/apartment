'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles, Calendar, Clock, MapPin, ArrowRight, CheckCircle2,
  Star, Shield, ArrowLeft, Camera, Upload, Home, Info, CreditCard, Banknote
} from 'lucide-react';

// Mock Data
const cleaningServices = [
  { id: 'standard', name: 'Standard Clean', basePrice: 15000, pricePerSqft: 10, duration: '2-3 hrs', description: 'Dusting, mopping, and bathroom cleaning.', icon: '✨' },
  { id: 'deep', name: 'Deep Clean', basePrice: 25000, pricePerSqft: 20, duration: '4-6 hrs', description: 'Includes inside appliances, windows, and deep scrub.', icon: '🧼' },
  { id: 'move', name: 'Move-in/out', basePrice: 35000, pricePerSqft: 25, duration: '6+ hrs', description: 'Full empty home cleaning for new tenants.', icon: '📦' },
];

const apartmentSizes = [
  { label: 'Studio', sqft: 400 },
  { label: '1 Bed', sqft: 600 },
  { label: '2 Beds', sqft: 900 },
  { label: '3 Beds', sqft: 1400 },
  { label: '4+ Beds', sqft: 2000 },
];

export default function CleaningPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedSize, setSelectedSize] = useState(apartmentSizes[1]); // Default to 1 bed
  const [schedule, setSchedule] = useState({ date: '', time: '' });
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Derived
  const service = cleaningServices.find(s => s.id === selectedServiceId);
  const baseTotal = service ? service.basePrice + (service.pricePerSqft * selectedSize.sqft) : 0;
  const tax = baseTotal * 0.075;
  const total = baseTotal + tax;

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(p => p + 1);
    }, 400);
  };

  const handleBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBookingComplete(true);
    }, 1500);
  };

  if (bookingComplete) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Sparkling Clean!</h2>
            <p className="text-slate-500 mb-8">
              Your cleaning session is booked for {schedule.date} at {schedule.time}. A cleaner will be assigned shortly.
            </p>
            <Link href="/dashboard" className="block w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Go to Dashboard
            </Link>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-cyan-500 selection:text-white pb-20">

        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
              <ArrowLeft className="w-4 h-4" /> Exit
            </Link>
            <span className="font-bold text-slate-900">RentEase Cleaning</span>
            <div className="w-10" />
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* LEFT: FORM */}
            <div className="lg:col-span-2">

              {/* Steps Indicator */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-cyan-500' : 'bg-slate-200'}`} />
                ))}
              </div>

              {/* STEP 1: SERVICE SELECTION */}
              {step === 1 && (
                  <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100 animate-fade-in">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Select Service</h2>
                    <p className="text-slate-500 mb-8">Choose the type of cleaning you need.</p>

                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      {cleaningServices.map((s) => (
                          <div
                              key={s.id}
                              onClick={() => setSelectedServiceId(s.id)}
                              className={`cursor-pointer rounded-2xl p-5 border-2 transition-all hover:shadow-lg ${
                                  selectedServiceId === s.id
                                      ? 'border-cyan-500 bg-cyan-50/30'
                                      : 'border-slate-100 hover:border-cyan-200 bg-white'
                              }`}
                          >
                            <div className="text-3xl mb-4">{s.icon}</div>
                            <h3 className="font-bold text-slate-900 mb-1">{s.name}</h3>
                            <p className="text-xs text-slate-500 mb-4 h-10 leading-relaxed">{s.description}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
                              <span className="text-xs font-bold text-cyan-600">From ₦{s.basePrice/1000}k</span>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedServiceId === s.id ? 'border-cyan-500 bg-cyan-500' : 'border-slate-200'}`}>
                                {selectedServiceId === s.id && <CheckCircle2 className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Apartment Size</h3>
                    <div className="flex flex-wrap gap-3">
                      {apartmentSizes.map((size) => (
                          <button
                              key={size.label}
                              onClick={() => setSelectedSize(size)}
                              className={`px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                                  selectedSize.label === size.label
                                      ? 'border-slate-900 bg-slate-900 text-white'
                                      : 'border-slate-100 bg-white text-slate-600 hover:border-slate-300'
                              }`}
                          >
                            {size.label}
                          </button>
                      ))}
                    </div>
                  </div>
              )}

              {/* STEP 2: DETAILS */}
              {step === 2 && (
                  <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100 animate-fade-in">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Schedule & Location</h2>
                    <p className="text-slate-500 mb-8">When and where should we come?</p>

                    <div className="space-y-6">
                      {/* Date Time Grid */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 uppercase">Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="date"
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none"
                                onChange={(e) => setSchedule({ ...schedule, date: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 uppercase">Time</label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <select
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none appearance-none"
                                onChange={(e) => setSchedule({ ...schedule, time: e.target.value })}
                            >
                              <option>Select...</option>
                              {['Morning (8am)', 'Midday (12pm)', 'Afternoon (3pm)'].map(t => <option key={t}>{t}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase">Full Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                              type="text"
                              placeholder="Street address, apartment number..."
                              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none"
                              onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Upload */}
                      <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center hover:bg-slate-100 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                          <Camera className="w-5 h-5 text-cyan-500" />
                        </div>
                        <p className="text-sm font-bold text-slate-700">Upload photos (Optional)</p>
                        <p className="text-xs text-slate-400 mt-1">Help cleaners prepare by showing the space.</p>
                      </div>
                    </div>
                  </div>
              )}

              {/* STEP 3: PAYMENT */}
              {step === 3 && (
                  <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100 animate-fade-in">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment</h2>

                    <div className="space-y-3 mb-6">
                      <button className="w-full flex items-center justify-between p-4 rounded-xl border border-cyan-500 bg-cyan-50/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                            <CreditCard className="w-5 h-5 text-slate-600" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold text-slate-900">Pay Online</p>
                            <p className="text-xs text-slate-500">Secure card payment</p>
                          </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full" />
                        </div>
                      </button>

                      <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                            <Banknote className="w-5 h-5 text-slate-600" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold text-slate-900">Bank Transfer</p>
                            <p className="text-xs text-slate-500">Manual transfer</p>
                          </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                      </button>
                    </div>
                  </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                {step > 1 ? (
                    <button onClick={() => setStep(p => p - 1)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100">Back</button>
                ) : <div />}

                <button
                    onClick={step === 3 ? handleBooking : handleNext}
                    disabled={loading || (step === 1 && !selectedServiceId)}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:bg-cyan-600 hover:shadow-cyan-500/30 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : step === 3 ? `Pay ₦${total.toLocaleString()}` : 'Continue'}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-6">Booking Summary</h3>

                  {service ? (
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-2xl">{service.icon}</div>
                          <div>
                            <p className="font-bold text-slate-900">{service.name}</p>
                            <p className="text-xs text-slate-500">{service.duration} duration</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                       <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">
                         {selectedSize.label}
                       </span>
                          <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">
                         ~{selectedSize.sqft} sqft
                       </span>
                        </div>

                        <div className="pt-6 border-t border-slate-100 space-y-3">
                          <div className="flex justify-between text-sm text-slate-500">
                            <span>Base Service</span>
                            <span>₦{baseTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-500">
                            <span>Tax & Fees</span>
                            <span>₦{tax.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-lg font-extrabold text-slate-900 pt-2">
                            <span>Total</span>
                            <span className="text-cyan-600">₦{total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                  ) : (
                      <div className="text-center py-8 text-slate-400 text-sm">
                        Select a service to see price estimate.
                      </div>
                  )}
                </div>

                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4 flex gap-3">
                  <Shield className="w-5 h-5 text-cyan-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-cyan-900">Satisfaction Guarantee</p>
                    <p className="text-[10px] text-cyan-700 leading-relaxed">
                      If you're not happy with the clean, we'll re-clean for free.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
  );
}