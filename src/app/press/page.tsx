"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Newspaper, BarChart2, Download, Mail, ExternalLink, Globe, Layout, Cpu } from "lucide-react";

export default function PressPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-5xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black font-display mb-4">Press & <span className="gradient-text">Media Kit</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          VoteSmart AI is a civic technology platform making India&apos;s electoral process accessible through AI.
        </p>
      </m.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="premium-card border-none glass overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4 text-brand-600 mb-2">
              <Newspaper className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">Project Summary</h2>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              VoteSmart AI is a free, privacy-first, AI-powered election companion for Indian voters. It offers a problem solver, EVM simulator, document checker, AI assistant, and voter readiness tools — all without requiring registration or sharing personal data.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p className="font-bold text-muted-foreground uppercase">Tech Stack</p>
                <p>Next.js, Gemini API</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-muted-foreground uppercase">Built by</p>
                <p>Shreyansh Gupta</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-muted-foreground uppercase">Launched</p>
                <p>April 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card border-none glass overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4 text-brand-600 mb-2">
              <BarChart2 className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">Key Statistics</h2>
            </div>
            <div className="space-y-4">
              {[
                { label: "Voters helped since launch", value: "25k+" },
                { label: "AI conversations completed", value: "100k+" },
                { label: "Checklists downloaded", value: "15k+" }
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-slate-900/50">
                  <span className="text-xs font-medium">{s.label}</span>
                  <span className="font-black text-brand-600">{s.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold font-display mb-6">What Makes Us Different</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Globe className="w-4 h-4" />, title: "Fully Anonymous", desc: "No login or Voter ID required." },
                { icon: <Layout className="w-4 h-4" />, title: "Offline Support", desc: "Works for rural areas." },
                { icon: <Shield className="w-4 h-4" />, title: "Neutral", desc: "No political affiliation." },
                { icon: <Cpu className="w-4 h-4" />, title: "Verified AI", desc: "Grounded in ECI data." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-border">
                  <div className="text-brand-600 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <Card className="premium-card border-none glass h-fit">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-xl font-bold font-display">Media Assets</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-border hover:border-brand-500 transition-all group">
                <span className="text-sm font-bold">Logo Kit (SVG/PNG)</span>
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-brand-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-border hover:border-brand-500 transition-all group">
                <span className="text-sm font-bold">Product Screenshots</span>
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-brand-600" />
              </button>
            </div>
            <div className="pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground uppercase font-black mb-4 tracking-widest">Press Contact</p>
              <a href="mailto:shreyanshg2005online@gmail.com" className="flex items-center gap-3 text-brand-600 hover:underline">
                <Mail className="w-4 h-4" />
                <span className="font-bold">shreyanshg2005online@gmail.com</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Shield({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

