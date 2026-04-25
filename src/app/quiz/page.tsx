"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";

const quizQuestions = [
  {
    question: "What is the minimum voting age in India?",
    options: ["18 years", "21 years", "25 years", "16 years"],
    correct: 0,
    explanation: "The 61st Amendment Act of 1988 lowered the voting age from 21 to 18 years."
  },
  {
    question: "What does VVPAT stand for?",
    options: [
      "Voter Voting Paper Audit Trail",
      "Voter Verifiable Paper Audit Trail",
      "Voting Verification Paper Audit Trail",
      "Verified Voting Paper Audit Trail"
    ],
    correct: 1,
    explanation: "Voter Verifiable Paper Audit Trail ensures your vote goes to the intended candidate."
  },
  {
    question: "Who conducts the general elections in India?",
    options: ["Supreme Court", "Parliament", "Election Commission of India", "President"],
    correct: 2,
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India."
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6 h-[calc(100vh-4rem)] flex flex-col justify-center">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold font-display text-brand-600">Civic Quiz</h1>
        <p className="text-muted-foreground mt-1">Test your election knowledge</p>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <m.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card className="border-brand-200">
              <CardHeader className="bg-brand-50/50 dark:bg-brand-900/10 border-b border-border">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span>Score: {score}</span>
                </div>
                <CardTitle className="text-xl">{quizQuestions[currentQuestion].question}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid gap-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => {
                    let btnClass = "border-gray-200 justify-start h-auto py-3 px-4 text-left font-normal";
                    
                    if (isAnswered) {
                      if (index === quizQuestions[currentQuestion].correct) {
                        btnClass += " bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-400";
                      } else if (index === selectedOption) {
                        btnClass += " bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-400";
                      } else {
                        btnClass += " opacity-50";
                      }
                    } else if (selectedOption === index) {
                      btnClass += " border-brand-500 ring-2 ring-brand-500 ring-offset-2";
                    }

                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className={btnClass}
                        onClick={() => handleOptionSelect(index)}
                        disabled={isAnswered && index !== selectedOption && index !== quizQuestions[currentQuestion].correct}
                      >
                        <span className="w-6 h-6 rounded border flex items-center justify-center mr-3 flex-shrink-0">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                      </Button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <m.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-6 p-4 bg-brand-50 rounded-lg border border-brand-100 text-sm text-brand-800 dark:bg-brand-900/20 dark:text-brand-300">
                    <p className="font-semibold mb-1">Explanation:</p>
                    <p>{quizQuestions[currentQuestion].explanation}</p>
                    <Button onClick={nextQuestion} className="w-full mt-4">
                      {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                    </Button>
                  </m.div>
                )}
              </CardContent>
            </Card>
          </m.div>
        ) : (
          <m.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="text-center p-8 border-brand-200 bg-brand-50 dark:bg-brand-900/10">
              <CardContent className="space-y-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <span className="text-4xl font-bold text-brand-600">{score}/{quizQuestions.length}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Quiz Completed!</h2>
                <p className="text-muted-foreground">
                  {score === quizQuestions.length ? "Perfect! You know your stuff." : "Great effort! Keep learning."}
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <Button variant="outline" onClick={() => {setCurrentQuestion(0); setScore(0); setShowResult(false); setIsAnswered(false);}}>
                    Retake Quiz
                  </Button>
                  <Link href="/dashboard">
                    <Button>Back to Dashboard</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
