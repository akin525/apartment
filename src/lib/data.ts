// Mock data for the apartment platform

export interface Apartment {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  area: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: 'Studio' | '1-Bedroom' | '2-Bedroom' | '3-Bedroom' | 'Penthouse' | 'Duplex';
  status: 'Available' | 'Reserved' | 'Rented';
  description: string;
  amenities: string[];
  images: string[];
  videoUrl?: string;
  landlord: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
    verified: boolean;
  };
  rating: number;
  reviews: number;
  featured: boolean;
  createdAt: string;
  lat: number;
  lng: number;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: 'New' | 'Fairly Used';
  description: string;
  images: string[];
  seller: {
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
    joinedDate: string;
  };
  location: string;
  listingType: 'Buy' | 'Sell' | 'Rent';
  createdAt: string;
}

export interface TruckType {
  id: string;
  name: string;
  description: string;
  capacity: string;
  pricePerKm: number;
  image: string;
  icon: string;
}

export interface CleaningService {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerSqft: number;
  duration: string;
  icon: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'apartment' | 'marketplace' | 'system';
  read: boolean;
  createdAt: string;
}

export const apartments: Apartment[] = [
  {
    id: '1',
    title: 'Luxury Skyline Penthouse',
    address: '42 Victoria Island Boulevard',
    city: 'Lagos',
    state: 'Lagos',
    area: 'Victoria Island',
    price: 450000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    type: 'Penthouse',
    status: 'Available',
    description: 'Experience luxury living at its finest in this stunning penthouse apartment with panoramic city views. This meticulously designed space features floor-to-ceiling windows, premium Italian marble flooring, and a state-of-the-art kitchen with top-of-the-line appliances. The master suite includes a walk-in closet and spa-like bathroom. Enjoy exclusive access to the rooftop terrace, infinity pool, and private gym.',
    amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Elevator', 'Rooftop Terrace', 'Smart Home', 'Concierge', 'Generator', 'CCTV'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    landlord: {
      name: 'Adebayo Properties',
      phone: '+234 801 234 5678',
      email: 'info@adebayoproperties.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      verified: true,
    },
    rating: 4.8,
    reviews: 24,
    featured: true,
    createdAt: '2024-01-15',
    lat: 6.4281,
    lng: 3.4219,
  },
  {
    id: '2',
    title: 'Modern Studio Apartment',
    address: '15 Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos',
    area: 'Lekki',
    price: 180000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    type: 'Studio',
    status: 'Available',
    description: 'A beautifully designed modern studio apartment perfect for young professionals. Features an open-plan living area with contemporary furnishings, a fully equipped kitchenette, and a cozy bedroom nook. Located in the heart of Lekki with easy access to restaurants, shopping centers, and nightlife.',
    amenities: ['WiFi', 'Security', 'Parking', 'Generator', 'Water Supply', 'Air Conditioning'],
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
    ],
    landlord: {
      name: 'Lagos Homes Ltd',
      phone: '+234 802 345 6789',
      email: 'contact@lagoshomes.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      verified: true,
    },
    rating: 4.5,
    reviews: 18,
    featured: false,
    createdAt: '2024-02-01',
    lat: 6.4474,
    lng: 3.4734,
  },
  {
    id: '3',
    title: 'Spacious Family Duplex',
    address: '8 Banana Island Road',
    city: 'Lagos',
    state: 'Lagos',
    area: 'Ikoyi',
    price: 750000,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 3500,
    type: 'Duplex',
    status: 'Available',
    description: 'An exquisite family duplex in the prestigious Banana Island estate. This property boasts 4 spacious bedrooms, each with en-suite bathrooms, a large living room, dining area, modern kitchen, and a private garden. The estate offers world-class amenities including a clubhouse, tennis court, and waterfront views.',
    amenities: ['Swimming Pool', 'Garden', 'Gym', '24/7 Security', 'Parking', 'Generator', 'Smart Home', 'Tennis Court', 'Waterfront', 'Clubhouse'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    landlord: {
      name: 'Premium Estates NG',
      phone: '+234 803 456 7890',
      email: 'info@premiumestates.ng',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
      verified: true,
    },
    rating: 4.9,
    reviews: 31,
    featured: true,
    createdAt: '2024-01-20',
    lat: 6.4550,
    lng: 3.4150,
  },
  {
    id: '4',
    title: 'Cozy 2-Bedroom Flat',
    address: '23 Wuse Zone 5',
    city: 'Abuja',
    state: 'FCT',
    area: 'Wuse',
    price: 250000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    type: '2-Bedroom',
    status: 'Available',
    description: 'A well-maintained 2-bedroom apartment in the serene Wuse area of Abuja. Features modern finishes, spacious rooms, and a balcony with city views. Close to major shopping centers, hospitals, and government offices. Perfect for small families or working professionals.',
    amenities: ['Security', 'Parking', 'Generator', 'Water Supply', 'Balcony', 'Air Conditioning'],
    images: [
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800&q=80',
      'https://images.unsplash.com/photo-1560185008-b033106af5c8?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    ],
    landlord: {
      name: 'Abuja Realty',
      phone: '+234 804 567 8901',
      email: 'hello@abujarealty.com',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80',
      verified: false,
    },
    rating: 4.3,
    reviews: 12,
    featured: false,
    createdAt: '2024-02-10',
    lat: 9.0579,
    lng: 7.4951,
  },
  {
    id: '5',
    title: 'Executive 3-Bedroom Suite',
    address: '5 Maitama Crescent',
    city: 'Abuja',
    state: 'FCT',
    area: 'Maitama',
    price: 500000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2000,
    type: '3-Bedroom',
    status: 'Reserved',
    description: 'An executive 3-bedroom suite in the upscale Maitama district. This premium apartment features high ceilings, marble floors, a gourmet kitchen, and a private study. The building offers 24/7 concierge service, underground parking, and a rooftop lounge with panoramic views of Abuja.',
    amenities: ['Concierge', 'Underground Parking', 'Rooftop Lounge', 'Gym', 'Security', 'Generator', 'Elevator', 'Smart Home'],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    ],
    landlord: {
      name: 'Capital Properties',
      phone: '+234 805 678 9012',
      email: 'info@capitalproperties.ng',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      verified: true,
    },
    rating: 4.7,
    reviews: 19,
    featured: true,
    createdAt: '2024-01-25',
    lat: 9.0820,
    lng: 7.4830,
  },
  {
    id: '6',
    title: 'Charming 1-Bedroom Apartment',
    address: '12 GRA Phase 2',
    city: 'Port Harcourt',
    state: 'Rivers',
    area: 'GRA',
    price: 150000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 750,
    type: '1-Bedroom',
    status: 'Available',
    description: 'A charming 1-bedroom apartment in the quiet GRA area of Port Harcourt. Recently renovated with modern fixtures, this apartment offers a comfortable living space with a well-fitted kitchen and a private balcony. Ideal for singles or couples looking for a peaceful retreat.',
    amenities: ['Security', 'Parking', 'Generator', 'Water Supply', 'Balcony', 'Garden'],
    images: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
      'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&q=80',
      'https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=800&q=80',
    ],
    landlord: {
      name: 'PH Homes',
      phone: '+234 806 789 0123',
      email: 'info@phhomes.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      verified: true,
    },
    rating: 4.4,
    reviews: 9,
    featured: false,
    createdAt: '2024-02-05',
    lat: 4.8156,
    lng: 7.0498,
  },
];

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'King Size Bed Frame with Mattress',
    price: 85000,
    category: 'Beds',
    condition: 'Fairly Used',
    description: 'Solid wood king size bed frame with a premium orthopedic mattress. Used for only 8 months, in excellent condition. Comes with matching side tables.',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    ],
    seller: {
      name: 'Chidi Okafor',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
      rating: 4.6,
      verified: true,
      joinedDate: '2023-06-15',
    },
    location: 'Lagos, Lekki',
    listingType: 'Sell',
    createdAt: '2024-02-10',
  },
  {
    id: '2',
    title: 'Samsung 500L Double Door Fridge',
    price: 120000,
    category: 'Fridges',
    condition: 'Fairly Used',
    description: 'Samsung 500L double door refrigerator with water dispenser. Still under warranty, works perfectly. Selling due to relocation.',
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80',
    ],
    seller: {
      name: 'Amina Bello',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      rating: 4.8,
      verified: true,
      joinedDate: '2023-03-20',
    },
    location: 'Abuja, Wuse',
    listingType: 'Sell',
    createdAt: '2024-02-08',
  },
  {
    id: '3',
    title: '4-Burner Gas Cooker with Oven',
    price: 45000,
    category: 'Gas Cookers',
    condition: 'New',
    description: 'Brand new 4-burner gas cooker with oven and grill. Stainless steel finish, auto-ignition feature. Still in original packaging.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    seller: {
      name: 'HomeStyle Store',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
      rating: 4.9,
      verified: true,
      joinedDate: '2022-11-01',
    },
    location: 'Lagos, Ikeja',
    listingType: 'Sell',
    createdAt: '2024-02-12',
  },
  {
    id: '4',
    title: 'Modern Dining Table Set (6 Chairs)',
    price: 65000,
    category: 'Chairs & Tables',
    condition: 'Fairly Used',
    description: 'Elegant modern dining table with 6 upholstered chairs. Tempered glass top with chrome legs. Minor scratches on the table surface.',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    ],
    seller: {
      name: 'Funke Adeyemi',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80',
      rating: 4.3,
      verified: false,
      joinedDate: '2023-09-10',
    },
    location: 'Lagos, Surulere',
    listingType: 'Sell',
    createdAt: '2024-02-06',
  },
  {
    id: '5',
    title: '3-Door Wooden Wardrobe',
    price: 55000,
    category: 'Wardrobes',
    condition: 'Fairly Used',
    description: 'Spacious 3-door wooden wardrobe with mirror, drawers, and hanging space. Solid construction, good condition. Disassembles for easy transport.',
    images: [
      'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80',
    ],
    seller: {
      name: 'Emeka Nwosu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      rating: 4.5,
      verified: true,
      joinedDate: '2023-07-22',
    },
    location: 'Port Harcourt, GRA',
    listingType: 'Sell',
    createdAt: '2024-02-04',
  },
  {
    id: '6',
    title: '55" LG Smart TV',
    price: 95000,
    category: 'Electronics',
    condition: 'Fairly Used',
    description: '55-inch LG Smart TV with 4K UHD resolution. WebOS platform with Netflix, YouTube, and other streaming apps. Comes with wall mount bracket and remote.',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
    ],
    seller: {
      name: 'TechDeals NG',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      rating: 4.7,
      verified: true,
      joinedDate: '2022-08-15',
    },
    location: 'Lagos, Victoria Island',
    listingType: 'Sell',
    createdAt: '2024-02-11',
  },
];

