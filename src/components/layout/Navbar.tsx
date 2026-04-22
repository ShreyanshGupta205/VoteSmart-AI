"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/learn", label: "Learn" },
  { path: "/simulate", label: "Simulation" },
  { path: "/assistant", label: "AI Guide" },
  { path: "/checklist", label: "Checklist" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 glass rounded-2xl shadow-premium border-white/20">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black font-display tracking-tighter transition-transform group-hover:scale-105">
              <span className="text-brand-600">Vote</span>
              <span className="text-foreground">Smart</span>
              <span className="text-accent-500">AI</span>
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative px-4 py-2 text-sm font-semibold transition-all rounded-xl hover:bg-white/50 dark:hover:bg-white/5",
                  pathname === item.path ? "text-brand-600" : "text-muted-foreground"
                )}
              >
                {item.label}
                {pathname === item.path && (
                  <motion.div
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
          <div className="hidden sm:block">
            <Link href="/score">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-accent-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/20 hover:scale-105 transition-transform">
                <span>Civic Score</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-lg">0</span>
              </div>
            </Link>
          </div>
          {/* Mobile menu could go here */}
        </div>
      </div>
    </nav>
  );
}
