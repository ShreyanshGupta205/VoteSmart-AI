"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const checklistItems = [
  { id: 1, text: "Check name on Electoral Roll (Voter List)", link: "https://electoralsearch.eci.gov.in/" },
  { id: 2, text: "Locate your Polling Booth", link: "https://electoralsearch.eci.gov.in/" },
  { id: 3, text: "Keep Voter ID (EPIC) or approved alternate ID ready", link: "https://eci.gov.in" },
  { id: 4, text: "Know your candidates", link: "https://affidavit.eci.gov.in/" },
  { id: 5, text: "Understand EVM & VVPAT usage", link: "/simulate" },
];

export default function ChecklistPage() {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("checklist-progress");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCompleted(JSON.parse(saved));
      } catch {
        // Ignore parsing errors
      }
    }
  }, []);

  const toggleItem = (id: number) => {
    setCompleted(prev => {
      const newSt = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem("checklist-progress", JSON.stringify(newSt));
      return newSt;
    });
  };

  const exportPDF = async () => {
    const element = document.getElementById("export-area");
    if (!element) return;
    
    // Add temporary styling for PDF export
    element.classList.add("bg-white", "p-8");
    const canvas = await html2canvas(element, { scale: 2 });
    element.classList.remove("bg-white", "p-8");

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("My_Election_Readiness_Kit.pdf");
  };

  const progress = Math.round((completed.length / checklistItems.length) * 100);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6 min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-display text-brand-600">Smart Voting Checklist</h1>
        <p className="text-muted-foreground mt-1">Ensure you have everything ready for Election Day.</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-grow bg-gray-200 dark:bg-gray-800 rounded-full h-4 overflow-hidden">
          <motion.div 
            className="bg-brand-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{progress}% Ready</span>
      </div>

      <Card id="export-area" className="border-brand-200 shadow-md bg-white dark:bg-card">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle>My Readiness Kit</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {checklistItems.map((item) => (
              <li key={item.id} className="p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <button 
                  onClick={() => toggleItem(item.id)}
                  className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${completed.includes(item.id) 
                      ? 'bg-brand-500 border-brand-500 text-white' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-brand-400'
                    }`}
                >
                  {completed.includes(item.id) && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                </button>
                <div className="flex-grow">
                  <p className={`font-medium ${completed.includes(item.id) ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
                    {item.text}
                  </p>
                  <a href={item.link} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline inline-flex items-center mt-1">
                    Verify here <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8">
        <Button onClick={exportPDF} size="lg" className="gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          Export as PDF Kit
        </Button>
      </div>
    </div>
  );
}
