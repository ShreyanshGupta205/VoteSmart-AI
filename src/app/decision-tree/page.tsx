"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Node = {
  id: string;
  question: string;
  options: { label: string; nextId: string }[];
  result?: string;
  resultType?: "success" | "warning" | "info";
  link?: string;
  linkText?: string;
  internalLink?: string;
  internalLinkText?: string;
};

const treeData: Record<string, Node> = {
  start: {
    id: "start",
    question: "Are you an Indian citizen?",
    options: [
      { label: "Yes ✓", nextId: "age" },
      { label: "No ✗", nextId: "not_eligible_citizen" },
    ],
  },
  not_eligible_citizen: {
    id: "not_eligible_citizen",
    question: "",
    options: [],
    result: "Only Indian citizens are eligible to vote in Indian elections. If you are an Overseas Citizen of India (OCI), you are also not eligible to vote.",
    resultType: "warning",
    link: "/learn",
    linkText: "Learn about Indian Elections",
  },
  age: {
    id: "age",
    question: "Are you 18 years of age or older (as of Jan 1st of the election year)?",
    options: [
      { label: "Yes, I'm 18+", nextId: "registered" },
      { label: "No, under 18", nextId: "not_eligible_age" },
    ],
  },
  not_eligible_age: {
    id: "not_eligible_age",
    question: "",
    options: [],
    result: "You must be 18+ to vote. You can pre-register when you are close to turning 18 so your name is added on the qualifying date.",
    resultType: "info",
    link: "https://voters.eci.gov.in/",
    linkText: "Check Pre-registration on ECI →",
  },
  registered: {
    id: "registered",
    question: "Is your name on the electoral roll (voter list)?",
    options: [
      { label: "Yes, I'm registered", nextId: "have_id" },
      { label: "I applied but not sure", nextId: "check_status" },
      { label: "Not registered yet", nextId: "register_form6" },
      { label: "I'm not sure", nextId: "check_roll" },
    ],
  },
  check_roll: {
    id: "check_roll",
    question: "",
    options: [],
    result: "Search your name on electoralsearch.eci.gov.in using your name and date of birth. It takes 2 minutes and tells you if you're registered.",
    resultType: "info",
    link: "https://electoralsearch.eci.gov.in/",
    linkText: "Search Electoral Roll →",
    internalLink: "/status",
    internalLinkText: "Guided Status Checker →",
  },
  check_status: {
    id: "check_status",
    question: "",
    options: [],
    result: "You can check your application status using your Application Reference ID. If approved, you can also download an e-EPIC (digital Voter ID).",
    resultType: "info",
    link: "https://voters.eci.gov.in/",
    linkText: "Track Application on ECI →",
    internalLink: "/status",
    internalLinkText: "Guided Status Checker →",
  },
  register_form6: {
    id: "register_form6",
    question: "",
    options: [],
    result: "Register using Form 6 on the Voter Services Portal. You'll need age proof, address proof, and a photo. Takes about 15–30 days to process.",
    resultType: "info",
    link: "https://voters.eci.gov.in/",
    linkText: "Apply via Form 6 →",
    internalLink: "/solve?problem=name-missing",
    internalLinkText: "Step-by-Step Guide →",
  },
  have_id: {
    id: "have_id",
    question: "Do you have a Voter ID card (EPIC) or another valid alternate ID?",
    options: [
      { label: "Yes, I have Voter ID", nextId: "ready" },
      { label: "I have Aadhaar / PAN / other", nextId: "alternate_id" },
      { label: "I have no ID at all", nextId: "no_id" },
      { label: "I lost my Voter ID", nextId: "lost_id" },
    ],
  },
  alternate_id: {
    id: "alternate_id",
    question: "",
    options: [],
    result: "Great! If your name is on the electoral roll, you can vote using Aadhaar, PAN Card, Passport, Driving License, or 7 other approved IDs. No Voter ID required.",
    resultType: "success",
    internalLink: "/documents",
    internalLinkText: "See All Valid Alternate IDs →",
  },
  no_id: {
    id: "no_id",
    question: "",
    options: [],
    result: "If your name is on the roll, you can still vote using 11 types of alternate IDs including Aadhaar and PAN. Check which ones are valid at the booth.",
    resultType: "warning",
    internalLink: "/documents",
    internalLinkText: "Check Valid Documents →",
  },
  lost_id: {
    id: "lost_id",
    question: "Have you moved to a new city/state since you registered?",
    options: [
      { label: "No, same address", nextId: "download_epic" },
      { label: "Yes, I moved", nextId: "moved_city" },
    ],
  },
  download_epic: {
    id: "download_epic",
    question: "",
    options: [],
    result: "You can download a free digital copy of your Voter ID (e-EPIC) from voters.eci.gov.in using your EPIC number or mobile OTP. No physical card needed.",
    resultType: "success",
    link: "https://voters.eci.gov.in/",
    linkText: "Download e-EPIC →",
  },
  moved_city: {
    id: "moved_city",
    question: "",
    options: [],
    result: "If you've moved, you need to update your address using Form 8A. You can still vote at your old booth if you haven't updated yet, but updating is recommended.",
    resultType: "info",
    link: "https://voters.eci.gov.in/",
    linkText: "Update Address (Form 8A) →",
    internalLink: "/recover",
    internalLinkText: "Correction Guide →",
  },
  ready: {
    id: "ready",
    question: "",
    options: [],
    result: "🎉 You are fully eligible and ready to vote! Check your polling booth details and keep your Voter ID ready. See you at the booth!",
    resultType: "success",
    internalLink: "/checklist",
    internalLinkText: "Complete My Readiness Checklist →",
  },
};

