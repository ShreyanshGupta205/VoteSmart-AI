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
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold font-display tracking-tight text-brand-600 dark:text-brand-400">
              VoteSmart<span className="text-foreground">AI</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors hover:text-brand-600",
                  pathname === item.path ? "text-brand-600" : "text-muted-foreground"
                )}
              >
                {item.label}
                {pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Link href="/score">
              <span className="text-xs font-medium px-3 py-1 bg-brand-100 text-brand-800 rounded-full">
                Score: 0
              </span>
            </Link>
          </div>
          {/* Mobile menu could go here */}
        </div>
      </div>
    </nav>
  );
}
