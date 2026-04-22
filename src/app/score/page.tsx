"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ScorePage() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Determine from progress logic. Here we mock it as 45
    const target = 45;
    let current = 0;
    const interval = setInterval(() => {
      if (current >= target) clearInterval(interval);
      else {
        current += 1;
        setScore(current);
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-display text-brand-600">Election Readiness Score</h1>
        <p className="text-muted-foreground mt-1">Your personalized evaluation metric</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Card className="bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/40 dark:to-background border-brand-200">
          <CardContent className="p-8 flex flex-col items-center justify-center">
             <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/50" />
                <motion.circle
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                  strokeDasharray="251.2"
                  strokeLinecap="round"
                  className="text-brand-500"
                />
              </svg>
              <div className="absolute flex flex-col items-center text-brand-800 dark:text-brand-300">
                <span className="text-5xl font-bold font-display">{score}</span>
                <span className="text-xs uppercase tracking-wider font-semibold mt-1">Level: Beginner</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">How to improve your score:</h2>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4 flex gap-4 items-center">
              <div className="bg-blue-100 p-2 rounded text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">Complete your Checklist</h3>
                <p className="text-xs text-muted-foreground">You have 5 pending items.</p>
              </div>
              <Link href="/checklist"><Button size="sm" variant="outline">Go</Button></Link>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4 flex gap-4 items-center">
               <div className="bg-purple-100 p-2 rounded text-purple-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div className="flex-grow">
                 <h3 className="font-semibold">Review Micro-Learning modules</h3>
                 <p className="text-xs text-muted-foreground">Learn about EVM, NOTA, etc.</p>
              </div>
               <Link href="/learn"><Button size="sm" variant="outline">Go</Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
