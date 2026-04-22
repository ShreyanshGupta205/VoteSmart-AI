"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Node = {
  id: string;
  question: string;
  options: { label: string; nextId: string }[];
  result?: string;
  link?: string;
  linkText?: string;
};

const treeData: Record<string, Node> = {
  "start": {
    id: "start",
    question: "Are you an Indian citizen?",
    options: [
      { label: "Yes", nextId: "age" },
      { label: "No", nextId: "not_eligible_citizen" }
    ]
  },
  "not_eligible_citizen": {
    id: "not_eligible_citizen",
    question: "",
    options: [],
    result: "Only Indian citizens are eligible to vote in Indian elections.",
    link: "/learn",
    linkText: "Learn more about Indian Elections"
  },
  "age": {
    id: "age",
    question: "Are you 18 years of age or older (as of Jan 1st of the election year)?",
    options: [
      { label: "Yes", nextId: "voter_id" },
      { label: "No", nextId: "not_eligible_age" }
    ]
  },
  "not_eligible_age": {
    id: "not_eligible_age",
    question: "",
    options: [],
    result: "You must be 18 or older to vote. You can register as a new voter once you turn 18.",
    link: "https://voters.eci.gov.in/",
    linkText: "Check Pre-registration options on ECI"
  },
  "voter_id": {
    id: "voter_id",
    question: "Do you have a Voter ID card (EPIC) and is your name on the electoral roll?",
    options: [
      { label: "Yes", nextId: "ready" },
      { label: "No, but I registered", nextId: "check_status" },
      { label: "No, I haven't registered", nextId: "register_form6" }
    ]
  },
  "check_status": {
    id: "check_status",
    question: "",
    options: [],
    result: "You can check your application status online. If approved, you can download an e-EPIC.",
    link: "https://voters.eci.gov.in/",
    linkText: "Track Application Status"
  },
  "register_form6": {
    id: "register_form6",
    question: "",
    options: [],
    result: "You need to register to vote using Form 6 on the Voter's Services Portal.",
    link: "https://voters.eci.gov.in/",
    linkText: "Apply Online via Form 6"
  },
  "ready": {
    id: "ready",
    question: "",
    options: [],
    result: "You are ready to vote! Make sure to check your polling booth details and the election date for your constituency.",
    link: "/checklist",
    linkText: "Go to Readiness Checklist"
  }
};

export default function DecisionTreePage() {
  const [history, setHistory] = useState<string[]>(["start"]);
  const currentNodeId = history[history.length - 1];
  const currentNode = treeData[currentNodeId];

  const handleOption = (nextId: string) => {
    setHistory([...history, nextId]);
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };

  const reset = () => {
    setHistory(["start"]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-display text-brand-700">Am I Eligible?</h1>
          <p className="text-muted-foreground mt-2">Interactive decision tree to check your voting eligibility and next steps.</p>
        </div>

        <Card className="shadow-lg border-brand-200 min-h-[300px] flex flex-col">
          <CardContent className="flex-grow flex flex-col justify-center p-8 text-center relative">
            {history.length > 1 && (
              <Button variant="ghost" size="sm" onClick={handleBack} className="absolute top-4 left-4 text-muted-foreground">
                ← Back
              </Button>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNodeId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {currentNode.question ? (
                  <>
                    <h2 className="text-2xl font-semibold mb-8 text-foreground">{currentNode.question}</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      {currentNode.options.map(option => (
                        <Button 
                          key={option.label} 
                          size="lg" 
                          onClick={() => handleOption(option.nextId)}
                          className="w-full sm:w-auto"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-brand-700">Result</h2>
                    <p className="text-lg text-foreground mb-8">{currentNode.result}</p>
                    <div className="flex flex-col gap-4 items-center">
                      {currentNode.link && currentNode.link.startsWith("http") ? (
                        <a href={currentNode.link} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                          <Button size="lg" className="w-full text-brand-700 bg-brand-100 hover:bg-brand-200">
                            {currentNode.linkText}
                          </Button>
                        </a>
                      ) : currentNode.link ? (
                        <Link href={currentNode.link} className="w-full sm:w-auto">
                          <Button size="lg" className="w-full text-brand-700 bg-brand-100 hover:bg-brand-200">
                            {currentNode.linkText}
                          </Button>
                        </Link>
                      ) : null}
                      <Button variant="ghost" onClick={reset} className="text-muted-foreground mt-4">
                        Start Over
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
