'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  MapPin, Bed, Bath, Maximize, Heart, Star, Share2, ChevronLeft,
  ChevronRight, Phone, Mail, MessageCircle, Calendar, CheckCircle2,
  Play, X, Shield, Clock, Wifi, Car, Dumbbell, Zap,
  Camera, Lock, Building2, TreePine, Coffee, Tv, ArrowRight,
  ShieldCheck, AlertCircle
} from 'lucide-react';
import { apartments } from '@/lib/data';

// Map amenities to icons
const amenityIcons: Record<string, React.ElementType> = {
  'Swimming Pool': MessageCircle, 'Gym': Dumbbell, '24/7 Security': Shield,
  'Parking': Car, 'Elevator': Building2, 'Rooftop Terrace': Coffee,
  'Smart Home': Tv, 'Concierge': Phone, 'Generator': Zap,
  'CCTV': Camera, 'WiFi': Wifi, 'Security': Lock,
  'Air Conditioning': Wind, 'Balcony': TreePine,
  'Garden': TreePine, 'Underground Parking': Car, 'Rooftop Lounge': Coffee,
  'Tennis Court': Dumbbell, 'Clubhouse': Building2,
};

// Helper component for Amenities to avoid repetitive code
function AmenityItem({ label }: { label: string }) {
  const Icon = amenityIcons[label] || CheckCircle2;
  return (
      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors group">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform text-indigo-600">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-semibold text-slate-700">{label}</span>
      </div>
  );
}

// Fallback icon component needed for the map above
function Wind(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg> }

