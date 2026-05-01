"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";

type DocEntry = {
  name: string;
  valid: boolean;
  note: string;
  alternatives?: string[];
};

const documents: DocEntry[] = [
  { name: "EPIC (Voter ID Card / e-EPIC)", valid: true, note: "Primary document. Physical card or digital e-EPIC on phone both accepted at polling booth.", alternatives: [] },
  { name: "Aadhaar Card", valid: true, note: "Accepted as alternate ID if your name is on the electoral roll. Physical or m-Aadhaar on phone accepted.", alternatives: ["EPIC", "Driving License"] },
  { name: "PAN Card", valid: true, note: "Accepted as alternate ID at polling booth. Must be original (not photocopy).", alternatives: ["Aadhaar", "EPIC"] },
  { name: "Passport", valid: true, note: "Accepted. Both Indian and valid foreign passports held by Indian citizens are accepted.", alternatives: ["Aadhaar", "Driving License"] },
  { name: "Driving License", valid: true, note: "Accepted. Expired driving license is NOT accepted — must be currently valid.", alternatives: ["Aadhaar", "PAN Card"] },
  { name: "MNREGA Job Card", valid: true, note: "Mahatma Gandhi NREGA Job Card with photo is accepted. Must have the beneficiary's photo.", alternatives: ["Aadhaar"] },
  { name: "Bank / Post Office Passbook with Photo", valid: true, note: "Passbook with photograph is accepted. Passbooks without photo are NOT valid.", alternatives: ["Aadhaar", "PAN Card"] },
  { name: "NPR Smart Card", valid: true, note: "Smart card issued under National Population Register by the Office of the Registrar General of India.", alternatives: ["Aadhaar"] },
  { name: "Health Insurance Smart Card", valid: true, note: "Smart card issued under the Ministry of Labour scheme (ESIC / RSBY) with photo.", alternatives: ["Aadhaar"] },
  { name: "Pension Document with Photo", valid: true, note: "Any pension document with photograph issued by Central or State Government.", alternatives: ["Aadhaar", "Driving License"] },
  { name: "Government Employee Photo ID", valid: true, note: "Official photo ID issued by Central / State Government or Public Sector Undertaking.", alternatives: ["Aadhaar", "EPIC"] },
  { name: "Photocopy of any document", valid: false, note: "Photocopies — even attested — are NOT accepted. Original documents only.", alternatives: ["Bring the original Aadhaar", "Download e-EPIC on your phone"] },
  { name: "Screenshot of Aadhaar / e-EPIC", valid: false, note: "Screenshots are NOT accepted. You must show the original m-Aadhaar app or download e-EPIC from the official portal.", alternatives: ["Download m-Aadhaar app", "Download e-EPIC from voters.eci.gov.in"] },
  { name: "Expired ID (any type)", valid: false, note: "Expired documents are NOT accepted. Only valid, unexpired documents are allowed.", alternatives: ["Renew your Driving License", "Use Aadhaar instead (no expiry)"] },
  { name: "College / School ID Card", valid: false, note: "Educational institution ID cards are NOT on the ECI approved list.", alternatives: ["Aadhaar", "PAN Card"] },
  { name: "Ration Card", valid: false, note: "Ration cards are NOT on the current ECI approved alternate ID list (as of 2024).", alternatives: ["Aadhaar", "MNREGA Job Card"] },
];

export default function DocumentsPage() {
  const [selected, setSelected] = useState<string>("");
  const doc = documents.find((d) => d.name === selected);

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest border border-emerald-100">
          🧾 Document Checker
        </m.div>
        <h1 className="text-4xl font-black font-display tracking-tight">Smart <span className="gradient-text">Document Helper</span></h1>
        <p className="text-muted-foreground mt-3 text-lg font-light max-w-lg mx-auto">Select a document type to instantly see if it&apos;s valid at the polling booth. No upload required.</p>
      </div>

      {/* Dropdown */}
      <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-xl rounded-2xl mb-6">
        <CardContent className="p-6">
          <label className="block text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Select Document Type</label>
          <select value={selected} onChange={(e) => setSelected(e.target.value)}
            className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground font-medium focus:outline-none focus:border-brand-400 transition-colors text-sm">
            <option value="">-- Choose a document --</option>
            <optgroup label="✅ Valid Documents">
              {documents.filter(d => d.valid).map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
            </optgroup>
            <optgroup label="❌ Not Valid">
              {documents.filter(d => !d.valid).map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
            </optgroup>
          </select>
        </CardContent>
      </Card>

      {/* Result */}
      <AnimatePresence mode="wait">
        {doc && (
          <m.div key={selected} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className={`rounded-3xl border-2 p-8 shadow-xl ${doc.valid
              ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800"
              : "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-red-200 dark:border-red-800"}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${doc.valid ? "bg-green-500" : "bg-red-500"}`}>
                  {doc.valid ? "✅" : "❌"}
                </div>
                <div>
                  <h2 className="text-2xl font-black font-display">{doc.name}</h2>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full mt-1 inline-block ${doc.valid ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {doc.valid ? "✓ Valid at Polling Booth" : "✗ Not Accepted"}
                  </span>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white/60 dark:bg-black/20 border border-white/40 mb-5">
                <p className="text-sm leading-relaxed text-foreground">{doc.note}</p>
              </div>
              {doc.alternatives && doc.alternatives.length > 0 && (
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    {doc.valid ? "🔄 Alternatives you can also use" : "👆 Use these instead"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {doc.alternatives.map((alt) => (
                      <button key={alt} onClick={() => setSelected(alt)} className="px-4 py-2 rounded-xl bg-white/70 dark:bg-black/30 border border-white/50 text-sm font-semibold hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-all duration-200">
                        {alt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Quick reference grid */}
      {!selected && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="p-5 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900">
            <h3 className="font-bold text-green-800 dark:text-green-400 mb-3">✅ Valid Documents (11 types)</h3>
            <ul className="text-sm text-green-700 dark:text-green-500 space-y-1">
              {documents.filter(d => d.valid).map(d => <li key={d.name} className="flex items-center gap-2"><span>•</span>{d.name}</li>)}
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900">
            <h3 className="font-bold text-red-800 dark:text-red-400 mb-3">❌ Not Accepted</h3>
            <ul className="text-sm text-red-700 dark:text-red-500 space-y-1">
              {documents.filter(d => !d.valid).map(d => <li key={d.name} className="flex items-center gap-2"><span>•</span>{d.name}</li>)}
            </ul>
            <p className="text-xs text-red-600/70 dark:text-red-500/70 mt-3 font-medium">⚠️ Original documents only. No photocopies. No expired IDs.</p>
          </div>
        </m.div>
      )}
    </div>
  );
}

