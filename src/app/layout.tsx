import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import OfflineBanner from "@/components/ui/OfflineBanner";
import "@/lib/firebase";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "VoteSmart AI - India's Civic Companion",
  description: "A privacy-first, AI-powered election education and voting readiness platform for India. Neutral, verified, and accessible.",
  keywords: ["elections india", "voter registration", "voting guide", "civic education", "evm simulation", "voter id india", "votesmart ai"],
  authors: [{ name: "VoteSmart Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  openGraph: {
    title: "VoteSmart AI - India's Civic Companion",
    description: "The AI-powered guide for every Indian voter. Neutral and privacy-first.",
    type: "website",
    locale: "en_IN",
    siteName: "VoteSmart AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoteSmart AI",
    description: "Your digital guide to Indian elections.",
  },
};

import { MotionProvider } from "@/components/providers/MotionProvider";
import { AuthProvider } from "@/context/AuthContext";
import { DataSync } from "@/components/utils/DataSync";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#FF9933" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans flex flex-col min-h-screen`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-lg focus:font-bold">
          Skip to content
        </a>
        <AuthProvider>
          <DataSync />
          <MotionProvider>
            <OfflineBanner />
            <Navbar />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
          </MotionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