export default function ApartmentDetailPage() {
  const params = useParams();
  // Find apartment (In real app, fetch from API)
  const apartment = apartments.find(a => a.id === params.id);

  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Form States
  const [bookingForm, setBookingForm] = useState({
    name: '', phone: '', date: '', time: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- 404 STATE ---
  if (!apartment) {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4">
          <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
            <Building2 className="w-10 h-10 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Listing Not Found</h2>
          <p className="text-slate-500 mb-8 max-w-md text-center">
            The property you are looking for might have been removed or leased.
          </p>
          <Link href="/apartments" className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors">
            Browse Listings
          </Link>
        </div>
    );
  }

  // Handle Booking Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset after delay or close modal logic would go here
  };

  return (
      <div className="min-h-screen bg-white pb-20 font-sans selection:bg-indigo-500 selection:text-white">

        {/* --- BREADCRUMB --- */}
        <div className="border-b border-slate-100 bg-white sticky top-0 z-30 backdrop-blur-md bg-white/80">
          <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/apartments" className="hover:text-indigo-600 transition-colors">Apartments</Link>
              <span>/</span>
              <span className="text-slate-900 truncate max-w-[150px] md:max-w-none">{apartment.title}</span>
            </div>
            <div className="flex gap-2">
              <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-full border transition-all ${isSaved ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'}`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- GALLERY GRID --- */}
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px] rounded-[32px] overflow-hidden">
            {/* Main Image */}
            <div
                className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden"
                onClick={() => setShowGallery(true)}
            >
              <img
                  src={apartment.images[0]}
                  alt={apartment.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold rounded-lg shadow-sm flex items-center gap-2">
                <Camera className="w-3 h-3" /> View Photos
              </span>
              </div>
            </div>

            {/* Secondary Images */}
            <div className="hidden md:block relative group cursor-pointer overflow-hidden" onClick={() => { setCurrentImage(1); setShowGallery(true); }}>
              <img src={apartment.images[1]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="hidden md:block relative group cursor-pointer overflow-hidden" onClick={() => { setCurrentImage(2); setShowGallery(true); }}>
              <img src={apartment.images[2]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="hidden md:block relative group cursor-pointer overflow-hidden" onClick={() => { setCurrentImage(3); setShowGallery(true); }}>
              <img src={apartment.images[3] || apartment.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>

            {/* "See All" Box */}
            <div
                className="hidden md:flex relative group cursor-pointer overflow-hidden bg-slate-900 items-center justify-center text-white"
                onClick={() => setShowGallery(true)}
            >
              {apartment.images[4] ? (
                  <img src={apartment.images[4]} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform" />
              ) : (
                  <div className="absolute inset-0 bg-slate-900" />
              )}
              <div className="relative z-10 text-center">
                <span className="text-2xl font-bold block">+{apartment.images.length > 4 ? apartment.images.length - 4 : 'All'}</span>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-300">Photos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-3 gap-10 mt-8">

          {/* --- LEFT COLUMN: DETAILS --- */}
          <div className="lg:col-span-2 space-y-10">

            {/* Header Info */}
            <div className="flex flex-col gap-6 pb-8 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-3">
               <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide">
                 {apartment.status}
               </span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wide">
                 {apartment.type}
               </span>
                <div className="flex items-center gap-1 text-orange-500 text-xs font-bold bg-orange-50 px-3 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-current" /> {apartment.rating} ({apartment.reviews} reviews)
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">{apartment.title}</h1>
                <p className="text-slate-500 flex items-center gap-2 font-medium">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  {apartment.address}, {apartment.area}, {apartment.city}
                </p>
              </div>

              {/* Key Specs Strip */}
              <div className="flex items-center gap-2 md:gap-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                    <Bed className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{apartment.bedrooms} Beds</p>
                    <p className="text-xs text-slate-400">Bedroom</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-slate-200 hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                    <Bath className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{apartment.bathrooms} Baths</p>
                    <p className="text-xs text-slate-400">Bathroom</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-slate-200 hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                    <Maximize className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{apartment.sqft} sqft</p>
                    <p className="text-xs text-slate-400">Area Size</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">About this home</h3>
              <div className="prose prose-slate max-w-none text-slate-500 leading-relaxed">
                <p>{apartment.description}</p>
                <p className="mt-4">
                  Designed for modern living, this property features premium finishes, abundant natural light, and state-of-the-art appliances. Located in a secure neighborhood with easy access to shopping malls, schools, and major highways.
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {apartment.amenities.map((item) => (
                    <AmenityItem key={item} label={item} />
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Location</h3>
              <div className="h-64 rounded-3xl bg-slate-100 overflow-hidden relative group">
                <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80"
                    alt="Map View"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    <span className="font-bold text-slate-900 text-sm">Exact location provided after booking</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: STICKY SIDEBAR --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">

              {/* 1. Price Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="mb-6">
                  <p className="text-slate-400 text-sm font-medium mb-1">Total Rent Price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">₦{apartment.price.toLocaleString()}</span>
                    <span className="text-sm font-semibold text-slate-400">/year</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                      onClick={() => setShowBooking(true)}
                      className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-900/20 hover:bg-indigo-600 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" /> Book Inspection
                  </button>
                  <button className="w-full py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Chat with Agent
                  </button>
                </div>
              </div>

              {/* 2. Agent Card */}
              <div className="bg-white rounded-[24px] p-6 border border-slate-100 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={apartment.landlord.avatar} alt="Agent" className="w-14 h-14 rounded-2xl object-cover" />
                    {apartment.landlord.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 fill-white" />
                        </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Listed by</p>
                    <p className="text-base font-bold text-slate-900">{apartment.landlord.name}</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-orange-400 fill-current" />)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button className="py-2.5 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-bold hover:bg-indigo-100 transition-colors">
                    View Profile
                  </button>
                  <button className="py-2.5 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors">
                    {apartment.landlord.phone}
                  </button>
                </div>
              </div>

              {/* 3. Safety Notice */}
              <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100">
                <div className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Safety First</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Never transfer money before inspecting the apartment. Ensure you meet the agent in person at the property location.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* --- MODALS --- */}

        {/* Gallery Modal */}
        {showGallery && (
            <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in">
              {/* Close */}
              <button
                  onClick={() => setShowGallery(false)}
                  className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-20"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation */}
              <button
                  onClick={() => setCurrentImage(p => p === 0 ? apartment.images.length - 1 : p - 1)}
                  className="absolute left-4 md:left-8 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                  onClick={() => setCurrentImage(p => p === apartment.images.length - 1 ? 0 : p + 1)}
                  className="absolute right-4 md:right-8 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative w-full h-full max-w-5xl max-h-[80vh] px-4 flex items-center justify-center">
                <img
                    src={apartment.images[currentImage]}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Counter */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                <span className="text-white font-bold text-sm">{currentImage + 1} / {apartment.images.length}</span>
              </div>
            </div>
        )}

        {/* Booking Modal */}
        {showBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowBooking(false)} />

              <div className="bg-white rounded-[32px] w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-scale-in">
                {isSubmitted ? (
                    <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600 animate-bounce">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Request Sent!</h3>
                      <p className="text-slate-500 mb-8">
                        Agent {apartment.landlord.name} will contact you shortly to confirm the appointment.
                      </p>
                      <button onClick={() => { setShowBooking(false); setIsSubmitted(false); }} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">
                        Close
                      </button>
                    </div>
                ) : (
                    <>
                      <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">Book Inspection</h3>
                          <p className="text-xs text-slate-500">Free physical or virtual tour</p>
                        </div>
                        <button onClick={() => setShowBooking(false)} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                          <input
                              required name="name" onChange={handleInputChange}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                              placeholder="John Doe"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                          <input
                              required name="phone" type="tel" onChange={handleInputChange}
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                              placeholder="+234 800..."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                            <input
                                required name="date" type="date" onChange={handleInputChange}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Time</label>
                            <select
                                required name="time" onChange={handleInputChange}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            >
                              <option value="">Select...</option>
                              <option value="morning">Morning (9AM - 12PM)</option>
                              <option value="afternoon">Afternoon (12PM - 4PM)</option>
                              <option value="evening">Evening (4PM - 6PM)</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-2">
                          <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 active:scale-[0.98] transition-all">
                            Confirm Schedule
                          </button>
                        </div>
                      </form>
                    </>
                )}
              </div>
            </div>
        )}

      </div>
  );
}