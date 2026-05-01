"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Mail, MessageSquare, Github, Linkedin, Instagram, Clock, AlertCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-5xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black font-display mb-4">Contact <span className="gradient-text">Us</span></h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We&apos;re here to help. Whether you&apos;ve found incorrect information, have a question, or just want to say hello — we read every message.
        </p>
      </m.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="premium-card border-none glass overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4 text-brand-600 mb-2">
              <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-2xl">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-display text-foreground">Reach Us By Email</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-border bg-white/50 dark:bg-slate-900/50">
                <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-1">General Enquiries</p>
                <p className="text-lg font-bold text-brand-600">shreyanshg2005online@gmail.com</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-white/50 dark:bg-slate-900/50">
                <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-1">Press & Media</p>
                <p className="text-lg font-bold text-brand-600">shreyanshg2005online@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
              <Clock className="w-4 h-4" />
              <span>We aim to respond within 48 hours on working days.</span>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card border-none glass overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4 text-brand-600 mb-2">
              <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-2xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-display text-foreground">Report Issues</h2>
            </div>
            
            <div className="space-y-6">
              <section>
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Report Incorrect Info
                </h3>
                <p className="text-sm text-muted-foreground mb-3">Found something wrong? Use subject: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">&apos;Incorrect Information Report&apos;</span></p>
              </section>

              <section>
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Suggest a Feature
                </h3>
                <p className="text-sm text-muted-foreground mb-3">Have an idea? Use subject: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">&apos;Feature Suggestion&apos;</span></p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-border gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Social Media</h2>
          <p className="text-muted-foreground">Follow us for real-time civic awareness updates.</p>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/ShreyanshGupta205" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <Github className="w-6 h-6 text-foreground" />
          </a>
          <a href="https://www.instagram.com/shreyanshg2005/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <Instagram className="w-6 h-6 text-pink-500" />
          </a>
          <a href="https://www.linkedin.com/in/shreyanshgupta205/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <Linkedin className="w-6 h-6 text-blue-600" />
          </a>
        </div>
      </div>
    </div>
  );
}

