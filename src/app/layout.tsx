import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import OfflineBanner from "@/components/ui/OfflineBanner";

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
        <MotionProvider>
          <OfflineBanner />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </MotionProvider>
      </body>
    </html>
  );
}
