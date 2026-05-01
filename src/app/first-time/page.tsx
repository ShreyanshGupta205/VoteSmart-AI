"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/lib/store";

const steps = [
  {
    id: 1, icon: "🎉", title: "Welcome, First-Time Voter!",
    desc: "You're about to exercise one of the most powerful rights in a democracy. This guide will walk you through everything — step by step, no confusion.",
    action: null,
  },
  {
    id: 2, icon: "🔍", title: "Step 1: Are you registered?",
    desc: "Many 18-year-olds get automatically added when they turn 18. Check your name on the electoral roll before you apply.",
    action: { label: "Check My Registration", href: "/status", internal: true },
    tip: "💡 If not registered, you can apply via Form 6 on voters.eci.gov.in. Takes ~10 minutes.",
  },
  {
    id: 3, icon: "🪪", title: "Step 2: Get your Voter ID",
    desc: "If you're registered, download your e-EPIC from voters.eci.gov.in. If not yet registered, you can vote using Aadhaar, PAN, Passport, or Driving License too.",
    action: { label: "See Valid Documents", href: "/documents", internal: true },
    tip: "💡 e-EPIC is a digital Voter ID — you can show it on your phone at the booth.",
  },
  {
    id: 4, icon: "🏛️", title: "Step 3: Find your Polling Booth",
    desc: "Your polling booth is assigned based on your registered address. You'll need your Part Number from the electoral search portal.",
    action: { label: "Find My Booth", href: "/polling", internal: true },
    tip: "💡 Best time to vote: 7–9 AM (low crowd) or 12–3 PM (post-lunch lull).",
  },
  {
    id: 5, icon: "🗳️", title: "Step 4: Practice the voting process",
    desc: "Never pressed an EVM button before? No worries. Try our mock simulator. Learn about NOTA, VVPAT, and exactly what happens inside the booth.",
    action: { label: "Try Mock Simulation", href: "/simulate", internal: true },
    tip: "💡 You have 7 seconds to confirm your vote on the VVPAT screen. Don't panic — it's automatic.",
  },
  {
    id: 6, icon: "📋", title: "Step 5: Prepare your Checklist",
    desc: "Build a personalized checklist of everything you need on voting day. Download it as a PDF to take with you.",
    action: { label: "Build My Checklist", href: "/checklist", internal: true },
    tip: "💡 Mobile phones are NOT allowed inside the voting compartment.",
  },
  {
    id: 7, icon: "✅", title: "You're Ready to Vote!",
    desc: "You've completed the First-Time Voter journey. Go make your voice heard — every single vote shapes the future of 1.4 billion people.",
    action: { label: "View My Readiness Score", href: "/score", internal: true },
    tip: "🏆 You've earned the First-Time Voter badge!",
  },
];

export default function FirstTimePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { setFirstTimeVoter, firstTimeVoter } = useStore();

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  const handleStart = () => {
    setFirstTimeVoter(true);
    setCurrentStep(1);
  };

  const progress = Math.round((currentStep / (steps.length - 1)) * 100);

  if (currentStep === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="max-w-2xl w-full text-center">
          <m.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <span className="text-8xl block mb-6">🌟</span>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-yellow-50 text-yellow-700 text-xs font-black uppercase tracking-widest border border-yellow-100">
              Simplified Mode
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight mb-4">
              First-Time <span className="gradient-text">Voter Guide</span>
            </h1>
            <p className="text-muted-foreground text-lg font-light mb-8 max-w-md mx-auto leading-relaxed">
              A simple, step-by-step journey from zero to voting confidently. No jargon. No confusion. Just clear guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleStart} size="lg" className="h-14 px-10 rounded-full font-bold text-lg shadow-xl shadow-brand-500/20">
                Start My Journey 🚀
              </Button>
              {!firstTimeVoter && (
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="h-14 px-10 rounded-full font-bold text-lg">
                    Skip — I know what I&apos;m doing
                  </Button>
                </Link>
              )}
            </div>
          </m.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Step {currentStep} of {steps.length - 1}</span>
          <span className="text-xs font-black text-brand-600">{progress}% Complete</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <m.div className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
        <div className="flex mt-2 gap-1">
          {steps.slice(1).map((_, i) => (
            <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i < currentStep ? "bg-brand-500" : "bg-gray-100 dark:bg-gray-800"}`} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <m.div key={currentStep} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}
          className="rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-2 border-yellow-200 dark:border-yellow-800 p-8 md:p-10 shadow-xl mb-6">
          <span className="text-6xl block mb-4">{step.icon}</span>
          <h2 className="text-2xl sm:text-3xl font-black font-display mb-4 text-foreground">{step.title}</h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">{step.desc}</p>
          {step.tip && (
            <div className="p-4 rounded-xl bg-white/60 dark:bg-black/20 border border-white/40 text-sm font-medium text-foreground">
              {step.tip}
            </div>
          )}
        </m.div>
      </AnimatePresence>

      {/* Action buttons */}
      <div className="space-y-3">
        {step.action && (
          <Link href={step.action.href}>
            <Button className="w-full h-12 rounded-xl font-bold bg-brand-500 hover:bg-brand-600 text-white">
              {step.action.label} →
            </Button>
          </Link>
        )}
        <div className="flex gap-3">
          {!isFirst && (
            <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)} className="flex-1 h-12 rounded-xl font-bold border-2">
              ← Back
            </Button>
          )}
          <Button onClick={() => isLast ? null : setCurrentStep(s => s + 1)} disabled={isLast}
            className={`flex-1 h-12 rounded-xl font-bold ${isLast ? "opacity-50" : "bg-accent-500 hover:bg-accent-600 text-white"}`}>
            {isLast ? "Journey Complete! 🎉" : "Next Step →"}
          </Button>
        </div>
        <button onClick={() => setCurrentStep(0)} className="w-full text-xs text-muted-foreground hover:text-brand-600 transition-colors font-medium py-2">
          ← Back to start
        </button>
      </div>
    </div>
  );
}

