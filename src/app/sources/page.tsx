"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Database, CheckCircle2, FileText, AlertCircle, ExternalLink, ShieldCheck } from "lucide-react";

export default function SourcesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-4xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black font-display mb-4">Sources & <span className="gradient-text">Fact-Check</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every piece of civic information on VoteSmart AI is sourced from official government publications and the Election Commission of India.
        </p>
      </m.div>

      <Card className="premium-card border-none glass overflow-hidden">
        <CardContent className="p-8 md:p-12 space-y-12 text-foreground/80 leading-relaxed">
          
          <section>
            <div className="flex items-center gap-3 mb-8 text-brand-600">
              <Database className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">Primary Official Sources</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Election Commission of India", url: "https://www.eci.gov.in" },
                { name: "National Voters' Service Portal", url: "https://www.nvsp.in" },
                { name: "CEO Portals of each State", url: "#" },
                { name: "ECI Handbook on Electoral Rolls", url: "#" },
                { name: "Representation of the People Act", url: "#" },
                { name: "ECI Model Code of Conduct", url: "#" }
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-white/50 dark:bg-slate-900/50">
                  <span className="font-bold text-sm">{s.name}</span>
                  {s.url !== "#" && <ExternalLink className="w-3 h-3 text-brand-600" />}
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6 text-brand-600">
              <ShieldCheck className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">Our Fact-Check Process</h2>
            </div>
            <div className="space-y-4">
              {[
                "We verify all information against at least one official ECI source.",
                "We ensure rules are current for the latest election cycle.",
                "AI responses are reviewed against official documentation.",
                "Community-reported errors are reviewed within 48 hours."
              ].map((p, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6 text-brand-600">
              <FileText className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">What the AI Can & Cannot Do</h2>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-border space-y-4">
              <p className="font-bold mb-2">The AI assistant is trained on general civic knowledge but CANNOT:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Access real-time voter roll databases.</li>
                <li>Retrieve your personal voter registration status.</li>
                <li>Provide constituency-specific live data.</li>
              </ul>
              <p className="text-xs font-medium text-brand-600 mt-4">For real-time personal data, always use www.nvsp.in directly.</p>
            </div>
          </section>

          <section className="pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <AlertCircle className="w-6 h-6" />
              <h2 className="text-xl font-bold font-display text-foreground">Report an Error</h2>
            </div>
            <p>
              Found information that seems outdated or incorrect? Email us at <span className="font-bold text-brand-600">shreyanshg2005online@gmail.com</span> with <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">&apos;Fact Check&apos;</span> in the subject line.
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}

