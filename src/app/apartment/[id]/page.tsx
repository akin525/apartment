'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  MapPin, Bed, Bath, Maximize, Heart, Star, Share2, ChevronLeft,
  ChevronRight, Phone, Mail, MessageCircle, Calendar, CheckCircle2,
  X, Shield, Car, Dumbbell, Zap, Camera, Lock, Building2,
  TreePine, Coffee, Tv, ShieldCheck, Wind
} from 'lucide-react';
import { apartments } from '@/lib/data';

// Map amenities to exact icons
const amenityIcons: Record<string, React.ElementType> = {
  'Swimming Pool': Wind, 'Gym': Dumbbell, '24/7 Security': Shield,
  'Parking': Car, 'Elevator': Building2, 'Rooftop Terrace': Coffee,
  'Smart Home': Tv, 'Concierge': Phone, 'Generator': Zap,
  'CCTV': Camera, 'WiFi': Tv, 'Security': Lock,
  'Air Conditioning': Wind, 'Balcony': TreePine,
  'Garden': TreePine, 'Underground Parking': Car, 'Rooftop Lounge': Coffee,
  'Tennis Court': Dumbbell, 'Clubhouse': Building2,
};

// Premium Amenity Pill Component
function AmenityItem({ label }: { label: string }) {
  const Icon = amenityIcons[label] || CheckCircle2;
  return (
      <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-500/5 transition-all group cursor-default">
        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
      </div>
  );
}

