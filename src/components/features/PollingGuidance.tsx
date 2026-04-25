"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function PollingGuidance() {
  const timeSlots = [
    { time: "7–9 AM", crowd: "Low 🟢", tip: "Best window — minimal queues" },
    { time: "12–3 PM", crowd: "Low 🟢", tip: "Post-lunch lull, hidden gem" },
    { time: "9 AM–12", crowd: "Medium 🟡", tip: "Good option" },
    { time: "3–6 PM", crowd: "High 🔴", tip: "Busy — avoid if possible" },
  ];

  return (
    <Card className="border-none glass shadow-premium rounded-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold font-display tracking-tight">📍 Polling Guidance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Best time grid */}
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((slot) => (
            <div key={slot.time} className={`p-3 rounded-xl text-xs border ${
              slot.crowd.includes("🟢") ? "bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900"
              : slot.crowd.includes("🟡") ? "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-100 dark:border-yellow-900"
              : "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900"
            }`}>
              <p className="font-black text-foreground">{slot.time}</p>
              <p className="text-muted-foreground">{slot.crowd}</p>
              <p className="text-muted-foreground mt-0.5">{slot.tip}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verify your polling booth address and electoral details using the official portal.
          </p>
          <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noreferrer" className="block">
            <Button className="w-full h-12 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold shadow-lg shadow-accent-600/20">
              Find My Polling Booth 🗺️
            </Button>
          </a>
          <Link href="/polling" className="block">
            <Button variant="outline" className="w-full h-10 rounded-xl font-semibold border-2 text-sm">
              Full Guidance + Voting Strategy →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
