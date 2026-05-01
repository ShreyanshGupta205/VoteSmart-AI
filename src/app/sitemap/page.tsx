"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { Layout, Wrench, ShieldCheck, HelpCircle, Users, ExternalLink } from "lucide-react";

const sitemap = [
  {
    title: "Main Tools",
    icon: <Layout className="w-5 h-5" />,
    links: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Problem Solver", href: "/solve" },
      { name: "Civic Education", href: "/learn" },
      { name: "Voting Simulator", href: "/simulate" },
      { name: "AI Assistant", href: "/assistant" },
      { name: "Readiness Checklist", href: "/checklist" },
      { name: "Voting Impact", href: "/impact" },
      { name: "Document Helper", href: "/documents" },
      { name: "First-Time Guide", href: "/first-time" },
      { name: "Civic Score", href: "/score" }
    ]
  },
  {
    title: "Legal & Compliance",
    icon: <ShieldCheck className="w-5 h-5" />,
    links: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Disclaimer", href: "/disclaimer" }
    ]
  },
  {
    title: "About & Trust",
    icon: <Users className="w-5 h-5" />,
    links: [
      { name: "About VoteSmart AI", href: "/about" },
      { name: "AI Ethics & Neutrality", href: "/ethics" },
      { name: "Sources & Fact-Check", href: "/sources" },
      { name: "Accessibility", href: "/accessibility" }
    ]
  },
  {
    title: "Support",
    icon: <HelpCircle className="w-5 h-5" />,
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Feedback & Bug Reports", href: "/feedback" }
    ]
  }
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-5xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black font-display mb-4">Site <span className="gradient-text">Map</span></h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A complete list of all pages and tools on VoteSmart AI.
        </p>
      </m.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sitemap.map((section, i) => (
          <Card key={i} className="premium-card border-none glass h-fit">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6 text-brand-600">
                <div className="p-2 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold font-display text-foreground">{section.title}</h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-600 transition-colors group">
                      <div className="w-1 h-1 rounded-full bg-brand-200 group-hover:bg-brand-500 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

