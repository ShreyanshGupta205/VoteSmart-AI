"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { m } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore, getScoreBreakdown } from "@/lib/store";

export default function ScorePage() {
  const storeState = useStore();
  const breakdown = getScoreBreakdown(storeState);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const target = breakdown.total;
    let current = 0;
    if (target === 0) { setAnimatedScore(0); return; }
    const interval = setInterval(() => {
      if (current >= target) { clearInterval(interval); setAnimatedScore(target); }
      else { current += 1; setAnimatedScore(current); }
    }, 15);
    return () => clearInterval(interval);
  }, [breakdown.total]);

  const level = breakdown.total >= 80 ? "Expert Voter" : breakdown.total >= 50 ? "Ready Voter" : breakdown.total >= 25 ? "Learning" : "Beginner";
  const levelColor = breakdown.total >= 80 ? "text-green-600" : breakdown.total >= 50 ? "text-brand-600" : breakdown.total >= 25 ? "text-yellow-600" : "text-gray-500";

  const categories = [
    { label: "📋 Checklist Completion", earned: breakdown.checklist, max: 30, href: "/checklist", done: storeState.checklistCompleted > 0 },
    { label: "🗳️ Voting Simulation", earned: breakdown.simulation, max: 25, href: "/simulate", done: storeState.hasSimulated },
    { label: "🧠 Quiz Score", earned: breakdown.quiz, max: 20, href: "/quiz", done: storeState.hasTakenQuiz },
    { label: "🛠️ Problems Solved", earned: breakdown.problems, max: 25, href: "/solve", done: storeState.problemsSolved.length > 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-display text-brand-600">Election Readiness Score</h1>
        <p className="text-muted-foreground mt-1">Your personalized evaluation — based on real progress.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Score ring */}
        <Card className="bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/40 dark:to-background border-brand-200">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="relative w-52 h-52 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/50" />
                <m.circle
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * breakdown.total) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                  strokeDasharray="251.2" strokeLinecap="round" className="text-brand-500"
                />
              </svg>
              <div className="absolute flex flex-col items-center text-brand-800 dark:text-brand-300">
                <span className="text-5xl font-bold font-display">{animatedScore}</span>
                <span className={`text-xs uppercase tracking-wider font-semibold mt-1 ${levelColor}`}>{level}</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 w-full">
              <div className="p-3 bg-white/50 dark:bg-black/20 rounded-xl border border-white/30 text-center">
                <p className="text-[10px] uppercase font-black text-muted-foreground mb-1">Problems Solved</p>
                <p className="text-lg font-bold">{storeState.problemsSolved.length}</p>
              </div>
              <div className="p-3 bg-white/50 dark:bg-black/20 rounded-xl border border-white/30 text-center">
                <p className="text-[10px] uppercase font-black text-muted-foreground mb-1">Checklist</p>
                <p className="text-lg font-bold">{storeState.checklistCompleted}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Score Breakdown</h2>
          {categories.map((cat) => {
            const pct = Math.round((cat.earned / cat.max) * 100);
            return (
              <Card key={cat.label} className={`border-l-4 ${cat.done ? "border-l-green-500" : "border-l-gray-300"}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{cat.label}</h3>
                    <span className="text-sm font-black text-brand-600">{cat.earned}/{cat.max} pts</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-3">
                    <m.div
                      className={`h-full rounded-full ${cat.done ? "bg-green-500" : "bg-brand-400"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  {!cat.done && (
                    <Link href={cat.href}>
                      <Button size="sm" variant="outline" className="w-full rounded-lg text-xs font-bold">
                        Complete to earn {cat.max} pts →
                      </Button>
                    </Link>
                  )}
                  {cat.done && <p className="text-xs text-green-600 font-bold">✓ Completed</p>}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Next actions */}
      {breakdown.total < 100 && (
        <div className="p-6 rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100">
          <h3 className="font-bold text-brand-700 dark:text-brand-400 mb-3">🎯 Next steps to improve your score:</h3>
          <div className="flex flex-wrap gap-2">
            {!storeState.hasTakenQuiz && <Link href="/quiz"><Button size="sm" className="rounded-xl">Take Quiz (+20pts)</Button></Link>}
            {!storeState.hasSimulated && <Link href="/simulate"><Button size="sm" className="rounded-xl">Try Simulator (+25pts)</Button></Link>}
            {storeState.checklistCompleted < 5 && <Link href="/checklist"><Button size="sm" className="rounded-xl">Complete Checklist (+{30 - breakdown.checklist}pts)</Button></Link>}
            {storeState.problemsSolved.length < 5 && <Link href="/solve"><Button size="sm" className="rounded-xl">Solve a Problem (+5pts)</Button></Link>}
          </div>
        </div>
      )}
    </div>
  );
}
