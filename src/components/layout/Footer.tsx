"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

const footerLinks = [
  {
    title: "Tools",
    links: [
      { name: "Problem Solver", href: "/solve" },
      { name: "AI Assistant", href: "/assistant" },
      { name: "Voting Simulator", href: "/simulate" },
      { name: "Document Helper", href: "/documents" },
    ]
  },
  {
    title: "About",
    links: [
      { name: "About Us", href: "/about" },
      { name: "AI Ethics", href: "/ethics" },
      { name: "Fact-Check", href: "/sources" },
      { name: "Accessibility", href: "/accessibility" },
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Feedback", href: "/feedback" },
      { name: "Sitemap", href: "/sitemap" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Disclaimer", href: "/disclaimer" },
    ]
  }
];

export function Footer() {
  return (
    <footer className="py-16 border-t border-border/50 glass relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-brand-50/20 dark:to-brand-950/20" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🇮🇳</span>
              <span className="font-display font-bold text-xl tracking-tighter">VoteSmart AI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Making democracy accessible, transparent, and digital-first for the citizens of India.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/ShreyanshGupta205" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/shreyanshgupta205/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-blue-600 transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/shreyanshg2005/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-pink-500 transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-sm mb-6 uppercase tracking-widest text-foreground">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-brand-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} VoteSmart AI. Independent Educational Platform.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
            <span>Built for the 2026 General Elections</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
            <span>Not affiliated with ECI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
