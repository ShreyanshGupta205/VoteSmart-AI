"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { states } from "@/data/states";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

type Step = "select-state" | "guide";

export default function StatusPage() {
  const [step, setStep] = useState<Step>("select-state");
  const [selectedState, setSelectedState] = useState("");
  const stateInfo = states.find((s) => s.code === selectedState);

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest border border-blue-100">
          📊 Voter Status Checker
        </m.div>
        <h1 className="text-4xl font-black font-display tracking-tight">Check Your <span className="gradient-text">Registration Status</span></h1>
        <p className="text-muted-foreground mt-3 text-lg font-light max-w-lg mx-auto">We&apos;ll guide you exactly how to check your status on the official portal — no data stored here.</p>
      </div>

      <AnimatePresence mode="wait">
        {step === "select-state" && (
          <m.div key="select" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <Card className="border-2 border-blue-100 dark:border-blue-900 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold mb-2">Which state are you registered in?</h2>
                <p className="text-sm text-muted-foreground mb-6">Your electoral roll is maintained by your state&apos;s Chief Electoral Officer. Select it to get exact steps.</p>
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground font-medium focus:outline-none focus:border-brand-400 transition-colors text-sm">
                  <option value="">-- Select your state / UT --</option>
                  {states.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
                </select>
                <Button onClick={() => setStep("guide")} disabled={!selectedState} className="w-full mt-6 h-12 rounded-xl font-bold">Show Me How to Check →</Button>
              </CardContent>
            </Card>
          </m.div>
        )}

        {step === "guide" && stateInfo && (
          <m.div key="guide" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
            <button onClick={() => setStep("select-state")} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-brand-600 transition-colors group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Change state
            </button>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100">
              <span className="text-2xl">🗺️</span>
              <div>
                <p className="font-bold text-sm">Checking for: <span className="text-brand-600">{stateInfo.name}</span></p>
                <p className="text-xs text-muted-foreground">State CEO portal linked below</p>
              </div>
            </div>
            <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-xl font-bold">How to check your electoral roll status</h2>
                {[
                  { n: 1, icon: "🌐", title: "Go to National Voter Search Portal", desc: "Visit electoralsearch.eci.gov.in — works for all states including " + stateInfo.name + ".", link: { href: "https://electoralsearch.eci.gov.in/", label: "Open Electoral Search →" } },
                  { n: 2, icon: "✍️", title: "Search by Details (not EPIC number)", desc: 'Click "Search by Details". Enter name, date of birth, and state. You do NOT need your Voter ID number.' },
                  { n: 3, icon: "📋", title: "Check your results", desc: "If found: note your Part Number, Serial Number, and Booth details. If NOT found: your name may be missing — see below." },
                  { n: 4, icon: "🏛️", title: `Check ${stateInfo.name} CEO Portal (optional)`, desc: `The state CEO portal provides constituency-specific details for ${stateInfo.name}.`, link: { href: stateInfo.ceo, label: `Open ${stateInfo.name} CEO Portal →` } },
                ].map((item) => (
                  <div key={item.n} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-500 text-white font-black flex items-center justify-center flex-shrink-0 shadow-md">{item.n}</div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-base">{item.icon} {item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                      {item.link && <a href={item.link.href} target="_blank" rel="noreferrer" className="inline-block text-sm font-bold text-brand-600 hover:underline mt-2">{item.link.label}</a>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900">
              <h3 className="font-bold text-red-800 dark:text-red-400 mb-2">🚨 Name not found?</h3>
              <p className="text-sm text-red-700 dark:text-red-500 mb-4">Don&apos;t panic. Your name may be missing due to registration issue or spelling mismatch.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/solve?problem=name-missing"><Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl h-11">Fix Missing Name →</Button></Link>
                <Link href="/recover"><Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 rounded-xl h-11 font-bold">Correction Guide</Button></Link>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
