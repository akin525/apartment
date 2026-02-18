'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin, Bed, Bath, Maximize, Star, X, Plus, CheckCircle2,
  XCircle, ArrowRight, Home
} from 'lucide-react';
import { apartments } from '@/lib/data';

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([apartments[0].id, apartments[2].id]);
  const [showSelector, setShowSelector] = useState(false);
  const [selectorSlot, setSelectorSlot] = useState(0);

  const selectedApartments = selectedIds.map(id => apartments.find(a => a.id === id)).filter(Boolean);

  const allAmenities = [...new Set(selectedApartments.flatMap(a => a?.amenities || []))];

  const addApartment = (id: string) => {
    const newIds = [...selectedIds];
    newIds[selectorSlot] = id;
    setSelectedIds(newIds);
    setShowSelector(false);
  };

  const removeApartment = (index: number) => {
    const newIds = [...selectedIds];
    newIds.splice(index, 1);
    setSelectedIds(newIds);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A1A2E] to-[#16213E] py-12">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Compare Apartments</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Compare Apartments</h1>
          <p className="text-gray-400">Compare up to 3 apartments side by side to make the best decision.</p>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Apartment Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[0, 1, 2].map((slot) => {
            const apt = selectedApartments[slot];
            if (apt) {
              return (
                <div key={slot} className="bg-white rounded-3xl overflow-hidden shadow-sm relative group">
                  <button
                    onClick={() => removeApartment(slot)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                  <div className="relative h-48 overflow-hidden">
                    <img src={apt.images[0]} alt={apt.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-bold text-lg">₦{apt.price.toLocaleString()}<span className="text-sm font-normal opacity-80">/yr</span></p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1">{apt.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {apt.area}, {apt.city}
                    </p>
                    <Link href={`/apartment/${apt.id}`} className="text-xs text-[#6C63FF] font-medium mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      View Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            }
            return (
              <button
                key={slot}
                onClick={() => { setSelectorSlot(slot); setShowSelector(true); }}
                className="bg-white rounded-3xl border-2 border-dashed border-gray-200 hover:border-[#6C63FF] min-h-[300px] flex flex-col items-center justify-center gap-3 transition-colors group"
              >
                <div className="w-16 h-16 bg-gray-100 group-hover:bg-[#6C63FF]/10 rounded-2xl flex items-center justify-center transition-colors">
                  <Plus className="w-8 h-8 text-gray-400 group-hover:text-[#6C63FF] transition-colors" />
                </div>
                <p className="text-sm font-medium text-gray-400 group-hover:text-[#6C63FF] transition-colors">Add Apartment</p>
              </button>
            );
          })}
        </div>

        {/* Comparison Table */}
        {selectedApartments.length >= 2 && (
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-6 text-sm font-bold text-gray-900 bg-gray-50 w-48">Feature</th>
                    {selectedApartments.map((apt, i) => (
                      <th key={i} className="p-6 text-center text-sm font-bold text-gray-900 bg-gray-50">
                        {apt?.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Price (Yearly)', key: 'price', format: (v: number) => `₦${v.toLocaleString()}` },
                    { label: 'Type', key: 'type' },
                    { label: 'Bedrooms', key: 'bedrooms' },
                    { label: 'Bathrooms', key: 'bathrooms' },
                    { label: 'Area (sqft)', key: 'sqft', format: (v: number) => v.toLocaleString() },
                    { label: 'Location', key: 'area', format: (_: string, apt: typeof apartments[0]) => `${apt.area}, ${apt.city}` },
                    { label: 'Status', key: 'status' },
                    { label: 'Rating', key: 'rating', format: (v: number, apt: typeof apartments[0]) => `${v} ⭐ (${apt.reviews} reviews)` },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-5 text-sm font-semibold text-gray-600">{row.label}</td>
                      {selectedApartments.map((apt, j) => {
                        const value = (apt as unknown as Record<string, unknown>)?.[row.key];
                        const formatted = row.format ? row.format(value as never, apt!) : String(value);
                        return (
                          <td key={j} className="p-5 text-center text-sm text-gray-700 font-medium">
                            {formatted}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Amenities Section */}
                  <tr className="border-b border-gray-100">
                    <td colSpan={selectedApartments.length + 1} className="p-5 bg-gray-50">
                      <span className="text-sm font-bold text-gray-900">Amenities</span>
                    </td>
                  </tr>
                  {allAmenities.map((amenity, i) => (
                    <tr key={`amenity-${i}`} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 text-sm text-gray-600">{amenity}</td>
                      {selectedApartments.map((apt, j) => (
                        <td key={j} className="p-4 text-center">
                          {apt?.amenities.includes(amenity) ? (
                            <CheckCircle2 className="w-5 h-5 text-[#10B981] mx-auto" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Action Row */}
                  <tr>
                    <td className="p-5"></td>
                    {selectedApartments.map((apt, j) => (
                      <td key={j} className="p-5 text-center">
                        <Link href={`/apartment/${apt?.id}`} className="btn-primary text-sm inline-flex">
                          View Details
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedApartments.length < 2 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Home className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Select at least 2 apartments</h3>
            <p className="text-gray-500">Add apartments to compare their features side by side.</p>
          </div>
        )}
      </div>

      {/* Apartment Selector Modal */}
      {showSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSelector(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-slide-up">
            <button
              onClick={() => setShowSelector(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Select an Apartment</h3>
            <div className="space-y-3">
              {apartments.filter(a => !selectedIds.includes(a.id)).map((apt) => (
                <button
                  key={apt.id}
                  onClick={() => addApartment(apt.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[#6C63FF] hover:bg-[#6C63FF]/5 transition-all text-left"
                >
                  <img src={apt.images[0]} alt={apt.title} className="w-20 h-16 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm">{apt.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {apt.area}, {apt.city}
                    </p>
                    <p className="text-sm font-bold text-[#6C63FF] mt-1">₦{apt.price.toLocaleString()}/yr</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Bed className="w-3 h-3" /> {apt.bedrooms}
                    <Bath className="w-3 h-3 ml-1" /> {apt.bathrooms}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}