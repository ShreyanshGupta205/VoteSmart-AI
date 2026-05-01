"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Shield, Lock, Eye, Server, RefreshCcw, Mail } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-4xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-black font-display mb-4">Privacy <span className="gradient-text">Policy</span></h1>
        <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
          Effective Date: {lastUpdated}   |   Last Updated: {lastUpdated}
        </p>
      </m.div>

      <Card className="premium-card border-none glass overflow-hidden">
        <CardContent className="p-8 md:p-12 space-y-10 text-foreground/80 leading-relaxed">
          
          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Shield className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">1. Our Privacy-First Commitment</h2>
            </div>
            <p>
              VoteSmart AI was built with a privacy-first approach. We do not require you to create an account. We do not sell your data. We do not collect your Voter ID, Aadhaar number, or any government-issued identity information.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Eye className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">2. Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-foreground">a) Information you provide voluntarily</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Messages you type into the AI assistant</li>
                <li>Problem selections in the Problem Solver tool</li>
                <li>Feedback you submit via our feedback form</li>
                <li>Contact form submissions (name, email, message)</li>
              </ul>
              <h3 className="font-bold text-foreground mt-6">b) Information collected automatically</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device type and browser type (for compatibility)</li>
                <li>Pages visited and time spent (via analytics)</li>
                <li>General geographic region (city/state level, not precise location)</li>
                <li>Offline/online status (for cached page functionality)</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Server className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">3. How We Use Your Information</h2>
            </div>
            <p className="mb-4">We use the information collected to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Power the AI assistant responses</li>
              <li>Improve platform performance and fix bugs</li>
              <li>Understand which features are most helpful</li>
              <li>Respond to your feedback and queries</li>
              <li>Maintain the security and integrity of the platform</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Lock className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">4. AI Conversations</h2>
            </div>
            <p>
              When you interact with our AI assistant, your messages are sent to the AI model API to generate responses. These conversations may be stored temporarily to maintain session context but are not permanently stored or linked to your identity. We do not use your conversations to train AI models without explicit consent.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <RefreshCcw className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">5. Cookies</h2>
            </div>
            <p>
              We use essential cookies to enable core functionality (e.g., remembering your readiness checklist progress offline). We may use analytics cookies to understand usage patterns. You can manage cookie preferences in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">6. Data Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal data. We may share data with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>AI model providers (for generating assistant responses) — under strict data processing agreements</li>
              <li>Analytics providers (anonymized, aggregated data only)</li>
              <li>Law enforcement only when legally required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">7. Data Retention</h2>
            <p>
              Contact form submissions are retained for up to 12 months. Analytics data is retained in aggregated form. AI conversation data is not permanently stored beyond the active session.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">8. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Request a copy of any personal data we hold about you</li>
              <li>Request deletion of your data</li>
              <li>Opt out of analytics tracking</li>
              <li>Contact us with any privacy concerns</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, email us at: <span className="font-bold text-brand-600">contact@votesmart-ai.com</span>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">9. Children&apos;s Privacy</h2>
            <p>
              VoteSmart AI is designed for citizens of voting age (18+). We do not knowingly collect data from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. The &apos;Last Updated&apos; date will reflect changes. Continued use of the platform means you accept the updated policy.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-2 text-brand-600">
              <Mail className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">11. Contact Us</h2>
            </div>
            <p>
              Privacy Officer: Shreyansh Gupta   |   Email: <span className="font-bold text-brand-600">shreyanshg2005online@gmail.com</span>
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}

