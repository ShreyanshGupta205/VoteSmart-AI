"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Cookie, ShieldCheck, BarChart3, Settings, Mail } from "lucide-react";

export default function CookiesPage() {
  const lastUpdated = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-4xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-black font-display mb-4">Cookie <span className="gradient-text">Policy</span></h1>
        <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
          Effective Date: {lastUpdated}
        </p>
      </m.div>

      <Card className="premium-card border-none glass overflow-hidden">
        <CardContent className="p-8 md:p-12 space-y-12 text-foreground/80 leading-relaxed">
          
          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Cookie className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">What Are Cookies?</h2>
            </div>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-6">Cookies We Use</h2>
            
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800">
                <div className="flex items-center gap-3 mb-3 text-brand-600">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="font-bold text-lg text-foreground">Essential Cookies (Always Active)</h3>
                </div>
                <p className="text-sm mb-4">These are required for the platform to function. They cannot be disabled.</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><span className="font-bold text-foreground">Session cookies</span> — maintain your checklist progress during a visit</li>
                  <li><span className="font-bold text-foreground">Offline cache cookies</span> — allow certain pages to load without internet</li>
                  <li><span className="font-bold text-foreground">Preference cookies</span> — remember your language or accessibility settings</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/20 border border-border">
                <div className="flex items-center gap-3 mb-3 text-brand-600">
                  <BarChart3 className="w-5 h-5" />
                  <h3 className="font-bold text-lg text-foreground">Analytics Cookies (Optional)</h3>
                </div>
                <p className="text-sm mb-4">These help us understand how people use VoteSmart AI so we can improve it.</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><span className="font-bold text-foreground">Page view tracking</span> — which pages are visited most</li>
                  <li><span className="font-bold text-foreground">Feature usage</span> — which tools (Solver, Simulator, Checklist) are used</li>
                  <li><span className="font-bold text-foreground">Session duration</span> — how long users spend on the platform</li>
                </ul>
                <p className="mt-4 text-xs text-muted-foreground italic">Analytics data is anonymized and never linked to your identity. You can opt out at any time.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Settings className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">How to Manage Cookies</h2>
            </div>
            <p className="mb-6">
              You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling essential cookies may affect platform functionality.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl border border-border bg-white/50 dark:bg-slate-900/50">
                <p className="font-bold mb-1">Google Chrome</p>
                <p className="text-xs text-muted-foreground">Settings → Privacy and Security → Cookies</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-white/50 dark:bg-slate-900/50">
                <p className="font-bold mb-1">Firefox</p>
                <p className="text-xs text-muted-foreground">Settings → Privacy & Security → Cookies and Site Data</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-white/50 dark:bg-slate-900/50">
                <p className="font-bold mb-1">Safari</p>
                <p className="text-xs text-muted-foreground">Preferences → Privacy → Manage Website Data</p>
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-2 text-brand-600">
              <Mail className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">Contact</h2>
            </div>
            <p>
              Questions about our cookie use? Email us at: <span className="font-bold text-brand-600">shreyanshg2005online@gmail.com</span>
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}

