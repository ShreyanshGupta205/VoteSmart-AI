"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

type CorrectionType = "missing-name" | "wrong-details" | "duplicate" | null;

const corrections = {
  "missing-name": {
    icon: "📋",
    title: "My name is missing from the voter list",
    form: "Form 6",
    formDesc: "New Voter Registration",
    timeline: "15–30 days",
    color: "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30",
    border: "border-orange-200 dark:border-orange-800",
    steps: [
      { title: "Confirm eligibility", desc: "You must be 18+, Indian citizen, resident of the constituency you are registering in." },
      { title: "Visit voters.eci.gov.in", desc: "Go to the Voter Services Portal. Click on 'New Registration (Form 6)'." },
      { title: "Fill in your details", desc: "Provide name, DOB, address, and upload photo + age proof + residence proof." },
      { title: "Submit & note Application ID", desc: "After submission, save your Application Reference ID for tracking." },
      { title: "BLO Verification", desc: "A Booth Level Officer may visit your address within 7 days for verification." },
      { title: "Approval & EPIC", desc: "Name added to roll within 30 days. Physical EPIC card delivered within 90 days." },
    ],
    documents: ["Proof of age (Birth certificate / Marksheet / Passport)", "Proof of residence (Aadhaar / Utility Bill / Rent Agreement)", "Passport-size photograph"],
    officialLink: "https://voters.eci.gov.in/",
    officialText: "Apply Form 6 Online →",
  },
  "wrong-details": {
    icon: "✏️",
    title: "Wrong name, DOB, or address in voter list",
    form: "Form 8",
    formDesc: "Correction of Entries in Electoral Roll",
    timeline: "10–20 days",
    color: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
    border: "border-blue-200 dark:border-blue-800",
    steps: [
      { title: "Identify the error", desc: "Check exactly what is incorrect: name spelling, father's name, date of birth, or address." },
      { title: "Fill Form 8", desc: "Go to voters.eci.gov.in → 'Correction of entries in electoral roll (Form 8)'." },
      { title: "Provide correct information", desc: "Enter the CORRECT details as you want them to appear, not the existing wrong ones." },
      { title: "Upload supporting documents", desc: "Upload the document that proves the correct information (e.g., Aadhaar for name/DOB, utility bill for address)." },
      { title: "Submit and track", desc: "Save the Application Reference ID. Track status on the same portal within 10 days." },
    ],
    documents: ["EPIC Number (your current Voter ID)", "Document proving correct information (Aadhaar / PAN / Birth Certificate)", "Passport-size photograph (if photo needs change)"],
    officialLink: "https://voters.eci.gov.in/",
    officialText: "Apply Form 8 Online →",
  },
  "duplicate": {
    icon: "🔄",
    title: "My name appears twice (duplicate entry)",
    form: "Form 7",
    formDesc: "Deletion of Name from Electoral Roll",
    timeline: "7–15 days",
    color: "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30",
    border: "border-purple-200 dark:border-purple-800",
    steps: [
      { title: "Confirm both entries", desc: "First search your name on electoralsearch.eci.gov.in and note both Part Numbers and Serial Numbers." },
      { title: "Decide which entry to keep", desc: "Keep the entry where your current address is correct. The other one (usually old address) needs deletion." },
      { title: "Fill Form 7", desc: "Go to voters.eci.gov.in → 'Objection to inclusion or Deletion of name (Form 7)'. Select 'Deletion'." },
      { title: "Specify the entry to delete", desc: "Provide the Part Number and Serial Number of the INCORRECT entry to be deleted." },
      { title: "Submit and monitor", desc: "The ERO (Electoral Registration Officer) will verify and delete the duplicate within 15 days." },
    ],
    documents: ["EPIC Number", "Both Part Numbers found on electoral search", "Proof of current address"],
    officialLink: "https://voters.eci.gov.in/",
    officialText: "Apply Form 7 Online →",
  },
};

export default function RecoverPage() {
  const [selected, setSelected] = useState<CorrectionType>(null);
  const correction = selected ? corrections[selected] : null;

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest border border-green-100">
          🔄 Correction Guide
        </m.div>
        <h1 className="text-4xl font-black font-display tracking-tight">Fix Your <span className="gradient-text">Voter Record</span></h1>
        <p className="text-muted-foreground mt-3 text-lg font-light max-w-lg mx-auto">Select your correction type to get the exact form and step-by-step process.</p>
      </div>

      {!selected && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {(Object.entries(corrections) as [CorrectionType, typeof corrections["missing-name"]][]).map(([key, val]) => (
            <m.button key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} onClick={() => setSelected(key)}
              className={`text-left p-6 rounded-2xl border-2 bg-gradient-to-br ${val.color} ${val.border} shadow-sm hover:shadow-xl transition-all duration-300`}>
              <span className="text-4xl block mb-3">{val.icon}</span>
              <h3 className="font-bold text-base leading-tight mb-2">{val.title}</h3>
              <div className="flex items-center gap-2 mt-3 text-xs font-bold">
                <span className="bg-white/60 dark:bg-black/20 px-2 py-0.5 rounded-full">{val.form}</span>
                <span className="text-muted-foreground">⏱️ {val.timeline}</span>
              </div>
            </m.button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {selected && correction && (
          <m.div key={selected} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-brand-600 transition-colors group mb-6">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to correction types
            </button>
            <div className={`rounded-3xl border-2 bg-gradient-to-br ${correction.color} ${correction.border} p-6 md:p-10 shadow-xl`}>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl">{correction.icon}</span>
                <div>
                  <h2 className="text-2xl font-black font-display">{correction.title}</h2>
                  <div className="flex gap-3 mt-2 flex-wrap">
                    <span className="text-xs font-bold bg-brand-500 text-white px-3 py-1 rounded-full">{correction.form} — {correction.formDesc}</span>
                    <span className="text-xs font-bold bg-white/70 dark:bg-black/20 px-3 py-1 rounded-full border border-white/40">⏱️ {correction.timeline}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-2">Step-by-Step Process</h3>
                  {correction.steps.map((step, i) => (
                    <m.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                      className="flex gap-4 p-4 rounded-xl bg-white/60 dark:bg-black/20 border border-white/40">
                      <div className="w-8 h-8 rounded-full bg-brand-500 text-white text-sm font-black flex items-center justify-center flex-shrink-0">{i + 1}</div>
                      <div>
                        <p className="font-bold text-sm">{step.title}</p>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
                      </div>
                    </m.div>
                  ))}
                </div>
                <div className="space-y-5">
                  <div className="p-5 rounded-2xl bg-white/60 dark:bg-black/20 border border-white/40">
                    <h4 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-3">📁 Documents Needed</h4>
                    <ul className="space-y-2">
                      {correction.documents.map((doc, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-brand-500 flex-shrink-0 mt-0.5">✓</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href={correction.officialLink} target="_blank" rel="noreferrer">
                    <Button className="w-full h-12 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold">{correction.officialText}</Button>
                  </a>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
