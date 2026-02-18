'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Home,
    CheckCircle2, Chrome, Facebook, ShieldCheck, Sparkles, Star,
    Smartphone, Building2
} from 'lucide-react';

export default function AuthPage() {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        agreeTerms: false
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        // Optional: clear errors here
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // router.push('/dashboard')
        }, 1500);
    };

    return (
        <div className="min-h-screen flex bg-white font-sans selection:bg-indigo-500 selection:text-white">

            {/* ==================== LEFT SIDE (FORM) ==================== */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-12 xl:px-24 relative z-10">

                {/* Logo Mobile */}
                <div className="lg:hidden mb-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                            <Home className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-slate-900">RentEase</span>
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto">

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                            {mode === 'login' ? 'Welcome back' : 'Create an account'}
                        </h1>
                        <p className="text-slate-500 text-sm md:text-base">
                            {mode === 'login'
                                ? 'Enter your details to access your dashboard.'
                                : 'Join 50,000+ landlords and tenants today.'}
                        </p>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-sm font-bold text-slate-700 group">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-sm font-bold text-slate-700 group">
                            <img src="https://www.svgrepo.com/show/475647/apple-color.svg" className="w-5 h-5" alt="Apple" />
                            Apple
                        </button>
                    </div>

                    <div className="relative flex items-center gap-4 mb-8">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or continue with</span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {mode === 'register' && (
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 uppercase">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        name="name" type="text" placeholder="John Doe"
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 uppercase">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    name="email" type="email" placeholder="name@company.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    onChange={handleInput}
                                />
                            </div>
                        </div>

                        {mode === 'register' && (
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 uppercase">Phone Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        name="phone" type="tel" placeholder="+234 800..."
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <div className="flex justify-between">
                                <label className="text-xs font-bold text-slate-700 uppercase">Password</label>
                                {mode === 'login' && <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</a>}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    onChange={handleInput}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {mode === 'register' && (
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed">
                                    I agree to the <a href="#" className="font-bold text-indigo-600">Terms of Service</a> and <a href="#" className="font-bold text-indigo-600">Privacy Policy</a>.
                                </label>
                            </div>
                        )}

                        <button
                            disabled={isLoading}
                            className="w-full bg-slate-900 text-white h-12 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-indigo-900/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm text-slate-500 font-medium">
                        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={toggleMode} className="text-indigo-600 font-bold hover:underline">
                            {mode === 'login' ? 'Sign up' : 'Log in'}
                        </button>
                    </p>

                </div>
            </div>

            {/* ==================== RIGHT SIDE (VISUAL) ==================== */}
            <div className="hidden lg:flex w-[55%] bg-[#0D0D2B] relative overflow-hidden items-center justify-center p-12">

                {/* Abstract Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -ml-20 -mb-20" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 max-w-lg">

                    {/* Logo Brand */}
                    <Link href="/" className="absolute top-12 left-12 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                            <Home className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">RentEase</span>
                    </Link>

                    {/* Testimonial / Value Prop Card */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl animate-fade-in">
                        <div className="flex gap-1 mb-6">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />)}
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                            "The easiest way to find a home in Lagos. Verified listings only."
                        </h2>
                        <div className="flex items-center gap-4 mt-8">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full border-2 border-white/20" alt="User" />
                            <div>
                                <p className="text-white font-bold text-sm">Sarah Adebayo</p>
                                <p className="text-white/50 text-xs">Moved to Lekki, Lagos</p>
                            </div>
                        </div>
                    </div>

                    {/* Feature List */}
                    <div className="grid grid-cols-2 gap-4 mt-12">
                        {[
                            { icon: ShieldCheck, label: 'Verified Agents' },
                            { icon: Sparkles, label: 'Cleaning Services' },
                            { icon: Smartphone, label: 'Easy Payments' },
                            { icon: Building2, label: 'Virtual Tours' },
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-400">
                                    <feature.icon className="w-5 h-5" />
                                </div>
                                <span className="text-white font-bold text-sm">{feature.label}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
}