const resultStyles = {
  success: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800",
  warning: "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200 dark:border-orange-800",
  info: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800",
};

export default function DecisionTreePage() {
  const [history, setHistory] = useState<string[]>(["start"]);
  const currentNodeId = history[history.length - 1];
  const currentNode = treeData[currentNodeId];

  const handleOption = (nextId: string) => setHistory([...history, nextId]);
  const handleBack = () => { if (history.length > 1) setHistory(history.slice(0, -1)); };
  const reset = () => setHistory(["start"]);

  // Breadcrumb labels
  const breadcrumb = history.map((id) => {
    const node = treeData[id];
    if (id === "start") return "Start";
    if (!node.question) return (node.result ? node.result.slice(0, 20) + "…" : id);
    return node.question.length > 30 ? node.question.slice(0, 30) + "…" : node.question;
  });

  const isResult = !currentNode.question;
  const resultStyle = currentNode.resultType ? resultStyles[currentNode.resultType] : resultStyles.info;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display text-brand-700">Am I Eligible to Vote?</h1>
          <p className="text-muted-foreground mt-2">Answer a few quick questions to find out your status and next steps.</p>
        </div>

        {/* Breadcrumb trail */}
        {history.length > 1 && (
          <nav aria-label="Progress" className="flex items-center gap-1 overflow-x-auto no-scrollbar mb-5 pb-1">
            {breadcrumb.map((label, i) => (
              <span key={i} className="flex items-center gap-1 flex-shrink-0">
                {i > 0 && <span className="text-muted-foreground text-xs" aria-hidden="true">›</span>}
                <button
                  onClick={() => i < history.length - 1 ? setHistory(history.slice(0, i + 1)) : undefined}
                  aria-current={i === history.length - 1 ? "page" : undefined}
                  className={`text-xs px-2 py-1 rounded-lg transition-colors ${i === history.length - 1 ? "bg-brand-100 text-brand-700 font-bold" : "text-muted-foreground hover:text-brand-600 cursor-pointer"}`}
                >
                  {label}
                </button>
              </span>
            ))}
          </nav>
        )}

        <Card className="shadow-lg border-brand-200 min-h-[300px] flex flex-col">
          <CardContent className="flex-grow flex flex-col justify-center p-8 text-center relative">
            {history.length > 1 && (
              <Button variant="ghost" size="sm" onClick={handleBack} className="absolute top-4 left-4 text-muted-foreground hover:text-brand-600">
                ← Back
              </Button>
            )}

            <AnimatePresence mode="wait">
              <m.div
                key={currentNodeId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {currentNode.question ? (
                  <>
                    {/* Step counter */}
                    <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">
                      Question {history.length} of ~5
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-foreground">{currentNode.question}</h2>
                    <div className="flex flex-col gap-3">
                      {currentNode.options.map((option) => (
                        <Button
                          key={option.label}
                          size="lg"
                          variant="outline"
                          onClick={() => handleOption(option.nextId)}
                          className="w-full text-left justify-start px-6 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 transition-all duration-200 font-medium h-12"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={`rounded-2xl border-2 bg-gradient-to-br ${resultStyle} p-6 text-left`} aria-live="polite">
                    <h2 className="text-xl font-bold mb-3 text-foreground">Result</h2>
                    <p className="text-base text-foreground leading-relaxed mb-6">{currentNode.result}</p>
                    <div className="flex flex-col gap-3">
                      {currentNode.link && (
                        <a href={currentNode.link} target={currentNode.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                          <Button size="lg" className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl">
                            {currentNode.linkText}
                          </Button>
                        </a>
                      )}
                      {currentNode.internalLink && (
                        <Link href={currentNode.internalLink}>
                          <Button size="lg" variant="outline" className="w-full font-bold rounded-xl border-2">
                            {currentNode.internalLinkText}
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" onClick={reset} className="text-muted-foreground hover:text-brand-600 mt-2">
                        ↩ Start Over
                      </Button>
                    </div>
                  </div>
                )}
              </m.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {history.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === history.length - 1 ? "bg-brand-500 w-6" : "bg-gray-200 dark:bg-gray-700"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
