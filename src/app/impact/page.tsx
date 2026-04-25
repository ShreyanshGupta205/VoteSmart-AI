"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const impactData = {
  constituency: 1_000_000,
  avgMargin2019: 11_000,
  avgMargin2024: 8_500,
  turnout2019: 67.4,
  turnout2024: 65.8,
  totalVoters2024: 968_000_000,
  seats2024: 543,
  votesByGroup: [
    { group: "If 1000 more people vote", change: "+0.1% turnout", impact: "Enough to shift a close constituency result" },
    { group: "If 10,000 more vote", change: "+1% turnout", impact: "Changes winning margins in nearly 60 seats" },
    { group: "If 100,000 more vote", change: "+10% turnout", impact: "Fundamentally reshapes election outcomes across states" },
  ],
};

function AnimatedBar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
  return (
    <div className="relative h-10 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
      <m.div
        className={`h-full ${color} rounded-xl`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-black text-white mix-blend-difference">{pct}%</span>
    </div>
  );
}

function CountUp({ target, suffix = "", delay = 0 }: { target: number; suffix?: string; delay?: number }) {
  return (
    <m.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="tabular-nums"
    >
      {target.toLocaleString("en-IN")}{suffix}
    </m.span>
  );
}

export default function ImpactPage() {
  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-brand-50 text-brand-600 text-xs font-black uppercase tracking-widest border border-brand-100">
          📊 Voting Impact
        </m.div>
        <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight">Your Vote <span className="gradient-text">Matters</span></h1>
        <p className="text-muted-foreground mt-3 text-lg font-light max-w-xl mx-auto">Real numbers that show how one vote changes outcomes. Democracy runs on the margin.</p>
      </div>

      {/* Big stat */}
      <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
        className="rounded-3xl bg-gradient-to-br from-brand-500 to-accent-500 p-8 md:p-12 text-white text-center shadow-2xl shadow-brand-500/20">
        <p className="text-sm font-black uppercase tracking-widest opacity-70 mb-2">Average winning margin in Lok Sabha 2024</p>
        <p className="text-6xl md:text-8xl font-black font-display leading-none">
          <CountUp target={impactData.avgMargin2024} delay={0.4} />
        </p>
        <p className="text-xl font-bold opacity-80 mt-2">votes</p>
        <p className="text-sm opacity-60 mt-4 max-w-md mx-auto">
          In a constituency of ~{(impactData.constituency / 1000).toFixed(0)}K voters, just 8,500 votes decided the winner. That&apos;s less than 1% of eligible voters.
        </p>
      </m.div>

      {/* Turnout comparison */}
      <div>
        <h2 className="text-2xl font-black font-display mb-6">📈 Voter Turnout: 2019 vs 2024</h2>
        <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl">
          <CardContent className="p-8 space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold">2019 General Election</span>
                <span className="text-sm font-bold text-brand-600">{impactData.turnout2019}%</span>
              </div>
              <AnimatedBar pct={impactData.turnout2019} color="bg-brand-500" delay={0.3} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold">2024 General Election</span>
                <span className="text-sm font-bold text-accent-500">{impactData.turnout2024}%</span>
              </div>
              <AnimatedBar pct={impactData.turnout2024} color="bg-accent-500" delay={0.6} />
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Turnout dropped by 1.6% from 2019 to 2024. That represents approximately <strong>15.5 million people</strong> who didn&apos;t vote. Enough to flip <strong>hundreds of constituencies</strong>.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* What if more people voted */}
      <div>
        <h2 className="text-2xl font-black font-display mb-6">🧮 What if more people voted?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {impactData.votesByGroup.map((item, i) => (
            <m.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
              className="p-6 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm">
              <p className="text-2xl font-black text-brand-500 mb-1">{item.change}</p>
              <p className="text-sm font-bold text-foreground mb-2">{item.group}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.impact}</p>
            </m.div>
          ))}
        </div>
      </div>

      {/* Scale */}
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Registered Voters 2024", value: "968M+", icon: "🗳️" },
          { label: "Lok Sabha Seats", value: "543", icon: "🏛️" },
          { label: "Avg Constituency Size", value: "~1.8M", icon: "👥" },
          { label: "Your 1 Vote =", value: "100%", sub: "of your say", icon: "⭐" },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 text-center shadow-sm">
            <span className="text-3xl block mb-2">{stat.icon}</span>
            <p className="text-xl font-black text-brand-500">{stat.value}</p>
            {stat.sub && <p className="text-xs text-brand-600 font-bold">{stat.sub}</p>}
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </m.div>

      {/* CTA */}
      <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-success-50 to-brand-50 dark:from-success-500/10 dark:to-brand-500/10 border-2 border-success-500/20">
        <p className="text-2xl font-black font-display mb-2">Ready to make your vote count?</p>
        <p className="text-muted-foreground mb-6">Check your registration, know your booth, and vote with confidence.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/solve"><Button className="h-12 px-8 rounded-xl font-bold bg-brand-500 hover:bg-brand-600">Solve My Issue →</Button></Link>
          <Link href="/checklist"><Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-2">Build My Checklist →</Button></Link>
        </div>
      </div>
    </div>
  );
}
