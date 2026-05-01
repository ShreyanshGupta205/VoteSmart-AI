"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { ShieldCheck, Scale, Search, Eye, BarChart2, AlertTriangle, Mail } from "lucide-react";

export default function EthicsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-4xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black font-display mb-4">AI Ethics & <span className="gradient-text">Neutrality</span></h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          VoteSmart AI uses artificial intelligence to help citizens navigate the electoral process. With that power comes responsibility. Here&apos;s exactly how we ensure our AI is fair, neutral, and safe.
        </p>
      </m.div>

      <Card className="premium-card border-none glass overflow-hidden">
        <CardContent className="p-8 md:p-12 space-y-12 text-foreground/80 leading-relaxed">
          
          <section>
            <div className="flex items-center gap-3 mb-6 text-brand-600">
              <Scale className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">Political Neutrality</h2>
            </div>
            <p className="mb-4">Our AI assistant is strictly programmed to be politically neutral. It will not:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Recommend or favor any political party, alliance, or candidate</li>
              <li>Provide biased analysis of political manifestos or policies</li>
              <li>Express opinions on electoral outcomes or who should win</li>
              <li>Respond to requests to generate political propaganda</li>
            </ul>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-border text-sm">
              <p className="italic">Note: If you ask the AI &apos;Which party should I vote for?&apos;, it will redirect you to official candidate information resources without expressing a preference.</p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Search className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">Accuracy & Source Grounding</h2>
            </div>
            <p>
              Our AI responses are grounded in official ECI guidelines, government notifications, and verified civic information. We do not allow the AI to speculate on electoral rules or fabricate procedural information.
            </p>
            <p className="mt-4 text-sm font-medium text-brand-600">
              Always verify time-sensitive information at www.eci.gov.in or www.nvsp.in.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Eye className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">Transparency About AI</h2>
            </div>
            <p>
              We are transparent that you are interacting with an AI assistant, not a human or government official. The AI is a tool to guide and educate — not an authority. We display this clearly throughout the platform.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <ShieldCheck className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">No Voter Manipulation</h2>
            </div>
            <p>
              VoteSmart AI is designed to increase voter participation and understanding — not to influence how you vote. We believe every citizen should vote freely and informedly, based on their own values and judgment.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <BarChart2 className="w-8 h-8" />
              <h2 className="text-2xl font-bold font-display text-foreground">Data Ethics</h2>
            </div>
            <p>
              We do not use your electoral queries or AI conversations to build political profiles, target you with content, or share data with any political organization. See our Privacy Policy for full details.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-2 text-brand-600">
              <Mail className="w-6 h-6" />
              <h2 className="text-xl font-bold font-display text-foreground">Reporting Bias or Errors</h2>
            </div>
            <p className="text-sm">
              If you believe the AI has said something politically biased or factually incorrect, please report it immediately at <span className="font-bold text-brand-600">shreyanshg2005online@gmail.com</span> with the subject <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">&apos;AI Bias Report&apos;</span>.
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}

