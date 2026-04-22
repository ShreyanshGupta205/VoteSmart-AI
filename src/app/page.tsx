"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-brand-100">
      {/* Disclaimer Banner */}
      <div className="bg-brand-50 text-brand-900 border-b border-brand-100 px-4 py-2.5 text-xs text-center font-semibold tracking-wide uppercase">
        Educational Platform • Not affiliated with the Election Commission of India
      </div>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-8 py-32 sm:py-48 overflow-hidden">
          {/* Animated Background Elements - Tiranga Themed */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#FF9933]/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-[#ffffff]/40 blur-[100px] rounded-full animate-pulse delay-700" />
            <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[40%] bg-[#138808]/20 blur-[120px] rounded-full animate-pulse delay-1000" />
          </div>

          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl lg:text-8xl font-display leading-[1.1]">
                Empowering the <br />
                <span className="gradient-text">Next Generation</span> of Voters
              </h1>
              <p className="mt-8 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto font-light">
                A privacy-first, AI-powered election companion. Master the voting process, verify eligibility, and make impact-driven decisions for India&apos;s democracy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold shadow-xl shadow-brand-500/20">
                  Launch Dashboard
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg font-bold glass">
                  Explore Learning Hub
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl font-display">Interactive Civic Tools</h2>
            <p className="text-muted-foreground mt-4">Everything you need to be 100% election ready.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="AI Assistant" 
              description="Get neutral, verified answers about the electoral process from our dedicated AI companion."
              href="/assistant"
              icon="🤖"
            />
            <FeatureCard 
              title="Voting Simulator" 
              description="Step-by-step EVM & VVPAT practice to build confidence before you hit the booth."
              href="/simulate"
              icon="🗳️"
            />
            <FeatureCard 
              title="Readiness Kit" 
              description="A personalized checklist and PDF guide to ensure you have all documents ready."
              href="/checklist"
              icon="📋"
            />
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border/50 glass">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="text-2xl">🇮🇳</span>
            <span className="font-display font-bold text-xl tracking-tighter">VoteSmart AI</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Making democracy accessible, transparent, and digital-first for the citizens of India.
          </p>
          <div className="mt-8 flex justify-center space-x-8 text-sm font-medium">
            <Link href="/privacy" className="text-muted-foreground hover:text-brand-600 transition-colors">Privacy</Link>
            <Link href="/community" className="text-muted-foreground hover:text-brand-600 transition-colors">Community</Link>
            <Link href="/score" className="text-muted-foreground hover:text-brand-600 transition-colors">Civic Score</Link>
          </div>
          <p className="mt-8 text-xs text-muted-foreground/60">&copy; {new Date().getFullYear()} VoteSmart AI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description, href, icon }: { title: string, description: string, href: string, icon: string }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={href}>
        <Card className="h-full cursor-pointer premium-card border-none glass hover:bg-white/80 dark:hover:bg-slate-900/80">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center text-2xl mb-4">
              {icon}
            </div>
            <CardTitle className="text-2xl font-bold font-display">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
