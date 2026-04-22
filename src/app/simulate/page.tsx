"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const candidates = [
  { id: "1", name: "Ravi Kumar", party: "Development Party", symbol: "🌱" },
  { id: "2", name: "Priya Sharma", party: "Progressive Alliance", symbol: "☀️" },
  { id: "3", name: "Amit Patel", party: "National Front", symbol: "🪷" },
  { id: "4", name: "NOTA", party: "None of the Above", symbol: "❌" },
];

export default function SimulatePage() {
  const [step, setStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const reset = () => {
    setStep(1);
    setSelectedCandidate(null);
  };

  const handleVote = (id: string) => {
    setSelectedCandidate(id);
    setTimeout(() => {
      nextStep(); // Move to VVPAT Step
      setTimeout(() => {
        nextStep(); // Move to Confirmation Step after 7 seconds (VVPAT mock)
      }, 3000);
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-display text-brand-600">Mock Voting Simulation</h1>
        <p className="text-muted-foreground mt-1 text-sm">Experience how an EVM and VVPAT machine works.</p>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <motion.div key="intro" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <Card className="text-center p-8 max-w-lg mx-auto border-brand-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Step 1: ID Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">In a real polling booth, the polling officer verifies your identity using your Voter ID or other valid documents.</p>
                  <Button onClick={nextStep} size="lg" className="w-full">Proceed to Voting Compartment</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="evm" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full max-w-2xl">
              <Card className="border-4 border-gray-800 bg-gray-100 dark:bg-gray-800 shadow-2xl">
                <CardHeader className="bg-gray-800 text-white rounded-t-lg">
                  <CardTitle className="text-center font-mono">BALLOT UNIT (MOCK EVM)</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {candidates.map((c) => (
                    <div key={c.id} className="flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded border-2 border-gray-300">
                      <div className="flex items-center space-x-6 w-2/3">
                        <span className="text-3xl bg-gray-100 dark:bg-gray-600 p-2 rounded">{c.symbol}</span>
                        <div>
                          <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{c.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{c.party}</p>
                        </div>
                      </div>
                      <div className="w-1/3 flex justify-end items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full border border-gray-400 ${selectedCandidate === c.id ? "bg-red-500 shadow-[0_0_10px_red]" : "bg-gray-300"}`}></div>
                        <Button
                          className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg border-2 border-blue-800 flex items-center justify-center p-0"
                          onClick={() => handleVote(c.id)}
                          disabled={selectedCandidate !== null}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="vvpat" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="w-full max-w-md">
               <Card className="border-4 border-gray-800 bg-gray-100 dark:bg-gray-800 shadow-2xl overflow-hidden relative h-[400px]">
                <CardHeader className="bg-gray-800 text-white text-center pb-2">
                  <CardTitle className="font-mono text-sm">VVPAT MACHINE</CardTitle>
                </CardHeader>
                <CardContent className="h-full flex items-center justify-center flex-col p-0">
                  <div className="w-3/4 h-3/4 bg-gray-300 dark:bg-gray-900 border-8 border-gray-400 rounded-lg relative overflow-hidden flex justify-center pt-4 shadow-inner">
                    <motion.div 
                      className="bg-white text-black p-4 w-2/3 border border-gray-400 shadow-sm shadow-gray-500 flex flex-col items-center absolute top-2"
                      initial={{ y: -200, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {selectedCandidate && (
                        <>
                          <span className="text-2xl mt-2">{candidates.find(c => c.id === selectedCandidate)?.symbol}</span>
                          <span className="font-bold text-lg mt-2 text-center">{candidates.find(c => c.id === selectedCandidate)?.name}</span>
                          <span className="text-xs mt-4">VOTE CONFIRMED</span>
                        </>
                      )}
                    </motion.div>
                  </div>
                  <p className="text-xs text-center p-2 font-mono text-gray-500">Slip visible for 7 seconds</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md w-full">
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                <CardContent className="p-8 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">Vote Cast Successfully!</h2>
                  <p className="text-green-700 dark:text-green-500 mb-8">This is the end of the simulation. In reality, the VVPAT slip falls into a secure box.</p>
                  <Button onClick={reset} variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
        </AnimatePresence>
      </div>
    </div>
  );
}
