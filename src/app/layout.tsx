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
  title: "VoteSmart AI - Civic Companion",
  description: "A privacy-first, AI-powered election education and voting readiness platform for India.",
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
