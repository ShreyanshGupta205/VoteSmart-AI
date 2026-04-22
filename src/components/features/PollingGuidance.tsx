"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function PollingGuidance() {
  const getBestTimeToVote = () => {
    return {
      time: "1:00 PM - 3:00 PM",
      reason: "Crowds are typically lower during these post-lunch hours."
    };
  };

  const bestTime = getBestTimeToVote();

  return (
    <Card className="border-none glass shadow-premium rounded-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold font-display tracking-tight">Polling Guidance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-brand-50/50 dark:bg-brand-900/10 p-5 rounded-xl border border-brand-100/30">
          <p className="text-xs font-black uppercase tracking-widest text-brand-600 mb-2">Smart Predictor</p>
          <p className="text-sm font-bold text-foreground">💡 Recommended Voting Window</p>
          <p className="text-3xl font-black text-brand-600 dark:text-brand-400 mt-2 font-display">{bestTime.time}</p>
          <p className="text-xs text-muted-foreground mt-2 font-medium">{bestTime.reason}</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verify your polling booth location and EPIC details using the official Election Commission portal.
          </p>
          <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noreferrer" className="block">
            <Button className="w-full h-12 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold shadow-lg shadow-accent-600/20">
              Find My Polling Booth 🗺️
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
