"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Disclaimer Banner */}
      <div className="bg-yellow-100 text-yellow-900 border-b border-yellow-200 px-4 py-2 text-sm text-center font-medium">
        Disclaimer: This platform is for educational purposes only and is not affiliated with the Election Commission of India.
      </div>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-8 py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-brand-50 to-white dark:from-brand-900/20 dark:to-background">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl font-display"
            >
              Your Journey to Becoming a <span className="text-brand-500">Smart Voter</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-muted-foreground"
            >
              A privacy-first, AI-powered election education platform. Discover your eligibility, practice voting safely, and make informed decisions for India&apos;s future.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full shadow-lg">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="outline" size="lg" className="rounded-full">
                  Learn the Basics
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="AI Assistant" 
              description="Got questions about voting? Our highly-trained, neutral AI companion is here to assist you 24/7."
              href="/assistant"
            />
            <FeatureCard 
              title="Voting Simulation" 
              description="Never voted before? Experience our step-by-step EVM and VVPAT mock voting simulation."
              href="/simulate"
            />
            <FeatureCard 
              title="Smart Checklist" 
              description="A personalized step-by-step checklist to ensure you are 100% election ready."
              href="/checklist"
            />
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} VoteSmart AI. Built for India.</p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link href="/community" className="hover:text-foreground">Community FAQs</Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, href }: { title: string, description: string, href: string }) {
  return (
    <Link href={href}>
      <Card className="h-full cursor-pointer hover:border-brand-300 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl text-brand-600 dark:text-brand-400">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