export const truckTypes: TruckType[] = [
  {
    id: 'small-van',
    name: 'Small Van',
    description: 'Perfect for studio apartments and small moves',
    capacity: 'Up to 500kg',
    pricePerKm: 150,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
    icon: '🚐',
  },
  {
    id: 'medium-truck',
    name: 'Medium Truck',
    description: 'Ideal for 1-2 bedroom apartments',
    capacity: 'Up to 1,500kg',
    pricePerKm: 250,
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80',
    icon: '🚛',
  },
  {
    id: 'big-truck',
    name: 'Big Truck',
    description: 'For large homes and office moves',
    capacity: 'Up to 3,000kg',
    pricePerKm: 400,
    image: 'https://images.unsplash.com/photo-1586191582056-3e3e4b541e06?w=400&q=80',
    icon: '🚚',
  },
];

export const cleaningServices: CleaningService[] = [
  {
    id: 'move-in',
    name: 'Move-in Cleaning',
    description: 'Get your new apartment sparkling clean before you move in. Includes deep cleaning of all rooms, kitchen, and bathrooms.',
    basePrice: 15000,
    pricePerSqft: 15,
    duration: '3-5 hours',
    icon: '🏠',
  },
  {
    id: 'move-out',
    name: 'Move-out Cleaning',
    description: 'Leave your old apartment in perfect condition. Thorough cleaning to ensure you get your deposit back.',
    basePrice: 18000,
    pricePerSqft: 18,
    duration: '4-6 hours',
    icon: '📦',
  },
  {
    id: 'deep-clean',
    name: 'Deep Cleaning',
    description: 'Comprehensive deep cleaning service covering every corner of your home. Includes appliance cleaning and sanitization.',
    basePrice: 25000,
    pricePerSqft: 22,
    duration: '5-8 hours',
    icon: '✨',
  },
  {
    id: 'post-construction',
    name: 'Post-Construction Cleaning',
    description: 'Specialized cleaning after renovation or construction. Removes dust, debris, and construction residue.',
    basePrice: 35000,
    pricePerSqft: 30,
    duration: '6-10 hours',
    icon: '🔨',
  },
];

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Booking Confirmed',
    message: 'Your apartment inspection at 42 Victoria Island Boulevard has been confirmed for Feb 20, 2024 at 2:00 PM.',
    type: 'booking',
    read: false,
    createdAt: '2024-02-15T10:30:00',
  },
  {
    id: '2',
    title: 'New Apartment Match',
    message: 'A new 2-bedroom apartment matching your search criteria is now available in Lekki Phase 1.',
    type: 'apartment',
    read: false,
    createdAt: '2024-02-14T15:45:00',
  },
  {
    id: '3',
    title: 'Price Drop Alert',
    message: 'The apartment you saved at 15 Admiralty Way has reduced its price by 10%!',
    type: 'apartment',
    read: true,
    createdAt: '2024-02-13T09:00:00',
  },
  {
    id: '4',
    title: 'Truck Booking Complete',
    message: 'Your ParkMyLoad truck booking for Feb 25 has been confirmed. Driver details have been shared.',
    type: 'booking',
    read: true,
    createdAt: '2024-02-12T14:20:00',
  },
  {
    id: '5',
    title: 'New Message',
    message: 'You have a new message from HomeStyle Store regarding the gas cooker listing.',
    type: 'marketplace',
    read: false,
    createdAt: '2024-02-11T11:15:00',
  },
];

export const states = ['Lagos', 'FCT', 'Rivers', 'Oyo', 'Kano', 'Enugu', 'Delta', 'Ogun'];
export const cities: Record<string, string[]> = {
  Lagos: ['Lagos Island', 'Ikeja', 'Lekki', 'Surulere', 'Yaba'],
  FCT: ['Abuja', 'Gwagwalada', 'Kuje'],
  Rivers: ['Port Harcourt', 'Obio-Akpor'],
  Oyo: ['Ibadan', 'Ogbomoso'],
  Kano: ['Kano City', 'Nassarawa'],
  Enugu: ['Enugu City', 'Nsukka'],
  Delta: ['Warri', 'Asaba'],
  Ogun: ['Abeokuta', 'Sagamu'],
};

export const apartmentTypes = ['Studio', '1-Bedroom', '2-Bedroom', '3-Bedroom', 'Penthouse', 'Duplex'];
export const marketplaceCategories = ['Beds', 'Gas Cookers', 'Fridges', 'Wardrobes', 'Chairs & Tables', 'Electronics'];