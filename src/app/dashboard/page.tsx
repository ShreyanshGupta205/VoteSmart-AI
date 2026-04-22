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
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight">Welcome back, Citizen</h1>
          <p className="text-muted-foreground mt-1 text-sm">Track your progress and get election ready.</p>
        </div>
        <Link href="/kit">
          <Button variant="outline" className="border-brand-500 text-brand-600">
            Download Personal Kit 📄
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Readiness Score */}
        <Card className="col-span-1 border-brand-200 shadow-md relative overflow-hidden bg-gradient-to-br from-brand-50 to-white dark:from-brand-900/30 dark:to-background">
          <CardHeader>
            <CardTitle className="text-lg">Readiness Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/50" />
                <motion.circle
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * animatedScore) / 100 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                  strokeDasharray="251.2"
                  strokeLinecap="round"
                  className="text-brand-500"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold font-display text-brand-600 dark:text-brand-400">{animatedScore}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">out of 100</span>
              </div>
            </div>
            <p className="text-sm text-center mt-4 text-muted-foreground">Keep learning to reach 100!</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ActionCard 
            title="AI Assistant"
            desc="Ask questions with Voice support."
            href="/assistant"
            delay={0.1}
          />
          <ActionCard 
            title="Am I Eligible?"
            desc="Interactive decision tree."
            href="/decision-tree"
            delay={0.2}
          />
          <ActionCard 
            title="Community Q&A"
            desc="Discuss safely with other voters."
            href="/community"
            delay={0.3}
          />
          <ActionCard 
            title="Mock Simulation"
            desc="Practice casting your vote digitally."
            href="/simulate"
            delay={0.4}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PollingGuidance />
        {/* Upcoming Event */}
        <Card className="border-accent-200">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center bg-accent-50 dark:bg-accent-900/20 p-4 rounded-lg">
              <div>
                <p className="font-semibold text-accent-700 dark:text-accent-300">Phase 1 Voting Day</p>
                <p className="text-sm text-muted-foreground">Check your state&apos;s schedule for exact dates.</p>
              </div>
              <Link href="/checklist">
                <Button size="sm">Get Ready</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ActionCard({ title, desc, href, delay }: { title: string, desc: string, href: string, delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="h-full">
      <Link href={href} className="block h-full">
        <Card className="h-full hover:border-brand-400 transition-colors group cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-md group-hover:text-brand-600 transition-colors">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
