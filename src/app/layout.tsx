import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Optimize Font Loading
const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-jakarta",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: "%s | RentEase",
        default: "RentEase - Find Your Perfect Apartment",
    },
    description: "All-in-one platform for apartment hunting, moving services, cleaning, and household essentials.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
        <body
            className={`${jakarta.variable} min-h-screen flex flex-col antialiased bg-gray-50 text-gray-900 selection:bg-indigo-500 selection:text-white`}
        >
        {/* Header is Fixed, so it floats on top */}
        <Header />

        {/* ADDED: pt-20 (padding-top: 5rem/80px)
                   This pushes the content down so it starts exactly below the header
                   instead of behind it.
                */}
        <main className="flex-1 w-full flex flex-col pt-20">
            {children}
        </main>

        <Footer />
        </body>
        </html>
    );
}