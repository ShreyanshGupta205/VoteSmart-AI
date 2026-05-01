"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { m, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";

const candidates = [
  { id: "1", name: "Ravi Kumar", party: "Development Party", symbol: "🌱" },
  { id: "2", name: "Priya Sharma", party: "Progressive Alliance", symbol: "☀️" },
  { id: "3", name: "Amit Patel", party: "National Front", symbol: "🪷" },
  { id: "4", name: "NOTA", party: "None of the Above", symbol: "❌" },
];

const PRE_EXPLAINER = [
  { icon: "🗳️", title: "How EVM works", desc: "Press one button next to your chosen candidate. A beep confirms your vote. You cannot vote again." },
  { icon: "📄", title: "What is NOTA?", desc: "None Of The Above — choose NOTA if you disapprove of all candidates. Your vote still counts as a registered vote." },
  { icon: "👁️", title: "VVPAT — Vote Verification", desc: "After pressing the button, a paper slip appears in a window for 7 seconds showing your candidate's name and symbol. This confirms your vote." },
  { icon: "🔒", title: "Secrecy guaranteed", desc: "No one can see which button you pressed. The polling compartment is private. Your vote is fully secret by law." },
];

const STEP_LABELS = ["Learn", "Verify", "Vote", "VVPAT", "Done"];

