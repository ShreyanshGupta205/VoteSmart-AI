"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Home, Wrench, MessageSquare, BookOpen, CheckCircle2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-xl w-full text-center space-y-8">
        <m.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block"
        >
          <span className="text-[180px] font-black text-brand-500/10 select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl">🗳️</span>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-black font-display">Page Not Found</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. Don&apos;t worry — your vote still counts!
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <Link href="/">
            <Button variant="outline" className="w-full flex items-center gap-2 h-12 rounded-xl">
              <Home className="w-4 h-4" /> Home
            </Button>
          </Link>
          <Link href="/solve">
            <Button variant="outline" className="w-full flex items-center gap-2 h-12 rounded-xl">
              <Wrench className="w-4 h-4" /> Problem Solver
            </Button>
          </Link>
          <Link href="/assistant">
            <Button variant="outline" className="w-full flex items-center gap-2 h-12 rounded-xl">
              <MessageSquare className="w-4 h-4" /> AI Assistant
            </Button>
          </Link>
          <Link href="/first-time">
            <Button variant="outline" className="w-full flex items-center gap-2 h-12 rounded-xl">
              <BookOpen className="w-4 h-4" /> First-Time Guide
            </Button>
          </Link>
        </m.div>

        <p className="text-xs text-muted-foreground mt-8">
          Still lost? Contact us at <span className="font-bold text-brand-600">shreyanshg2005online@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

function Tool({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1 2.82 0l.3.3a2 2 0 0 1 0 2.82l-3.77 3.77a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1 2.82 0l.3.3a2 2 0 0 1 0 2.82l-3.77 3.77a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1 2.82 0l.3.3a2 2 0 0 1 0 2.82l-3.77 3.77a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0" />
      <path d="m2 22 5-5" />
      <path d="M9.5 14.5 16 8" />
      <path d="m7.3 13.2-2.3 2.3" />
      <path d="m10.8 16.7-2.3 2.3" />
    </svg>
  );
}

