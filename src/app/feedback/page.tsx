"use client";

import { m } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { MessageSquare, AlertCircle, Bug, Lightbulb, Heart, Mail, ExternalLink } from "lucide-react";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 max-w-5xl mx-auto">
      <m.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black font-display mb-4">Feedback & <span className="gradient-text">Report</span></h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Help us make VoteSmart AI better for every voter in India.
        </p>
      </m.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        <Card className="premium-card border-none glass overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4 text-red-500 mb-2">
              <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-2xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-display text-foreground">Incorrect Information</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you found something wrong — an outdated rule, a factual error in an AI response, or broken information — please tell us.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-border text-xs space-y-2">
              <p className="font-bold">Please include:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>The incorrect text</li>
                <li>The page it appeared on</li>
                <li>Correct information (with source)</li>
              </ul>
            </div>
            <a href="mailto:shreyanshg2005online@gmail.com?subject=Incorrect Information Report" className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-red-500 transition-all group">
              <span className="font-bold">Email Report</span>
              <Mail className="w-4 h-4 text-muted-foreground group-hover:text-red-500" />
            </a>
          </CardContent>
        </Card>

        <Card className="premium-card border-none glass overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4 text-orange-500 mb-2">
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-2xl">
                <Bug className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-display text-foreground">Report a Bug</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Something not working? Tell us what happened, what page you were on, and your device type.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-border text-xs">
              <p className="font-mono text-muted-foreground">Subject: &apos;Bug Report&apos;</p>
            </div>
            <a href="mailto:shreyanshg2005online@gmail.com?subject=Bug Report" className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-orange-500 transition-all group">
              <span className="font-bold">Email Support</span>
              <Mail className="w-4 h-4 text-muted-foreground group-hover:text-orange-500" />
            </a>
          </CardContent>
        </Card>

        <Card className="premium-card border-none glass overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4 text-blue-500 mb-2">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-2xl">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-display text-foreground">Suggest a Feature</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have an idea that would help more voters? We want to hear it. What problem should we solve next?
            </p>
            <a href="mailto:shreyanshg2005online@gmail.com?subject=Feature Suggestion" className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-blue-500 transition-all group">
              <span className="font-bold">Email Suggestion</span>
              <Mail className="w-4 h-4 text-muted-foreground group-hover:text-blue-500" />
            </a>
          </CardContent>
        </Card>

        <Card className="premium-card border-none glass overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4 text-brand-600 mb-2">
              <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-2xl">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-display text-foreground">General Feedback</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Loved using VoteSmart AI? Tell us your story. Did it help you register or vote for the first time?
            </p>
            <a href="mailto:shreyanshg2005online@gmail.com?subject=My Story" className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-brand-500 transition-all group">
              <span className="font-bold">Tell Your Story</span>
              <Mail className="w-4 h-4 text-muted-foreground group-hover:text-brand-600" />
            </a>
          </CardContent>
        </Card>

      </div>

      <div className="p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-border text-center">
        <h2 className="text-2xl font-bold mb-4">Quick Form</h2>
        <p className="text-muted-foreground mb-6">Prefer using a form? Submit your feedback directly here.</p>
        <button className="px-10 h-14 bg-white dark:bg-slate-800 text-foreground font-black rounded-full border-2 border-brand-500 shadow-lg hover:bg-brand-50 transition-all flex items-center gap-2 mx-auto">
          <ExternalLink className="w-5 h-5" />
          Open Feedback Form
        </button>
      </div>
    </div>
  );
}