export default function ApartmentDetailPage() {
  const params = useParams();
  // Find apartment (In real app, fetch from API)
  const apartment = apartments.find(a => a.id === params.id);

  const [currentImage, setCurrentImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Form States
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '', time: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- 404 STATE ---
  if (!apartment) {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
          <div className="w-24 h-24 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center mb-6">
            <Building2 className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Listing Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-md text-center font-medium">
            The property you are looking for might have been removed or leased.
          </p>
          <Link href="/apartments" className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-indigo-600 hover:shadow-lg transition-all active:scale-95">
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
  };

  return (
      <div className="min-h-screen bg-gray-50 pb-24 font-sans selection:bg-indigo-500 selection:text-white">

        {/* --- PREMIUM BREADCRUMB / NAV BAR --- */}
        <div className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
              <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/apartments" className="hover:text-indigo-600 transition-colors">Discover</Link>
              <span>/</span>
              <span className="text-gray-900 truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">{apartment.title}</span>
            </div>
            <div className="flex gap-2">
              <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:border-red-200 hover:bg-red-50 transition-all group"
              >
                <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-500'}`} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all text-gray-400">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- HIGH-END GALLERY GRID (Bento Style) --- */}
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-[32px] overflow-hidden bg-gray-200 shadow-sm border border-gray-200/50">

            {/* Main Hero Image */}
            <div
                className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden"
                onClick={() => { setCurrentImage(0); setShowGallery(true); }}
            >
              <img src={apartment.images[0]} alt={apartment.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-4 left-4">
              <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-xs font-extrabold text-gray-900 rounded-full shadow-lg flex items-center gap-2 border border-white/20 hover:scale-105 transition-transform">
                <Camera className="w-3.5 h-3.5" /> View Full Gallery
              </span>
              </div>
            </div>

            {/* Secondary Grid Images */}
            <div className="hidden md:block relative group cursor-pointer overflow-hidden" onClick={() => { setCurrentImage(1); setShowGallery(true); }}>
              <img src={apartment.images[1]} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="hidden md:block relative group cursor-pointer overflow-hidden" onClick={() => { setCurrentImage(2); setShowGallery(true); }}>
              <img src={apartment.images[2]} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="hidden md:block relative group cursor-pointer overflow-hidden" onClick={() => { setCurrentImage(3); setShowGallery(true); }}>
              <img src={apartment.images[3] || apartment.images[0]} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>

            {/* "See All" Image Box */}
            <div
                className="hidden md:flex relative group cursor-pointer overflow-hidden items-center justify-center"
                onClick={() => { setCurrentImage(4); setShowGallery(true); }}
            >
              <img src={apartment.images[4] || apartment.images[1]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/60 transition-colors backdrop-blur-[2px]" />
              <div className="relative z-10 text-center text-white">
                <span className="text-3xl font-extrabold block mb-1">+{apartment.images.length > 4 ? apartment.images.length - 4 : 'All'}</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/80">Photos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-3 gap-10 mt-6 relative items-start">

          {/* ==================== LEFT COLUMN: DETAILS ==================== */}
          <div className="lg:col-span-2 space-y-12 pb-10">

            {/* Header Info */}
            <div className="flex flex-col gap-5 pb-8 border-b border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-extrabold uppercase tracking-widest">
                {apartment.status}
              </span>
                <span className="px-3 py-1 rounded-md bg-white border border-gray-200 text-gray-700 text-[10px] font-extrabold uppercase tracking-widest">
                {apartment.type}
              </span>
                <div className="flex items-center gap-1.5 text-orange-700 text-[10px] font-extrabold bg-orange-50 border border-orange-100 px-3 py-1 rounded-md">
                  <Star className="w-3 h-3 text-orange-500 fill-orange-500" /> {apartment.rating} ({apartment.reviews} reviews)
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-[1.1]">{apartment.title}</h1>
                <p className="text-gray-500 flex items-center gap-2 font-bold text-lg">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {apartment.address}, {apartment.area}, {apartment.city}
                </p>
              </div>

              {/* Premium Key Specs Strip */}
              <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-200 shadow-sm mt-2">
                <div className="flex items-center gap-4 flex-1 justify-center">
                  <Bed className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-lg font-extrabold text-gray-900 leading-none mb-1">{apartment.bedrooms}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bedrooms</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-100 hidden sm:block" />
                <div className="flex items-center gap-4 flex-1 justify-center">
                  <Bath className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-lg font-extrabold text-gray-900 leading-none mb-1">{apartment.bathrooms}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bathrooms</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-100 hidden sm:block" />
                <div className="flex items-center gap-4 flex-1 justify-center">
                  <Maximize className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-lg font-extrabold text-gray-900 leading-none mb-1">{apartment.sqft}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Square Feet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">About this home</h3>
              <div className="prose prose-gray max-w-none text-gray-500 font-medium leading-relaxed text-lg">
                <p>{apartment.description}</p>
                <p className="mt-4">
                  Designed for modern living, this property features premium finishes, abundant natural light, and state-of-the-art appliances. Located in a secure neighborhood with easy access to premier shopping malls, leading schools, and major highways.
                </p>
              </div>
            </div>

            {/* Amenities Grid */}
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {apartment.amenities.map((item) => (
                    <AmenityItem key={item} label={item} />
                ))}
              </div>
            </div>

            {/* Location / Map Placeholder */}
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">Location Context</h3>
              <div className="h-[300px] rounded-[32px] bg-gray-200 overflow-hidden relative group border border-gray-200 shadow-sm">
                <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
                    alt="Map View"
                    className="w-full h-full object-cover filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-gray-900 px-5 py-3 rounded-full shadow-2xl flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-white" />
                    <span className="font-bold text-white text-sm">Exact location provided after booking</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ==================== RIGHT COLUMN: STICKY BOOKING WIDGET ==================== */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] space-y-6">

              {/* Pricing & Booking Card */}
              <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-200">
                <div className="mb-8 pb-6 border-b border-gray-100">
                  <p className="text-gray-400 text-[10px] font-extrabold uppercase tracking-widest mb-2">Total Rent Price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900 tracking-tighter">₦{(apartment.price / 1000000).toFixed(1)}M</span>
                    <span className="text-sm font-bold text-gray-400">/year</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                      onClick={() => setShowBooking(true)}
                      className="w-full py-4 bg-gray-900 text-white rounded-full font-bold text-base shadow-lg hover:bg-indigo-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" /> Book Inspection
                  </button>
                  <button className="w-full py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-base hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm">
                    <MessageCircle className="w-5 h-5" /> Chat with Agent
                  </button>
                </div>
              </div>

              {/* Agent Profile Card */}
              <div className="bg-white rounded-[32px] p-6 border border-gray-200 shadow-sm flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img src={apartment.landlord.avatar} alt="Agent" className="w-16 h-16 rounded-full object-cover border border-gray-100" />
                    {apartment.landlord.verified && (
                        <div className="absolute bottom-0 right-0 bg-white p-0.5 rounded-full shadow-sm">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 fill-white" />
                        </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-1">Listed by</p>
                    <p className="text-lg font-bold text-gray-900 leading-none mb-1.5">{apartment.landlord.name}</p>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
                  <button className="py-3 rounded-xl bg-gray-50 text-gray-900 text-xs font-bold hover:bg-gray-100 transition-colors border border-gray-100">
                    View Profile
                  </button>
                  <button className="py-3 rounded-xl bg-gray-50 text-gray-900 text-xs font-bold hover:bg-gray-100 transition-colors border border-gray-100">
                    {apartment.landlord.phone}
                  </button>
                </div>
              </div>

              {/* Trust / Safety Notice */}
              <div className="bg-orange-50 rounded-[24px] p-5 border border-orange-100">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-orange-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-900 mb-1">Safety First</h4>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      Never transfer money before inspecting the property. Ensure you meet the agent in person.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==================== MODALS ==================== */}

        {/* Fullscreen Gallery Modal */}
        {showGallery && (
            <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-xl flex items-center justify-center animate-fade-in">
              <button
                  onClick={() => setShowGallery(false)}
                  className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 hover:scale-105 transition-all z-20 backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                  onClick={() => setCurrentImage(p => p === 0 ? apartment.images.length - 1 : p - 1)}
                  className="absolute left-4 md:left-8 p-4 bg-white/10 rounded-full text-white hover:bg-white/20 hover:scale-105 transition-all z-20 backdrop-blur-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                  onClick={() => setCurrentImage(p => p === apartment.images.length - 1 ? 0 : p + 1)}
                  className="absolute right-4 md:right-8 p-4 bg-white/10 rounded-full text-white hover:bg-white/20 hover:scale-105 transition-all z-20 backdrop-blur-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="relative w-full h-full max-w-6xl max-h-[85vh] px-16 flex items-center justify-center">
                <img
                    src={apartment.images[currentImage]}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                    alt="Gallery Preview"
                />
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/50 px-5 py-2.5 rounded-full backdrop-blur-xl border border-white/10 shadow-lg">
                <span className="text-white font-bold text-sm tracking-widest">{currentImage + 1} / {apartment.images.length}</span>
              </div>
            </div>
        )}

        {/* Clean SaaS Booking Modal */}
        {showBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowBooking(false)} />

              <div className="bg-white rounded-[32px] w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-slide-up border border-gray-200">
                {isSubmitted ? (
                    <div className="p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
                      <div className="w-20 h-20 bg-emerald-50 rounded-full border border-emerald-100 flex items-center justify-center mb-6 text-emerald-500 animate-bounce">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">Request Sent!</h3>
                      <p className="text-gray-500 mb-10 font-medium">
                        Agent <strong className="text-gray-900">{apartment.landlord.name}</strong> will contact you shortly to confirm your viewing appointment.
                      </p>
                      <button onClick={() => { setShowBooking(false); setIsSubmitted(false); }} className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:bg-indigo-600 transition-all active:scale-95 w-full">
                        Got it, thanks!
                      </button>
                    </div>
                ) : (
                    <>
                      <div className="bg-white p-6 border-b border-gray-100 flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-extrabold text-gray-900">Book Inspection</h3>
                          <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Free physical or virtual tour</p>
                        </div>
                        <button onClick={() => setShowBooking(false)} className="w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors shadow-sm">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleBookingSubmit} className="p-6 space-y-5 bg-gray-50/50">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                          <input
                              required name="name" onChange={handleInputChange}
                              className="w-full p-3.5 bg-white border border-gray-200 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                              placeholder="John Doe"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                          <input
                              required name="phone" type="tel" onChange={handleInputChange}
                              className="w-full p-3.5 bg-white border border-gray-200 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                              placeholder="+234 800..."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Date</label>
                            <input
                                required name="date" type="date" onChange={handleInputChange}
                                className="w-full p-3.5 bg-white border border-gray-200 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1">Time</label>
                            <select
                                required name="time" onChange={handleInputChange}
                                className="w-full p-3.5 bg-white border border-gray-200 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm appearance-none cursor-pointer"
                            >
                              <option value="">Select...</option>
                              <option value="morning">Morning</option>
                              <option value="afternoon">Afternoon</option>
                              <option value="evening">Evening</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-4">
                          <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:bg-indigo-600 active:scale-[0.98] transition-all">
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