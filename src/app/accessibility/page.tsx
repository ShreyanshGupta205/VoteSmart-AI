"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Accessibility, CheckCircle2, AlertCircle, Mail, Keyboard, Eye, Type, WifiOff } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-4xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black font-display mb-4">Accessibility <span className="gradient-text">Statement</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          VoteSmart AI is committed to making civic participation accessible to every Indian citizen, regardless of ability or disability.
        </p>
      </m.div>

      <Card className="premium-card border-none glass overflow-hidden">
        <CardContent className="p-8 md:p-12 space-y-12 text-foreground/80 leading-relaxed">
          
          <section>
            <div className="flex items-center gap-3 mb-6 text-brand-600">
              <Accessibility className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">Our Commitment</h2>
            </div>
            <p>
              We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Our goal is that every voter — including those with visual, hearing, motor, or cognitive disabilities — can use VoteSmart AI with ease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-8">Accessibility Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <Keyboard className="w-5 h-5" />, title: "Keyboard Navigation", desc: "Full support for keyboard users throughout the platform." },
                { icon: <Eye className="w-5 h-5" />, title: "Screen Reader Ready", desc: "Built with semantic HTML and ARIA labels for assistive tech." },
                { icon: <Type className="w-5 h-5" />, title: "Clear Typography", desc: "Large, readable fonts with clear visual hierarchy." },
                { icon: <WifiOff className="w-5 h-5" />, title: "Offline Ready", desc: "Functionality available in areas with poor connectivity." }
              ].map((f, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-border">
                  <div className="text-brand-600 shrink-0 mt-1">{f.icon}</div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6 text-brand-600">
              <AlertCircle className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">Known Limitations</h2>
            </div>
            <p className="mb-4">We are continuously improving accessibility. Current known limitations include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The EVM simulator may not be fully keyboard-navigable on all devices — we are working on this.</li>
              <li>Some PDF downloads may not be fully screen-reader accessible.</li>
            </ul>
          </section>

          <section className="pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Mail className="w-6 h-6" />
              <h2 className="text-xl font-bold font-display text-foreground">Feedback on Accessibility</h2>
            </div>
            <p className="mb-4">
              If you experience any accessibility barriers on VoteSmart AI, please contact us at <span className="font-bold text-brand-600">shreyanshg2005online@gmail.com</span>.
            </p>
            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-600" />
              <p className="text-sm font-medium text-brand-800 dark:text-brand-400">Accessibility reports are treated as high priority.</p>
            </div>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}

