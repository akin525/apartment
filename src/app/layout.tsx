import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-jakarta",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: "%s | RentEase",
        default: "RentEase - The Modern Way to Live",
    },
    description: "Find premium apartments, book logistics, and schedule cleaners—all in one elegant ecosystem.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
        <body
            className={`${jakarta.variable} min-h-screen flex flex-col font-sans selection:bg-brand-500 selection:text-white`}
        >
        <Header />
        <main className="flex-1 w-full flex flex-col relative">
            {children}
        </main>

        <Footer />
        </body>
        </html>
    );
}