"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useStore } from "@/lib/store";
import PollingGuidance from "@/components/features/PollingGuidance";

export default function Dashboard() {
  const score = useStore((state) => state.score);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate score on load
    const target = score;
    let current = 0;
    if (target === 0) return;
    const interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval);
        setAnimatedScore(target);
      } else {
        current += 1;
        setAnimatedScore(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/50 pb-8">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-600 mb-2"
          >
            <span className="w-8 h-[1px] bg-brand-600"></span>
            Citizen Command Center
          </motion.div>
          <h1 className="text-4xl font-black font-display tracking-tight text-foreground sm:text-5xl">
            Welcome back, <span className="gradient-text">Citizen</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-lg font-light">Your personalized roadmap to becoming an informed voter.</p>
        </div>
        <Link href="/kit">
          <Button size="lg" className="rounded-xl shadow-xl shadow-brand-500/10 h-14 px-8 font-bold">
            Download Personal Kit 📄
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Readiness Score Card */}
        <Card className="lg:col-span-4 border-none glass shadow-premium rounded-2xl overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-accent-500 to-success-500"></div>
          <CardHeader className="pt-8 text-center">
            <CardTitle className="text-xl font-bold font-display tracking-tight">Electoral Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90 filter drop-shadow-md" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-muted/30" />
                <motion.circle
                  initial={{ strokeDashoffset: 263.8 }}
                  animate={{ strokeDashoffset: 263.8 - (263.8 * animatedScore) / 100 }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  cx="50" cy="50" r="42" stroke="#000080" strokeWidth="7" fill="transparent"
                  strokeDasharray="263.8"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-black font-display text-[#FF9933] leading-none">{animatedScore}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#138808] mt-2">Percent Ready</span>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 w-full">
              <div className="p-3 bg-white/40 dark:bg-slate-900/40 rounded-xl border border-white/20 text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Rank</p>
                <p className="text-sm font-bold">A+ Certified</p>
              </div>
              <div className="p-3 bg-white/40 dark:bg-slate-900/40 rounded-xl border border-white/20 text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Impact</p>
                <p className="text-sm font-bold">High Potential</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ActionCard 
            title="AI Assistant"
            desc="Voice-enabled guide for all your electoral queries."
            href="/assistant"
            icon="🤖"
            delay={0.1}
          />
          <ActionCard 
            title="Eligibility Engine"
            desc="Verify your voting rights in 60 seconds."
            href="/decision-tree"
            icon="⚖️"
            delay={0.2}
          />
          <ActionCard 
            title="Digital Poll"
            desc="Step into a 3D mock voting booth experience."
            href="/simulate"
            icon="🗳️"
            delay={0.3}
          />
          <ActionCard 
            title="Civic Hub"
            desc="Connect and discuss with the community."
            href="/community"
            icon="🤝"
            delay={0.4}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PollingGuidance />
        {/* Timeline/Updates Card */}
        <Card className="border-none glass shadow-premium rounded-2xl overflow-hidden">
          <CardHeader className="bg-accent-500/5 border-b border-accent-100/20">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-ping"></span>
              Electoral Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex gap-4 items-start relative pb-6 border-l-2 border-accent-100 ml-2 pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent-500 shadow-lg shadow-accent-500/30"></div>
                <div>
                  <p className="text-sm font-bold">Phase 1: Voter Registration</p>
                  <p className="text-xs text-muted-foreground">Ensure your name is in the roll before the deadline.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start relative pb-6 border-l-2 border-accent-100 ml-2 pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-500"></div>
                <div>
                  <p className="text-sm font-bold">Phase 2: Polling Day</p>
                  <p className="text-xs text-muted-foreground">Carry your EPIC card or approved ID alternatives.</p>
                </div>
                <Link href="/checklist" className="ml-auto">
                  <Button variant="outline" size="sm" className="rounded-lg font-bold">Prepare</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ActionCard({ title, desc, href, delay, icon }: { title: string, desc: string, href: string, delay: number, icon: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }} className="h-full">
      <Link href={href} className="block h-full">
        <Card className="h-full premium-card border-none glass hover:bg-white/80 dark:hover:bg-slate-900/80 group cursor-pointer overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 text-6xl opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 grayscale">
            {icon}
          </div>
          <CardHeader className="pb-2">
            <div className="w-10 h-10 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">
              {icon}
            </div>
            <CardTitle className="text-lg font-bold group-hover:text-brand-600 transition-colors font-display tracking-tight">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">{desc}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
