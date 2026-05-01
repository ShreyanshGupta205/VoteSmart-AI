"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Target, Lightbulb, Users, Shield, UserCheck, Globe, Mail, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-5xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-black font-display mb-4">About <span className="gradient-text">VoteSmart AI</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
          Empowering 960 million voters with the technology they deserve.
        </p>
      </m.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        <Card className="premium-card border-none glass lg:col-span-2">
          <CardContent className="p-8 md:p-12 space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4 text-brand-600">
                <Target className="w-8 h-8" />
                <h2 className="text-3xl font-bold font-display text-foreground">Our Mission</h2>
              </div>
              <p className="text-lg leading-relaxed text-foreground/80">
                VoteSmart AI exists for one reason: to make sure no Indian citizen misses their vote because of confusion, lack of information, or fear of the process.
              </p>
              <p className="mt-4 text-foreground/80">
                India is the world&apos;s largest democracy — yet millions of eligible voters, especially first-time voters, stay home on election day because they don&apos;t know how to register, don&apos;t have the right documents, or simply don&apos;t understand how the EVM works. We built VoteSmart AI to change that.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6 text-brand-600">
                <Lightbulb className="w-8 h-8" />
                <h2 className="text-3xl font-bold font-display text-foreground">What We Built</h2>
              </div>
              <p className="mb-6 text-foreground/80 font-medium">VoteSmart AI is a privacy-first, AI-powered civic companion that helps Indian voters:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  "Check voter registration status and fix issues",
                  "Understand which documents are accepted at booths",
                  "Practice using the EVM and VVPAT through a simulator",
                  "Get step-by-step guidance for common problems",
                  "See the real impact their single vote has",
                  "Prepare completely with a readiness checklist"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-border">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="premium-card border-none glass h-fit">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4 text-brand-600">
                <Users className="w-6 h-6" />
                <h2 className="text-xl font-bold font-display text-foreground">Who We Are</h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                VoteSmart AI was created by Shreyansh Gupta, a developer and civic tech enthusiast passionate about democracy.
              </p>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800">
                <Heart className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold text-brand-600">Built for the citizens of India 🇮🇳</span>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card border-none glass h-fit">
            <CardContent className="p-8">
              <h3 className="font-bold mb-4">Our Principles</h3>
              <ul className="space-y-3 text-xs">
                <li className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-brand-500" />
                  <span className="font-medium">Privacy first — no Voter ID required</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-brand-500" />
                  <span className="font-medium">Politically neutral & unbiased</span>
                </li>
                <li className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-brand-500" />
                  <span className="font-medium">100% Free & Open Information</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <m.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }}
        className="text-center p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-border"
      >
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6">We&apos;d love to hear from you. Whether you want to report an error or suggest a feature.</p>
        <div className="flex justify-center gap-4">
          <a href="mailto:shreyanshg2005online@gmail.com">
            <Card className="p-4 flex items-center gap-3 hover:border-brand-500 transition-all cursor-pointer">
              <Mail className="w-5 h-5 text-brand-600" />
              <span className="font-bold">shreyanshg2005online@gmail.com</span>
            </Card>
          </a>
        </div>
      </m.div>
    </div>
  );
}

