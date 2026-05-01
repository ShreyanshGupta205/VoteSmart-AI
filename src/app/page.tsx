"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const features = [
  { title: "Problem Solver", description: "Tell us your issue. Get instant step-by-step solutions for registration, missing name, documents, and more.", href: "/solve", icon: "🛠️" },
  { title: "AI Assistant", description: "Get neutral, verified answers about the electoral process from our voice-enabled AI companion.", href: "/assistant", icon: "🤖" },
  { title: "Voting Simulator", description: "Step-by-step EVM & VVPAT practice to build confidence before you hit the booth.", href: "/simulate", icon: "🗳️" },
  { title: "Document Helper", description: "Instantly check if your ID is valid at the polling booth — no upload required.", href: "/documents", icon: "🧾" },
  { title: "Readiness Checklist", description: "A personalized checklist and PDF guide to ensure you have all documents ready.", href: "/checklist", icon: "📋" },
  { title: "Impact Visualizer", description: "See exactly how your single vote changes real election outcomes with live data.", href: "/impact", icon: "📊" },
];

const problems = [
  { label: "I don't know if I'm registered", href: "/solve?problem=not-registered", icon: "❓" },
  { label: "My name is missing from voter list", href: "/solve?problem=name-missing", icon: "🔍" },
  { label: "I don't have a Voter ID", href: "/solve?problem=no-voter-id", icon: "🆔" },
  { label: "I'm confused about the process", href: "/solve?problem=confused-process", icon: "🤔" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-brand-100">
      {/* Disclaimer */}
      <div className="bg-brand-50 text-brand-900 border-b border-brand-100 px-4 py-2.5 text-xs text-center font-semibold tracking-wide uppercase">
        Educational Platform • Not affiliated with the Election Commission of India
      </div>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-8 py-28 sm:py-40 overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#FF9933]/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-[#ffffff]/40 blur-[100px] rounded-full animate-pulse delay-700" />
            <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[40%] bg-[#138808]/20 blur-[120px] rounded-full animate-pulse delay-1000" />
          </div>

          <div className="mx-auto max-w-5xl text-center">
            <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl lg:text-8xl font-display leading-[1.1]">
                Empowering the <br />
                <span className="gradient-text">Next Generation</span> of Voters
              </h1>
              <p className="mt-8 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto font-light">
                A privacy-first, AI-powered election companion. Master the voting process, verify eligibility, and make impact-driven decisions for India&apos;s democracy.
              </p>
            </m.div>

            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/solve">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold shadow-xl shadow-brand-500/20">
                  🛠️ Solve My Issue
                </Button>
              </Link>
              <Link href="/first-time">
                <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg font-bold glass">
                  🌟 First-Time Voter Guide
                </Button>
              </Link>
            </m.div>
          </div>
        </section>

        {/* Quick Problem Selector */}
        <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto">
          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold sm:text-4xl font-display">What&apos;s your issue?</h2>
            <p className="text-muted-foreground mt-3">Select your problem and get an instant step-by-step solution.</p>
          </m.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {problems.map((p, i) => (
              <m.div key={p.href} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={p.href} aria-label={`Solve issue: ${p.label}`}>
                  <div className="flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-brand-200 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:shadow-md transition-all duration-300 group cursor-pointer" role="button">
                    <span className="text-2xl" role="img" aria-hidden="true">{p.icon || '❓'}</span>
                    <span className="font-semibold text-sm text-foreground group-hover:text-brand-600 transition-colors">{p.label}</span>
                    <span className="ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/solve">
              <Button variant="outline" className="rounded-full px-8 font-bold border-2">See all 6 issues →</Button>
            </Link>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold sm:text-4xl font-display">Interactive Civic Tools</h2>
            <p className="text-muted-foreground mt-4">Everything you need to be 100% election ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.href} title={f.title} description={f.description} href={f.href} icon={f.icon} delay={i * 0.07} />
            ))}
          </div>
        </section>

        {/* First-Time Voter CTA */}
        <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto">
          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-yellow-400/90 to-orange-400/90 p-8 md:p-12 text-center shadow-2xl shadow-orange-500/20">
            <span className="text-5xl block mb-4">🌟</span>
            <h2 className="text-3xl font-black font-display text-white mb-3">Voting for the first time?</h2>
            <p className="text-white/80 text-lg mb-6 max-w-md mx-auto">We&apos;ll walk you through every single step — from checking registration to pressing the EVM button. No confusion guaranteed.</p>
            <Link href="/first-time">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 font-black h-12 px-8 rounded-full text-base shadow-lg">
                Start My First-Time Guide 🚀
              </Button>
            </Link>
          </m.div>
        </section>
      </main>

    </div>
  );
}

function FeatureCard({ title, description, href, icon, delay }: { title: string; description: string; href: string; icon: string; delay: number }) {
  return (
    <m.div whileHover={{ y: -8 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, type: "spring", stiffness: 300 }}>
      <Link href={href} aria-label={`Navigate to ${title}: ${description}`}>
        <Card className="h-full cursor-pointer premium-card border-none glass hover:bg-white/80 dark:hover:bg-slate-900/80" role="link">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center text-2xl mb-4">{icon}</div>
            <CardTitle className="text-2xl font-bold font-display">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </CardContent>
        </Card>
      </Link>
    </m.div>
  );
}

