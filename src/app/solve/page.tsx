"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { problems } from "@/data/problems";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";

export default function SolvePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const { problemsSolved, markProblemSolved } = useStore();

  // Auto-select problem from URL query (e.g., ?problem=name-missing)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("problem");
      if (id) setSelectedId(id);
    }
  }, []);

  const selectedProblem = problems.find((p) => p.id === selectedId);
  const isSolved = selectedId ? problemsSolved.includes(selectedId) : false;

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-brand-50 text-brand-600 text-xs font-black uppercase tracking-widest border border-brand-100"
        >
          🛠️ Real-World Help
        </m.div>
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black font-display tracking-tight text-foreground"
        >
          What&apos;s your <span className="gradient-text">issue?</span>
        </m.h1>
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mt-3 text-lg font-light max-w-xl mx-auto"
        >
          Select your problem and get a step-by-step solution — no jargon, no confusion.
        </m.p>
      </div>

      {/* Problem Cards Grid */}
      {!selectedId && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {problems.map((problem, i) => {
            const solved = problemsSolved.includes(problem.id);
            return (
              <m.button
                key={problem.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedId(problem.id)}
                aria-label={`View solution for: ${problem.title}`}
                className={`relative text-left p-6 rounded-2xl border-2 bg-gradient-to-br ${problem.color} ${problem.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group`}
              >
                {solved && (
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                    ✓ Resolved
                  </span>
                )}
                <span className="text-4xl mb-4 block">{problem.icon}</span>
                <h3 className="font-bold text-lg text-foreground leading-tight mb-2 group-hover:text-brand-600 transition-colors">
                  {problem.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {problem.shortDesc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <span>⏱️ {problem.timeline}</span>
                </div>
              </m.button>
            );
          })}
        </m.div>
      )}

      {/* Problem Detail View */}
      <AnimatePresence mode="wait">
        {selectedId && selectedProblem && (
          <m.div
            key={selectedId}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back button */}
            <button
              onClick={() => { setSelectedId(null); setExpandedStep(null); }}
              className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-brand-600 transition-colors mb-8 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to all issues
            </button>

            <div className={`rounded-3xl border-2 bg-gradient-to-br ${selectedProblem.color} ${selectedProblem.borderColor} p-6 md:p-10 shadow-xl`}>
              {/* Problem header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                <span className="text-6xl">{selectedProblem.icon}</span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-foreground">
                    {selectedProblem.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-white/70 dark:bg-black/20 px-3 py-1 rounded-full border border-white/40">
                      ⏱️ Estimated: {selectedProblem.timeline}
                    </span>
                    {isSolved && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold bg-green-500 text-white px-3 py-1 rounded-full">
                        ✓ Marked as Resolved
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Steps */}
                <div className="lg:col-span-2 space-y-3">
                  <h3 className="font-black text-base uppercase tracking-widest text-muted-foreground mb-4">
                    Step-by-Step Solution
                  </h3>
                  {selectedProblem.steps.map((step, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <button
                        onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                        aria-expanded={expandedStep === i}
                        aria-controls={`step-content-${i}`}
                        className="w-full text-left p-4 rounded-xl bg-white/60 dark:bg-black/20 border border-white/40 hover:bg-white/80 dark:hover:bg-black/30 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-brand-500 text-white text-sm font-black flex items-center justify-center flex-shrink-0 shadow-md">
                            {i + 1}
                          </span>
                          <span className="font-semibold text-foreground flex-grow">{step.title}</span>
                          <span className="text-muted-foreground transition-transform duration-200" style={{ transform: expandedStep === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                        </div>
                        <AnimatePresence>
                          {expandedStep === i && (
                            <m.p
                              id={`step-content-${i}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-sm text-muted-foreground leading-relaxed mt-3 ml-11 overflow-hidden"
                            >
                              {step.description}
                            </m.p>
                          )}
                        </AnimatePresence>
                      </button>
                    </m.div>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                  {/* Documents needed */}
                  {selectedProblem.documents.length > 0 && (
                    <div className="p-5 rounded-2xl bg-white/60 dark:bg-black/20 border border-white/40">
                      <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-3">
                        📁 Documents Needed
                      </h4>
                      <ul className="space-y-2">
                        {selectedProblem.documents.map((doc, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-brand-500 mt-0.5 flex-shrink-0">✓</span>
                            <span className="text-foreground">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Official Link */}
                  <a
                    href={selectedProblem.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <Button className="w-full h-12 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-lg shadow-brand-500/20">
                      {selectedProblem.officialLinkText}
                    </Button>
                  </a>

                  {/* Internal Link */}
                  {selectedProblem.internalLink && (
                    <Link href={selectedProblem.internalLink}>
                      <Button
                        variant="outline"
                        className="w-full h-12 rounded-xl font-semibold border-2 hover:bg-white/80"
                      >
                        {selectedProblem.internalLinkText}
                      </Button>
                    </Link>
                  )}

                  {/* Mark Resolved */}
                  <button
                    onClick={() => markProblemSolved(selectedProblem.id)}
                    disabled={isSolved}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all duration-300 ${
                      isSolved
                        ? "bg-green-50 border-green-200 text-green-700 cursor-default"
                        : "bg-white/60 border-dashed border-gray-300 text-muted-foreground hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                    }`}
                  >
                    {isSolved ? "✓ Issue Resolved (+5 pts earned)" : "✅ Mark as Resolved (+5 pts)"}
                  </button>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
