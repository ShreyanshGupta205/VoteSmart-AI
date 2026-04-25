"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useStore } from "@/lib/store";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/solve", label: "Solve" },
  { path: "/learn", label: "Learn" },
  { path: "/simulate", label: "Simulation" },
  { path: "/assistant", label: "AI Guide" },
  { path: "/checklist", label: "Checklist" },
  { path: "/impact", label: "Impact" },
];

const mobileNav = [
  { path: "/dashboard", label: "Dashboard", icon: "🏠" },
  { path: "/solve", label: "Solve Issues", icon: "🛠️" },
  { path: "/status", label: "Check Status", icon: "📊" },
  { path: "/recover", label: "Corrections", icon: "🔄" },
  { path: "/documents", label: "Documents", icon: "🧾" },
  { path: "/polling", label: "Find Booth", icon: "📍" },
  { path: "/first-time", label: "First Timer", icon: "🌟" },
  { path: "/impact", label: "Impact", icon: "📊" },
  { path: "/learn", label: "Learn", icon: "📚" },
  { path: "/simulate", label: "Simulate", icon: "🗳️" },
  { path: "/assistant", label: "AI Guide", icon: "🤖" },
  { path: "/checklist", label: "Checklist", icon: "📋" },
  { path: "/score", label: "My Score", icon: "⭐" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const score = useStore((s) => s.score);
  const firstTimeVoter = useStore((s) => s.firstTimeVoter);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="absolute top-0 left-0 w-full h-1 flex">
          <div className="flex-grow bg-[#FF9933]" />
          <div className="flex-grow bg-white" />
          <div className="flex-grow bg-[#138808]" />
        </div>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 glass rounded-2xl shadow-premium border-white/20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
                V
              </div>
              <span className="text-2xl font-black font-display tracking-tighter">
                Vote<span className="gradient-text">Smart</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-xl",
                    pathname === item.path
                      ? "text-brand-600"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-800/50"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {item.path === "/assistant" && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-500 rounded-full animate-ping" />
                  )}
                  {pathname === item.path && (
                    <m.div 
                      layoutId="navbar-indicator" 
                      className="absolute inset-0 bg-brand-50/50 dark:bg-brand-900/20 rounded-xl -z-10" 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-white/20 shadow-inner">
              {firstTimeVoter && (
                <span className="px-2 py-0.5 rounded-full bg-brand-500 text-[10px] font-black text-white uppercase tracking-tighter">1st Timer</span>
              )}
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">Readiness</span>
                <span className={cn("text-lg font-black leading-none", score >= 80 ? "text-green-500" : score >= 50 ? "text-brand-500" : "text-red-500")}>{score}</span>
              </div>
              <div className="w-10 h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <m.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${score}%` }} 
                  className={cn("h-full", score >= 80 ? "bg-green-500" : score >= 50 ? "bg-brand-500" : "bg-red-500")}
                />
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl glass border border-white/20 hover:bg-white/20 transition-all"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className={cn("w-5 h-0.5 bg-foreground transition-all duration-300", mobileOpen && "rotate-45 translate-y-2")} />
              <span className={cn("w-5 h-0.5 bg-foreground transition-all duration-300", mobileOpen && "opacity-0")} />
              <span className={cn("w-5 h-0.5 bg-foreground transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-2")} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <m.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setMobileOpen(false)} 
              className="fixed inset-0 bg-black/40 z-40 lg:hidden" 
            />
            <m.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-950 shadow-2xl z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <span className="font-black text-lg font-display">
                  <span className="text-brand-600">Vote</span><span>Smart</span><span className="text-accent-500">AI</span>
                </span>
                <button 
                  onClick={() => setMobileOpen(false)} 
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-4 space-y-1">
                {mobileNav.map((item) => (
                  <Link 
                    key={item.path} 
                    href={item.path} 
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                      pathname === item.path 
                        ? "bg-brand-50 text-brand-600 dark:bg-brand-900/30" 
                        : "text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <Link href="/score" onClick={() => setMobileOpen(false)}>
                  <div className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white rounded-xl font-bold text-sm">
                    <span>My Readiness Score</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-lg">{score}/100</span>
                  </div>
                </Link>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
