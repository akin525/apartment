import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-jakarta)', 'sans-serif'], // Maps to the Next.js font loader
            },
            colors: {
                primary: {
                    DEFAULT: '#6C5CE7',
                    dark: '#5A4BD1',
                    light: '#A29BFE',
                    glow: 'rgba(108, 92, 231, 0.35)',
                },
                secondary: {
                    DEFAULT: '#FF6B6B',
                    light: '#FF8787',
                },
                accent: {
                    DEFAULT: '#00CEC9',
                    dark: '#00B5B0',
                    light: '#55EFC4',
                },
                dark: {
                    DEFAULT: '#0D0D2B',
                    light: '#161650',
                    card: '#1E1E5A',
                },
                gray: {
                    50: '#F8FAFD',
                    100: '#F1F4F9',
                    200: '#E3E8F0',
                    300: '#C8D1DE',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                },
                success: { DEFAULT: '#00B894', light: '#55EFC4' },
                warning: { DEFAULT: '#FDCB6E', dark: '#F0932B' },
                info: '#74B9FF',
            },
            boxShadow: {
                'glow': '0 0 40px rgba(108, 92, 231, 0.15)',
                'card': '0 2px 16px rgba(0, 0, 0, 0.06)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            },
            borderRadius: {
                'md': '14px',
                'lg': '20px',
                'xl': '28px',
                '2xl': '36px',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #6C5CE7 0%, #00CEC9 100%)',
                'gradient-warm': 'linear-gradient(135deg, #FF6B6B 0%, #FDCB6E 100%)',
                'gradient-cool': 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)',
                'gradient-dark': 'linear-gradient(135deg, #0D0D2B 0%, #161650 50%, #1E1E5A 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-down': 'slideDown 0.5s ease-out forwards',
                'slide-right': 'slideInRight 0.5s ease-out forwards',
                'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'float 4s ease-in-out infinite',
                'float-slow': 'floatSlow 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
                'blob': 'blob 8s ease-in-out infinite',
                'gradient-shift': 'gradientShift 6s ease infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(32px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(24px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                floatSlow: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-8px) rotate(1deg)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(108, 92, 231, 0.35)' },
                    '50%': { boxShadow: '0 0 0 12px rgba(108, 92, 231, 0)' },
                },
                blob: {
                    '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
                    '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
                },
                gradientShift: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            },
        },
    },
    plugins: [],
};

export default config;