export default function SimulatePage() {
  const [step, setStep] = useState(0); // 0=explainer, 1=id-verify, 2=evm, 3=vvpat, 4=done
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showNotaInfo, setShowNotaInfo] = useState(false);
  const { markSimulated } = useStore();

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const reset = () => { setStep(0); setSelectedCandidate(null); setShowNotaInfo(false); };

  const handleVote = useCallback((id: string) => {
    if (selectedCandidate !== null) return; // Prevent double-vote
    setSelectedCandidate(id);
    setTimeout(() => {
      nextStep();
      setTimeout(() => { nextStep(); markSimulated(); }, 3000);
    }, 500);
  }, [selectedCandidate, markSimulated]);

  // Generic keyboard handler — activates on Enter or Space
  const handleKeyActivate = useCallback(
    (id: string) => (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleVote(id);
      }
    },
    [handleVote]
  );

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-display text-brand-600">Voting Simulator</h1>
        <p className="text-muted-foreground mt-1 text-sm">Experience EVM &amp; VVPAT — build confidence before election day.</p>
      </div>

      {/* Progress stepper */}
      <nav aria-label="Simulation steps">
        <ol
          className="flex items-center gap-1"
          role="list"
          aria-label="Progress"
        >
          {STEP_LABELS.map((label, i) => (
            <li key={i} className="flex items-center flex-1">
              <div
                role="status"
                aria-current={step === i ? "step" : undefined}
                aria-label={`Step ${i + 1}: ${label} — ${step > i ? "completed" : step === i ? "current" : "upcoming"}`}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  step > i
                    ? "bg-green-500 text-white"
                    : step === i
                    ? "bg-brand-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-muted-foreground"
                }`}
              >
                {step > i ? "✓" : i + 1}
              </div>
              {i < 4 && (
                <div
                  className={`flex-1 h-0.5 mx-1 ${step > i ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">

          {/* Step 0: Pre-explainer */}
          {step === 0 && (
            <m.div key="explainer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6" role="list" aria-label="How voting works">
                {PRE_EXPLAINER.map((item, i) => (
                  <m.div
                    key={i}
                    role="listitem"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-white dark:from-brand-900/20 dark:to-background border border-brand-100 dark:border-brand-800"
                  >
                    <span className="text-3xl block mb-2" aria-hidden="true">{item.icon}</span>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </m.div>
                ))}
              </div>
              <Button
                onClick={nextStep}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); nextStep(); } }}
                size="lg"
                className="w-full h-12 rounded-xl font-bold"
                aria-label="I understand — start the voting simulation"
              >
                I understand — Start Simulation →
              </Button>
            </m.div>
          )}

          {/* Step 1: ID Verification */}
          {step === 1 && (
            <m.div key="intro" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <Card className="text-center p-8 max-w-lg mx-auto border-brand-200">
                <CardHeader><CardTitle className="text-2xl">Step 1: ID Verification</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">The polling officer verifies your identity using your Voter ID or alternate document. Your finger is inked to prevent double voting.</p>
                  <div className="flex flex-wrap gap-2 justify-center text-xs" role="list" aria-label="Accepted ID documents">
                    {["Voter ID ✓", "Aadhaar ✓", "PAN ✓", "Passport ✓", "Driving License ✓"].map(d => (
                      <span key={d} role="listitem" className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold border border-green-100">{d}</span>
                    ))}
                  </div>
                  <Button
                    onClick={nextStep}
                    size="lg"
                    className="w-full"
                    aria-label="Proceed to the voting compartment"
                  >
                    Proceed to Voting Compartment →
                  </Button>
                </CardContent>
              </Card>
            </m.div>
          )}

          {/* Step 2: EVM */}
          {step === 2 && (
            <m.div key="evm" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full max-w-2xl">
              <Card className="border-4 border-gray-800 bg-gray-100 dark:bg-gray-800 shadow-2xl">
                <CardHeader className="bg-gray-800 text-white rounded-t-lg">
                  <CardTitle className="text-center font-mono">BALLOT UNIT (MOCK EVM)</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {/* Keyboard instruction callout */}
                  <p className="text-xs text-center text-muted-foreground" aria-live="polite">
                    Use <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">Tab</kbd> to navigate,{" "}
                    <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">Enter</kbd> or{" "}
                    <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">Space</kbd> to vote.
                  </p>

                  <div role="group" aria-label="Ballot — select a candidate to cast your vote">
                    {candidates.map((c) => (
                      <div key={c.id} className="flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded border-2 border-gray-300 mb-3">
                        <div className="flex items-center space-x-6 w-2/3">
                          <span className="text-3xl bg-gray-100 dark:bg-gray-600 p-2 rounded" aria-hidden="true">{c.symbol}</span>
                          <div>
                            <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{c.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{c.party}</p>
                            {c.id === "4" && (
                              <button
                                onClick={() => setShowNotaInfo(!showNotaInfo)}
                                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setShowNotaInfo(!showNotaInfo); } }}
                                className="text-xs text-blue-600 hover:underline mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                aria-expanded={showNotaInfo}
                                aria-controls="nota-info"
                              >
                                {showNotaInfo ? "Hide info ▲" : "What is NOTA? ▼"}
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="w-1/3 flex justify-end items-center space-x-4">
                          {/* LED indicator */}
                          <div
                            role="status"
                            aria-label={selectedCandidate === c.id ? `${c.name} selected — LED lit` : "LED off"}
                            className={`w-4 h-4 rounded-full border border-gray-400 ${selectedCandidate === c.id ? "bg-red-500 shadow-[0_0_10px_red]" : "bg-gray-300"}`}
                          />
                          {/* Voting button */}
                          <Button
                            className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg border-2 border-blue-800 p-0"
                            onClick={() => handleVote(c.id)}
                            onKeyDown={handleKeyActivate(c.id)}
                            disabled={selectedCandidate !== null}
                            aria-label={`Vote for ${c.name}, ${c.party}${selectedCandidate !== null ? " (voting disabled — already voted)" : ""}`}
                            aria-pressed={selectedCandidate === c.id}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence>
                    {showNotaInfo && (
                      <m.div
                        id="nota-info"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 text-sm"
                        role="region"
                        aria-label="NOTA information"
                      >
                        <p className="font-bold text-blue-800 dark:text-blue-400 mb-1">About NOTA</p>
                        <p className="text-blue-700 dark:text-blue-500">NOTA (None Of The Above) lets you reject all candidates. Your vote is recorded as a valid vote against all, but it does not transfer to any candidate. It signals dissatisfaction to parties.</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </m.div>
          )}

          {/* Step 3: VVPAT */}
          {step === 3 && (
            <m.div key="vvpat" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="w-full max-w-md">
              <Card className="border-4 border-gray-800 bg-gray-100 dark:bg-gray-800 shadow-2xl overflow-hidden relative h-[400px]">
                <CardHeader className="bg-gray-800 text-white text-center pb-2">
                  <CardTitle className="font-mono text-sm">VVPAT MACHINE</CardTitle>
                </CardHeader>
                <CardContent className="h-full flex items-center justify-center flex-col p-0">
                  <div
                    className="w-3/4 h-3/4 bg-gray-300 dark:bg-gray-900 border-8 border-gray-400 rounded-lg relative overflow-hidden flex justify-center pt-4 shadow-inner"
                    aria-live="polite"
                    aria-label="VVPAT paper slip display"
                  >
                    <m.div
                      className="bg-white text-black p-4 w-2/3 border border-gray-400 shadow-sm flex flex-col items-center absolute top-2"
                      initial={{ y: -200, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      role="status"
                      aria-label={
                        selectedCandidate
                          ? `VVPAT confirms vote for ${candidates.find(c => c.id === selectedCandidate)?.name}`
                          : "Waiting for vote"
                      }
                    >
                      {selectedCandidate && (
                        <>
                          <span className="text-2xl mt-2" aria-hidden="true">{candidates.find(c => c.id === selectedCandidate)?.symbol}</span>
                          <span className="font-bold text-lg mt-2 text-center">{candidates.find(c => c.id === selectedCandidate)?.name}</span>
                          <span className="text-xs mt-4">VOTE CONFIRMED</span>
                        </>
                      )}
                    </m.div>
                  </div>
                  <p className="text-xs text-center p-2 font-mono text-gray-500" aria-live="polite">Slip visible for 7 seconds</p>
                </CardContent>
              </Card>
            </m.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <m.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md w-full">
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                <CardContent className="p-8 flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 text-4xl" aria-hidden="true">✅</div>
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">Vote Cast Successfully!</h2>
                  <p className="text-green-700 dark:text-green-500 mb-3">Simulation complete. In reality, the VVPAT slip drops into a secure sealed box after 7 seconds.</p>
                  <div className="text-left p-4 rounded-xl bg-green-100/50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-sm text-green-900 dark:text-green-100 mb-6 space-y-2 w-full" role="list" aria-label="Voting process facts">
                    <p className="font-medium" role="listitem">✓ Your vote is encrypted and stored anonymously in the EVM</p>
                    <p className="font-medium" role="listitem">✓ Results are counted only after all polling booths are sealed</p>
                    <p className="font-medium" role="listitem">✓ No one can trace your vote back to you — secrecy is guaranteed</p>
                    <p className="font-medium" role="listitem">✓ +25 points added to your Readiness Score!</p>
                  </div>
                  <Button
                    onClick={reset}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reset(); } }}
                    variant="outline"
                    className="border-green-300 text-green-700 hover:bg-green-100 font-bold"
                    aria-label="Try the simulation again"
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </m.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
