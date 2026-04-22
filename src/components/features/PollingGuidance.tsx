"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function PollingGuidance() {
  const getBestTimeToVote = () => {
    // This could theoretically use AI or historical data.
    // For this prototype, we'll return a static tip based on standard Indian election patterns.
    return {
      time: "1:00 PM - 3:00 PM",
      reason: "Historically, crowds are thinnest during post-lunch hours."
    };
  };

  const bestTime = getBestTimeToVote();

  return (
    <Card className="border-accent-200">
      <CardHeader>
        <CardTitle className="text-lg">Polling Guidance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-lg">
          <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">💡 Best Time to Vote Predictor</p>
          <p className="text-lg font-bold text-foreground mt-1">{bestTime.time}</p>
          <p className="text-xs text-muted-foreground mt-1">{bestTime.reason}</p>
        </div>

        <div>
          <p className="text-sm mb-2">Find the exact location of your polling booth using the official ECI Electoral Search.</p>
          <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noreferrer">
            <Button className="w-full bg-accent-600 hover:bg-accent-700 text-white">
              Find My Polling Booth 🗺️
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
