"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { m, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useStore } from "@/lib/store";
import { states } from "@/data/states";
import Link from "next/link";

type ChecklistItem = {
  id: string;
  text: string;
  link: string;
  stateSpecific?: boolean;
};

const baseItems: ChecklistItem[] = [
  { id: "roll", text: "Check name on Electoral Roll (Voter List)", link: "https://electoralsearch.eci.gov.in/" },
  { id: "booth", text: "Locate your Polling Booth", link: "https://electoralsearch.eci.gov.in/" },
  { id: "id", text: "Keep Voter ID (EPIC) or approved alternate ID ready", link: "/documents" },
  { id: "candidates", text: "Know your candidates", link: "https://affidavit.eci.gov.in/" },
  { id: "evm", text: "Understand EVM & VVPAT usage", link: "/simulate" },
];

// Mock election deadline 30 days from now
const ELECTION_DATE = new Date();
ELECTION_DATE.setDate(ELECTION_DATE.getDate() + 30);

function getDaysLeft() {
  const diff = ELECTION_DATE.getTime() - new Date().getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function ChecklistPage() {
  const { selectedState, setSelectedState, remindersSet, toggleReminder, updateChecklist } = useStore();
  const [completed, setCompleted] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("checklist-progress-v2");
      try { return saved ? JSON.parse(saved) : []; } catch { return []; }
    }
    return [];
  });
  const [daysLeft] = useState(getDaysLeft());

  const stateInfo = states.find((s) => s.code === selectedState);

  // Persistence is handled in toggleItem via localStorage.setItem

  const toggleItem = (id: string) => {
    setCompleted((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      localStorage.setItem("checklist-progress-v2", JSON.stringify(next));
      // Update store score based on completed count (max 5)
      updateChecklist(Math.min(5, next.length));
      return next;
    });
  };

  const exportPDF = async () => {
    const element = document.getElementById("export-area");
    if (!element) return;
    element.classList.add("bg-white", "p-8");
    const canvas = await html2canvas(element, { scale: 2 });
    element.classList.remove("bg-white", "p-8");
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("VoteSmart_Checklist.pdf");
  };

  const progress = Math.round((completed.length / baseItems.length) * 100);
  const urgency = daysLeft <= 7 ? "text-red-600" : daysLeft <= 14 ? "text-orange-500" : "text-brand-600";

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6 min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold font-display text-brand-600">Smart Voting Checklist</h1>
        <p className="text-muted-foreground mt-1">Your personalized election-day readiness kit.</p>
      </div>

      {/* Election Countdown */}
      <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 border border-brand-100 dark:border-brand-800">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Next Election Deadline</p>
          <p className="font-bold text-foreground mt-0.5">{ELECTION_DATE.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <div className="text-right">
          <p className={`text-3xl font-black font-display ${urgency}`}>{daysLeft}</p>
          <p className="text-xs font-bold text-muted-foreground">days left</p>
        </div>
      </m.div>

      {/* State selector */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-bold text-muted-foreground whitespace-nowrap">📍 Your State:</label>
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}
          className="flex-1 p-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground text-sm font-medium focus:outline-none focus:border-brand-400 transition-colors">
          <option value="">-- Select state for personalized items --</option>
          {states.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
        </select>
      </div>

      {stateInfo && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 text-sm">
          <span className="font-bold text-blue-700 dark:text-blue-400">🗺️ {stateInfo.name}</span>
          <span className="text-blue-600 dark:text-blue-500 ml-2">— CEO portal: <a href={stateInfo.ceo} target="_blank" rel="noreferrer" className="underline">{stateInfo.ceo.replace("https://", "")}</a></span>
        </m.div>
      )}

      {/* Progress bar */}
      <div className="flex items-center gap-4">
        <div className="flex-grow bg-gray-200 dark:bg-gray-800 rounded-full h-4 overflow-hidden">
          <m.div className="bg-brand-500 h-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
        <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{progress}% Ready</span>
      </div>

      {/* Checklist Card */}
      <Card id="export-area" className="border-brand-200 shadow-md bg-white dark:bg-card">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle>My Readiness Kit {stateInfo ? `— ${stateInfo.name}` : ""}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {baseItems.map((item) => {
              const isDone = completed.includes(item.id);
              const hasReminder = remindersSet.includes(item.id);
              return (
                <li key={item.id} className="p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <button onClick={() => toggleItem(item.id)}
                    className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isDone ? "bg-brand-500 border-brand-500 text-white" : "border-gray-300 dark:border-gray-600 hover:border-brand-400"}`}>
                    {isDone && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
                  </button>
                  <div className="flex-grow">
                    <p className={`font-medium ${isDone ? "line-through opacity-50" : "text-foreground"}`}>{item.text}</p>
                    <a href={item.link} target={item.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center mt-1">
                      Verify here <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
                  {/* Reminder toggle */}
                  <button onClick={() => toggleReminder(item.id)} title={hasReminder ? "Reminder set" : "Set reminder"}
                    className={`text-lg transition-all ${hasReminder ? "opacity-100" : "opacity-30 hover:opacity-70"}`}>
                    {hasReminder ? "🔔" : "🔕"}
                  </button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      {/* Reminders summary */}
      <AnimatePresence>
        {remindersSet.length > 0 && (
          <m.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 text-sm">
            <p className="font-bold text-yellow-800 dark:text-yellow-400 mb-1">🔔 Reminders set for {remindersSet.length} item{remindersSet.length > 1 ? "s" : ""}</p>
            <p className="text-yellow-700 dark:text-yellow-500">These items are flagged — complete them before Election Day!</p>
          </m.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={exportPDF} size="lg" className="flex-1 gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          Export as PDF Kit
        </Button>
        <Link href="/polling" className="flex-1">
          <Button variant="outline" size="lg" className="w-full border-2 font-bold">📍 Find My Polling Booth</Button>
        </Link>
      </div>
    </div>
  );
}

