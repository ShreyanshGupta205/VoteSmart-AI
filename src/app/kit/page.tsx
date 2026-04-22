"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

export default function PersonalElectionKit() {
  const kitRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!kitRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(kitRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("VoteSmart_Election_Kit.pdf");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-display text-brand-700">Personal Election Kit</h1>
        <p className="text-muted-foreground mt-2">Download your customized readiness kit and take it with you on voting day.</p>
        <Button onClick={generatePDF} disabled={isGenerating} className="mt-4 shadow-md">
          {isGenerating ? "Generating PDF..." : "Download as PDF"}
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-brand-200 overflow-hidden shadow-lg">
          {/* This is the area that gets captured */}
          <div ref={kitRef} className="bg-white dark:bg-background p-8 min-h-[600px]">
            
            <div className="border-b-2 border-brand-500 pb-4 mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-brand-700">My VoteSmart Kit</h2>
                <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <span className="text-sm uppercase tracking-wider font-semibold text-brand-600">Readiness Score</span>
                <p className="text-3xl font-display font-bold text-brand-700">100/100</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg border-l-4 border-brand-500 pl-2 mb-4">Must-Carry Documents</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✔</span> Voter ID Card (EPIC)
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✔</span> Voter Information Slip
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">◻</span> Backup ID (Aadhaar/PAN if needed)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg border-l-4 border-accent-500 pl-2 mb-4">Voting Day Reminders</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span> Verify your name on the electoral roll.
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span> Voting time is usually 7:00 AM to 6:00 PM.
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span> Mobile phones are NOT allowed inside the booth.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
              <h3 className="font-semibold text-lg mb-4 text-center">Important Contacts</h3>
              <div className="flex justify-around bg-brand-50 dark:bg-brand-900/20 p-4 rounded-lg">
                <div className="text-center">
                  <p className="text-sm font-semibold text-brand-700">Election Commission Helpline</p>
                  <p className="text-xl font-bold">1950</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-brand-700">Online Portal</p>
                  <p className="text-sm font-bold mt-1">voters.eci.gov.in</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center text-xs text-muted-foreground opacity-70">
              Disclaimer: This document is for personal readiness and is not an official government document.
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
