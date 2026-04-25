"use client";

import { useState } from "react";
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

export default function SimulatePage() {
  const [step, setStep] = useState(0); // 0=explainer, 1=id-verify, 2=evm, 3=vvpat, 4=done
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showNotaInfo, setShowNotaInfo] = useState(false);
  const { markSimulated } = useStore();

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const reset = () => { setStep(0); setSelectedCandidate(null); setShowNotaInfo(false); };

  const handleVote = (id: string) => {
    setSelectedCandidate(id);
    setTimeout(() => {
      nextStep();
      setTimeout(() => { nextStep(); markSimulated(); }, 3000);
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-display text-brand-600">Voting Simulator</h1>
        <p className="text-muted-foreground mt-1 text-sm">Experience EVM & VVPAT — build confidence before election day.</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1" role="progressbar" aria-valuenow={step} aria-valuemin={0} aria-valuemax={4}>
        {["Learn", "Verify", "Vote", "VVPAT", "Done"].map((label, i) => (
          <div key={i} className="flex items-center flex-1">
            <div 
              aria-current={step === i ? "step" : undefined}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${step > i ? "bg-green-500 text-white" : step === i ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-muted-foreground"}`}>
              {step > i ? "✓" : i + 1}
            </div>
            {i < 4 && <div className={`flex-1 h-0.5 mx-1 ${step > i ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`} />}
          </div>
        ))}
      </div>

      <div className="flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">

          {/* Step 0: Pre-explainer */}
          {step === 0 && (
            <m.div key="explainer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {PRE_EXPLAINER.map((item, i) => (
                  <m.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-white dark:from-brand-900/20 dark:to-background border border-brand-100 dark:border-brand-800">
                    <span className="text-3xl block mb-2" aria-hidden="true">{item.icon}</span>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </m.div>
                ))}
              </div>
              <Button onClick={nextStep} size="lg" className="w-full h-12 rounded-xl font-bold">
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
                  <div className="flex flex-wrap gap-2 justify-center text-xs">
                    {["Voter ID ✓", "Aadhaar ✓", "PAN ✓", "Passport ✓", "Driving License ✓"].map(d => (
                      <span key={d} className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold border border-green-100">{d}</span>
                    ))}
                  </div>
                  <Button onClick={nextStep} size="lg" className="w-full">Proceed to Voting Compartment →</Button>
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
                  {candidates.map((c) => (
                    <div key={c.id} className="flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded border-2 border-gray-300">
                      <div className="flex items-center space-x-6 w-2/3">
                        <span className="text-3xl bg-gray-100 dark:bg-gray-600 p-2 rounded" aria-hidden="true">{c.symbol}</span>
                        <div>
                          <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{c.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{c.party}</p>
                          {c.id === "4" && (
                            <button 
                              onClick={() => setShowNotaInfo(!showNotaInfo)} 
                              className="text-xs text-blue-600 hover:underline mt-1"
                              aria-expanded={showNotaInfo}
                              aria-controls="nota-info"
                            >
                              {showNotaInfo ? "Hide info ▲" : "What is NOTA? ▼"}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="w-1/3 flex justify-end items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full border border-gray-400 ${selectedCandidate === c.id ? "bg-red-500 shadow-[0_0_10px_red]" : "bg-gray-300"}`} />
                        <Button 
                          className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg border-2 border-blue-800 p-0" 
                          onClick={() => handleVote(c.id)} 
                          disabled={selectedCandidate !== null} 
                          aria-label={`Vote for ${c.name} (${c.party})`}
                        />
                      </div>
                    </div>
                  ))}
                  <AnimatePresence>
                    {showNotaInfo && (
                      <m.div 
                        id="nota-info"
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: "auto" }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 text-sm"
                        role="status"
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
                  <div className="w-3/4 h-3/4 bg-gray-300 dark:bg-gray-900 border-8 border-gray-400 rounded-lg relative overflow-hidden flex justify-center pt-4 shadow-inner" aria-live="polite">
                    <m.div className="bg-white text-black p-4 w-2/3 border border-gray-400 shadow-sm flex flex-col items-center absolute top-2"
                      initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                      {selectedCandidate && (
                        <>
                          <span className="text-2xl mt-2" aria-hidden="true">{candidates.find(c => c.id === selectedCandidate)?.symbol}</span>
                          <span className="font-bold text-lg mt-2 text-center">{candidates.find(c => c.id === selectedCandidate)?.name}</span>
                          <span className="text-xs mt-4">VOTE CONFIRMED</span>
                        </>
                      )}
                    </m.div>
                  </div>
                  <p className="text-xs text-center p-2 font-mono text-gray-500">Slip visible for 7 seconds</p>
                </CardContent>
              </Card>
            </m.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <m.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md w-full">
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                <CardContent className="p-8 flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 text-4xl">✅</div>
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">Vote Cast Successfully!</h2>
                  <p className="text-green-700 dark:text-green-500 mb-3">Simulation complete. In reality, the VVPAT slip drops into a secure sealed box after 7 seconds.</p>
                  <div className="text-left p-4 rounded-xl bg-green-100/50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-sm text-green-900 dark:text-green-100 mb-6 space-y-2 w-full">
                    <p className="font-medium">✓ Your vote is encrypted and stored anonymously in the EVM</p>
                    <p className="font-medium">✓ Results are counted only after all polling booths are sealed</p>
                    <p className="font-medium">✓ No one can trace your vote back to you — secrecy is guaranteed</p>
                    <p className="font-medium">✓ +25 points added to your Readiness Score!</p>
                  </div>
                  <Button onClick={reset} variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 font-bold">
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
