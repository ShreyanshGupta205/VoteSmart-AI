"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { ChevronDown, HelpCircle, Shield, PenTool, Database, ExternalLink } from "lucide-react";

const faqs = [
  {
    category: "About VoteSmart AI",
    icon: <HelpCircle className="w-5 h-5" />,
    questions: [
      {
        q: "Is VoteSmart AI an official government website?",
        a: "No. VoteSmart AI is an independent civic technology project. It is not affiliated with the Election Commission of India or any government body. For official information, always visit www.eci.gov.in or call Voter Helpline 1950."
      },
      {
        q: "Is this platform free to use?",
        a: "Yes, 100% free. There is no registration required, no premium plan, no ads."
      },
      {
        q: "Who built VoteSmart AI?",
        a: "We are a team of students and civic tech enthusiasts who built this platform to make India's electoral process more accessible for every citizen."
      }
    ]
  },
  {
    category: "Privacy & Data",
    icon: <Shield className="w-5 h-5" />,
    questions: [
      {
        q: "Do you store my data or chat history?",
        a: "We do not permanently store your AI conversations or link them to your identity. We collect anonymized analytics to improve the platform. We never collect your Voter ID, Aadhaar, or government ID numbers."
      },
      {
        q: "Is it safe to type my electoral questions here?",
        a: "Yes. Do not share sensitive personal details like your full Aadhaar number or banking information in the chat. For electoral questions like registration status or booth location, using this platform is completely safe."
      }
    ]
  },
  {
    category: "Using the Platform",
    icon: <PenTool className="w-5 h-5" />,
    questions: [
      {
        q: "The AI gave me wrong information. What should I do?",
        a: "Always verify critical electoral information at www.nvsp.in or by calling 1950. If you spot an error, please report it to us at shreyanshg2005online@gmail.com — we take accuracy very seriously."
      },
      {
        q: "Does the platform work offline?",
        a: "Many pages are cached for offline use. However, the AI assistant requires an internet connection. We show an offline banner when you're not connected."
      },
      {
        q: "Can I download my checklist or voter guide as a PDF?",
        a: "Yes — the Readiness Checklist page has a 'Download PDF' option so you can print and carry it to the polling booth."
      }
    ]
  },
  {
    category: "Electoral Information",
    icon: <Database className="w-5 h-5" />,
    questions: [
      {
        q: "How do I check if my name is on the voter list?",
        a: "Visit www.nvsp.in and search by your name, EPIC number, or mobile number. Our Problem Solver tool also walks you through this step by step."
      },
      {
        q: "What documents can I bring to the polling booth?",
        a: "The ECI accepts multiple photo IDs — not just the Voter ID card. Use our Document Helper tool to instantly check if your ID qualifies."
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggle = (id: string) => setOpenIndex(openIndex === id ? null : id);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-4xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black font-display mb-4">Frequently Asked <span className="gradient-text">Questions</span></h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Everything you need to know about VoteSmart AI and the electoral process.
        </p>
      </m.div>

      <div className="space-y-12">
        {faqs.map((cat, catIdx) => (
          <section key={catIdx}>
            <div className="flex items-center gap-3 mb-6 text-brand-600">
              <div className="p-2 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
                {cat.icon}
              </div>
              <h2 className="text-2xl font-bold font-display text-foreground">{cat.category}</h2>
            </div>
            
            <div className="space-y-3">
              {cat.questions.map((item, qIdx) => {
                const id = `${catIdx}-${qIdx}`;
                const isOpen = openIndex === id;
                return (
                  <Card key={id} className={`overflow-hidden transition-all border-none glass ${isOpen ? "bg-white/80 dark:bg-slate-900/80 shadow-md" : "hover:bg-white/50 dark:hover:bg-slate-900/50"}`}>
                    <button 
                      onClick={() => toggle(id)}
                      className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="font-bold text-foreground leading-tight pr-4">{item.q}</span>
                      <ChevronDown className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <m.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-border/50">
                            {item.a}
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 p-8 rounded-3xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800 text-center">
        <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
        <p className="text-sm text-muted-foreground mb-6">If you can&apos;t find the answer you&apos;re looking for, please get in touch.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/contact" className="px-8 py-3 rounded-xl bg-brand-500 text-white font-bold hover:bg-brand-600 transition-all">Contact Us</a>
          <a href="https://www.eci.gov.in" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-xl bg-white dark:bg-slate-800 text-foreground font-bold border border-border flex items-center justify-center gap-2">
            Visit Official ECI Site <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

