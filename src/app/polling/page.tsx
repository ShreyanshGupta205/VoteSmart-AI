"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { states } from "@/data/states";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const timeSlots = [
  { time: "7:00 AM – 9:00 AM", crowd: "Low 🟢", rec: "Best window", tip: "Booths just opened. Minimal queues. Ideal for seniors, first-timers, and those with mobility needs.", badge: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  { time: "9:00 AM – 12:00 PM", crowd: "Medium 🟡", rec: "Good option", tip: "Moderate footfall. Most people have left for work by now. Queues are manageable.", badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  { time: "12:00 PM – 3:00 PM", crowd: "Low 🟢", rec: "Hidden gem", tip: "Post-lunch lull. Many people take a break. Second-best window after early morning.", badge: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  { time: "3:00 PM – 6:00 PM", crowd: "High 🔴", rec: "Avoid if possible", tip: "Evening rush begins. Office-goers and late voters arrive. Long queues likely. Go early if you can.", badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
];

const boothSteps = [
  { icon: "🔍", title: "Search Electoral Roll", desc: "Visit electoralsearch.eci.gov.in. Search by name & DOB. Note your Part Number and Serial Number — you'll need these to find your booth." },
  { icon: "🏛️", title: "Find Your Booth Number", desc: "Your Part Number corresponds to a specific polling station. The portal shows the full address and Booth Number." },
  { icon: "🗺️", title: "Get Directions", desc: "Click the Maps button below to get directions to your booth. Alternatively, search for 'Polling Booth [Part Number] [Your District]' on Google Maps." },
  { icon: "📄", title: "Get Voter Slip", desc: "BLOs distribute Voter Information Slips before election day. This slip has your booth address pre-printed. Check if you've received one." },
  { icon: "✅", title: "Confirm on Election Day", desc: "Carry your slip + ID. Reach the booth, join the queue for your serial number range, and proceed to vote." },
];

export default function PollingPage() {
  const { selectedState, selectedDistrict, setSelectedState, setSelectedDistrict } = useStore();
  const [showGuide, setShowGuide] = useState(false);

  const stateInfo = states.find((s) => s.code === selectedState);

  const mapsQuery = selectedDistrict
    ? `polling booth ${selectedDistrict} ${stateInfo?.name || ""}`
    : selectedState
    ? `polling booth ${stateInfo?.name || ""}`
    : "polling booth india";

  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(mapsQuery)}`;

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-accent-50 text-accent-500 text-xs font-black uppercase tracking-widest border border-accent-50">
          📍 Polling Guidance
        </m.div>
        <h1 className="text-4xl font-black font-display tracking-tight">Find Your <span className="gradient-text">Polling Booth</span></h1>
        <p className="text-muted-foreground mt-3 text-lg font-light max-w-lg mx-auto">Step-by-step guide to locate your booth, plus the best time to vote.</p>
      </div>

      {/* State/District selector */}
      <Card className="border-2 border-accent-50 dark:border-gray-800 shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Your State / UT</label>
              <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground font-medium focus:outline-none focus:border-brand-400 text-sm">
                <option value="">-- Select state --</option>
                {states.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Your District</label>
              <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedState}
                className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-background text-foreground font-medium focus:outline-none focus:border-brand-400 text-sm disabled:opacity-50">
                <option value="">-- Select district --</option>
                {stateInfo?.districts.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <Button onClick={() => setShowGuide(true)} disabled={!selectedState} className="flex-1 h-12 rounded-xl font-bold">
              Show Step-by-Step Guide →
            </Button>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex-1">
              <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-2 hover:bg-accent-50">
                🗺️ Open in Google Maps
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-step guide and Map */}
      <AnimatePresence>
        {showGuide && (
          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  How to find your polling booth
                  {stateInfo && <span className="text-brand-500 ml-2">— {stateInfo.name}</span>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-8">
                {boothSteps.map((step, i) => (
                  <m.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{step.icon}</span>
                    <div>
                      <p className="font-bold text-sm">{step.title}</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </m.div>
                ))}
                <div className="flex gap-3 pt-2">
                  <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noreferrer" className="flex-1">
                    <Button className="w-full h-11 rounded-xl font-bold bg-brand-500 hover:bg-brand-600">Find on Electoral Search →</Button>
                  </a>
                  <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full h-11 rounded-xl font-bold border-2">Open App →</Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map Embed */}
            <Card className="border-2 border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl overflow-hidden">
              <div className="w-full h-full min-h-[400px] relative bg-gray-100 dark:bg-gray-900">
                <iframe
                  width="100%"
                  height="100%"
                  className="absolute inset-0"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyDj58BGR3qdvoTqBNpWFUda-5YXXV-CEqg&q=${encodeURIComponent(mapsQuery)}`}
                  title="Official Polling Booth Locations - Google Maps"
                  aria-label="Interactive map showing polling booths in your selected district"
                />
                <div className="absolute top-4 left-4 right-4 pointer-events-none">
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-lg inline-block pointer-events-auto">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Current Search</p>
                    <p className="text-xs font-bold text-foreground">{mapsQuery}</p>
                  </div>
                </div>
              </div>
            </Card>
          </m.div>
        )}
      </AnimatePresence>

      {/* Voting Day Strategy */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-black font-display">⏱️ Voting Day Strategy</h2>
          <p className="text-muted-foreground mt-1">Pick the best time to vote based on general crowd patterns.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {timeSlots.map((slot, i) => (
            <m.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`p-5 rounded-2xl border-2 ${i === 0 || i === 2 ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20" : i === 3 ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20" : "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20"}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-black text-lg">{slot.time}</p>
                  <p className="text-sm font-bold text-muted-foreground mt-0.5">{slot.crowd}</p>
                </div>
                <span className={`text-xs font-black px-3 py-1 rounded-full ${slot.badge}`}>{slot.rec}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{slot.tip}</p>
            </m.div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 text-sm text-brand-700 dark:text-brand-300 font-medium">
          💡 <strong>Pro tip:</strong> If you arrive within 30 minutes of booth closing time and are already in the queue, you MUST be allowed to vote by law.
        </div>
      </div>
    </div>
  );
}

