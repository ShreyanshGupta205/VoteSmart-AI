"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Scale, Info, MessageSquare, ShieldAlert, Cpu, ExternalLink, Copyright, Globe, Mail } from "lucide-react";

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-4xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-black font-display mb-4">Terms & <span className="gradient-text">Conditions</span></h1>
        <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
          Effective Date: {lastUpdated}   |   Last Updated: {lastUpdated}
        </p>
      </m.div>

      <Card className="premium-card border-none glass overflow-hidden">
        <CardContent className="p-8 md:p-12 space-y-10 text-foreground/80 leading-relaxed">
          
          <p className="text-foreground font-medium italic">
            Please read these Terms and Conditions carefully before using VoteSmart AI. By accessing or using any part of this platform, you agree to be bound by these terms.
          </p>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Info className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">1. About VoteSmart AI</h2>
            </div>
            <p>
              VoteSmart AI is an independent, non-commercial civic education platform designed to help citizens of India understand the electoral process. We are <span className="font-bold text-foreground underline decoration-brand-500">NOT affiliated with, endorsed by, or connected to the Election Commission of India (ECI)</span>, any political party, or any government body.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Scale className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">2. Educational Purpose Only</h2>
            </div>
            <p className="mb-4">
              All content on this platform — including AI-generated responses, guides, checklists, and simulations — is provided for educational and informational purposes only. Nothing on this platform constitutes legal advice, official electoral guidance, or a guarantee of accuracy.
            </p>
            <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-2xl border border-brand-100 dark:border-brand-800">
              <p className="font-bold text-foreground mb-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-brand-600" /> Always verify critical information directly with:
              </p>
              <ul className="space-y-2 text-sm font-medium">
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  <a href="https://www.eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">The Election Commission of India: www.eci.gov.in</a>
                </li>
                <li className="flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  <a href="https://www.nvsp.in" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">National Voters&apos; Service Portal: www.nvsp.in</a>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-3 h-3" />
                  <span>Your State Chief Electoral Officer&apos;s office</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Cpu className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">3. AI Assistant Disclaimer</h2>
            </div>
            <p>
              The AI assistant on this platform uses language model technology and may occasionally produce incorrect, incomplete, or outdated information. Users should not rely solely on AI responses for official electoral decisions. Google&apos;s Gemini models power our assistant — responses are generated automatically and are not reviewed by a human before delivery.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <ShieldAlert className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">4. Acceptable Use</h2>
            </div>
            <p className="mb-4">By using VoteSmart AI, you agree that you will not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the platform to spread misinformation about the electoral process</li>
              <li>Attempt to hack, scrape, or disrupt the platform&apos;s functionality</li>
              <li>Use the AI assistant to generate political propaganda or biased content</li>
              <li>Impersonate any government official or electoral authority</li>
              <li>Use the platform for any commercial purpose without written consent</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-brand-600">
              <Copyright className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">5. Intellectual Property</h2>
            </div>
            <p>
              All original content, design, code, and branding on VoteSmart AI is the intellectual property of the Shreyansh Gupta. You may share content for non-commercial civic education purposes with proper attribution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">6. Third-Party Links</h2>
            <p>
              Our platform may link to official government websites and third-party resources. We do not control these external sites and are not responsible for their content or availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">7. Limitation of Liability</h2>
            <p>
              VoteSmart AI and its creators shall not be held liable for any loss, damage, or inconvenience arising from your use of this platform or reliance on any information provided herein. Use this platform at your own discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">8. Changes to These Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Continued use of the platform after changes constitutes acceptance of the new Terms. We will display the &apos;Last Updated&apos; date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-4">9. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in New Delhi, India.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <div className="flex items-center gap-3 mb-2 text-brand-600">
              <Mail className="w-6 h-6" />
              <h2 className="text-2xl font-bold font-display text-foreground">10. Contact</h2>
            </div>
            <p>
              For questions about these Terms, contact us at: <span className="font-bold text-brand-600">shreyanshg2005online@gmail.com</span>
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}

