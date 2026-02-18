'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Search, Filter, Grid3X3, List, MapPin, Star, Heart, Tag,
    ShoppingBag, Plus, ArrowUpDown, X, CheckCircle2, MessageCircle,
    SlidersHorizontal, Package, ChevronDown, Send, User, Image as ImageIcon
} from 'lucide-react';

// Mock Data (Expanded for visual appeal)
const marketplaceCategories = ['Furniture', 'Electronics', 'Appliances', 'Decor', 'Garden', 'Tools'];
const conditions = ['New', 'Like New', 'Good', 'Fair'];
const marketplaceItems = [
    {
        id: '1', title: 'IKEA Nordli Chest of Drawers', price: 85000, category: 'Furniture', condition: 'Like New',
        location: 'Lekki Phase 1', description: 'White modern dresser, barely used. Moving out sale.',
        images: ['https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80'],
        seller: { name: 'Sarah J.', avatar: 'https://i.pravatar.cc/150?u=1', verified: true, rating: 4.9 },
        createdAt: '2024-03-10'
    },
    {
        id: '2', title: 'Samsung 55" 4K Smart TV', price: 250000, category: 'Electronics', condition: 'Good',
        location: 'Victoria Island', description: 'Works perfectly, comes with remote and wall mount.',
        images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80'],
        seller: { name: 'David K.', avatar: 'https://i.pravatar.cc/150?u=2', verified: true, rating: 4.5 },
        createdAt: '2024-03-12'
    },
    {
        id: '3', title: 'Modern Gray Sofa', price: 120000, category: 'Furniture', condition: 'Fair',
        location: 'Yaba', description: 'Super comfortable 3-seater. Needs a deep clean but structurally sound.',
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'],
        seller: { name: 'Emmanuel', avatar: 'https://i.pravatar.cc/150?u=3', verified: false, rating: 4.0 },
        createdAt: '2024-03-08'
    },
    {
        id: '4', title: 'Nespresso Coffee Machine', price: 45000, category: 'Appliances', condition: 'New',
        location: 'Ikoyi', description: 'Unopened box. Received as a gift.',
        images: ['https://images.unsplash.com/photo-1517093157656-b9ecc894eac1?w=800&q=80'],
        seller: { name: 'Chidinma', avatar: 'https://i.pravatar.cc/150?u=4', verified: true, rating: 5.0 },
        createdAt: '2024-03-14'
    },
];

export default function MarketplacePage() {
    // State
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeCondition, setActiveCondition] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    // Interaction State
    const [savedItems, setSavedItems] = useState<string[]>([]);

    // Chat State
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeChatSeller, setActiveChatSeller] = useState<any>(null);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState<{from: 'me' | 'them', text: string}[]>([]);

    // Filtering Logic
    const filteredItems = useMemo(() => {
        let result = [...marketplaceItems];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(i => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
        }

        if (activeCategory !== 'All') {
            result = result.filter(i => i.category === activeCategory);
        }

        if (activeCondition) {
            result = result.filter(i => i.condition === activeCondition);
        }

        switch (sortBy) {
            case 'price-low': result.sort((a, b) => a.price - b.price); break;
            case 'price-high': result.sort((a, b) => b.price - a.price); break;
            default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        return result;
    }, [searchQuery, activeCategory, activeCondition, sortBy]);

    // Actions
    const handleChatOpen = (seller: any) => {
        setActiveChatSeller(seller);
        setMessages([
            { from: 'them', text: `Hi! Is this item still available?` }
        ]);
        setIsChatOpen(true);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        setMessages([...messages, { from: 'me', text: chatInput }]);
        setChatInput('');
        // Mock reply
        setTimeout(() => {
            setMessages(prev => [...prev, { from: 'them', text: "Yes, it is! When would you like to pick it up?" }]);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-500 selection:text-white pb-20">

            {/* ==================== HERO HEADER ==================== */}
            <div className="bg-[#0D0D2B] relative overflow-hidden pt-28 pb-12">
                {/* Background FX */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-50%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-white">Marketplace</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                Furnish your home <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">for less.</span>
                            </h1>
                            <p className="text-slate-400 max-w-lg text-lg">
                                Buy and sell pre-loved furniture and appliances within the RentEase community.
                            </p>
                        </div>

                        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 self-start">
                            <Plus className="w-5 h-5" />
                            <span>Sell an Item</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ==================== STICKY CONTROLS ==================== */}
            <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
                <div className="container mx-auto px-4 md:px-6 py-4">

                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">

                        {/* Search */}
                        <div className="relative w-full lg:max-w-md group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search chairs, tables, tv..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all outline-none"
                            />
                        </div>

                        {/* Filters & Sort */}
                        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border whitespace-nowrap transition-all ${
                                    showFilters
                                        ? 'bg-slate-900 text-white border-slate-900'
                                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                <Filter className="w-4 h-4" /> Filters
                            </button>

                            <div className="h-8 w-px bg-slate-200 mx-1 flex-shrink-0" />

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white border border-slate-200 text-slate-700 text-sm font-bold py-2.5 pl-3 pr-8 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-orange-500"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat' }}
                            >
                                <option value="newest">Newest Listed</option>
                                <option value="price-low">Price: Low - High</option>
                                <option value="price-high">Price: High - Low</option>
                            </select>

                            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 ml-auto lg:ml-0">
                                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-400'}`}>
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-400'}`}>
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Expanded Filters */}
                    {(showFilters || activeCategory !== 'All' || activeCondition) && (
                        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-4 animate-slide-down">

                            {/* Category Pills */}
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setActiveCategory('All')}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategory === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                >
                                    All
                                </button>
                                {marketplaceCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Condition Pills */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400 uppercase">Condition:</span>
                                {conditions.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setActiveCondition(activeCondition === c ? '' : c)}
                                        className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${activeCondition === c ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ==================== LISTINGS ==================== */}
            <div className="container mx-auto px-4 md:px-6 py-8">
                {filteredItems.length > 0 ? (
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' : 'flex flex-col gap-4 max-w-4xl mx-auto'}>

                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className={`group bg-white border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 rounded-[20px] overflow-hidden ${
                                    viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
                                }`}
                            >
                                {/* Image */}
                                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square w-full'}`}>
                                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                                    <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold shadow-sm uppercase tracking-wide ${item.condition === 'New' ? 'bg-emerald-500 text-white' : 'bg-white/90 backdrop-blur text-slate-900'}`}>
                      {item.condition}
                    </span>
                                    </div>

                                    <button
                                        onClick={() => setSavedItems(prev => prev.includes(item.id) ? prev.filter(x => x !== item.id) : [...prev, item.id])}
                                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all group/btn"
                                    >
                                        <Heart className={`w-4 h-4 transition-colors ${savedItems.includes(item.id) ? 'fill-orange-500 text-orange-500' : 'text-white group-hover/btn:text-orange-500'}`} />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">{item.category}</p>
                                            <p className="text-lg font-bold text-slate-900">₦{item.price.toLocaleString()}</p>
                                        </div>

                                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                        <p className="text-xs text-slate-500 line-clamp-2 mb-4">{item.description}</p>
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <img src={item.seller.avatar} alt={item.seller.name} className="w-6 h-6 rounded-full" />
                                            <span className="text-xs font-semibold text-slate-600">{item.seller.name}</span>
                                            {item.seller.verified && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                        </div>

                                        <button
                                            onClick={() => handleChatOpen(item.seller)}
                                            className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-900 hover:text-white transition-colors"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                            <Tag className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No items found</h3>
                        <p className="text-slate-500 max-w-xs mx-auto mb-8">
                            Try removing filters or search for something else.
                        </p>
                        <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveCondition(''); }} className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm">
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {/* ==================== FLOATING CHAT WIDGET ==================== */}
            {isChatOpen && activeChatSeller && (
                <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden animate-slide-up">

                    {/* Header */}
                    <div className="bg-slate-900 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img src={activeChatSeller.avatar} className="w-10 h-10 rounded-full border-2 border-slate-700" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">{activeChatSeller.name}</p>
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-orange-400 fill-current" />
                                    <span className="text-xs text-slate-400 font-medium">{activeChatSeller.rating} Rating</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 bg-slate-50 p-4 h-64 overflow-y-auto space-y-3">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                                    msg.from === 'me'
                                        ? 'bg-orange-500 text-white rounded-br-none'
                                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <button type="button" className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            className="flex-1 bg-slate-50 border-none rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-orange-500/20 outline-none"
                        />
                        <button type="submit" disabled={!chatInput} className="p-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed">
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}

        </div>
    );
}