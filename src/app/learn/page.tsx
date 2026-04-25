"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const topics = [
  { id: 1, title: "What is an EVM?", content: "EVM stands for Electronic Voting Machine. It replaces paper ballots for reliable, quick, and secure voting. It has two units: Control Unit and Ballot Unit." },
  { id: 2, title: "What is VVPAT?", content: "Voter Verifiable Paper Audit Trail. It prints a slip visible for 7 seconds behind a glass window to confirm your vote was cast correctly before dropping into a sealed box." },
  { id: 3, title: "What is NOTA?", content: "None Of The Above. An option on the EVM indicating disapproval of all candidates. It is counted as a valid vote but does not affect the election result." },
  { id: 4, title: "Who can Vote?", content: "Any Indian citizen aged 18 years or above (as of qualifying date) with a valid Voter ID and whose name appears on the electoral roll of their constituency." },
  { id: 5, title: "What is the ECI?", content: "The Election Commission of India. An autonomous constitutional authority responsible for administering election processes in India at national and state levels." },
  { id: 6, title: "Model Code of Conduct (MCC)", content: "A set of guidelines issued by the ECI for political parties and candidates to ensure free and fair elections. It comes into effect as soon as the election schedule is announced." },
  { id: 7, title: "What is Form 6?", content: "The application form for new voters to get registered in the electoral roll for the first time, or for voters shifting to a new constituency." },
  { id: 8, title: "What is Form 8?", content: "The application form used for correction of entries in the electoral roll (like wrong name, age, address) or for replacement of EPIC without change of address." },
  { id: 9, title: "Lok Sabha vs Vidhan Sabha", content: "Lok Sabha elections are for the national Parliament to choose the Prime Minister's government. Vidhan Sabha elections are for State Legislative Assemblies to choose the Chief Minister." },
  { id: 10, title: "Indelible Ink", content: "The purple ink applied to the voter's left index finger at the polling booth. It prevents multiple voting and is a visible mark of having exercised your franchise." },
  { id: 11, title: "What is e-EPIC?", content: "Electronic Electoral Photo Identity Card. It is a secure, non-editable portable document format (PDF) version of the Voter ID card that you can download on your mobile." },
  { id: 12, title: "Voter Information Slip", content: "A slip distributed by the Booth Level Officer (BLO) before the election. It contains your Part Number, Serial Number, and Polling Station address." },
  { id: 13, title: "Postal Ballot", content: "A facility allowing certain voters (like armed forces personnel, essential service workers, and voters above 85 years) to vote by mail instead of going to a polling booth." },
  { id: 14, title: "Proxy Voting", content: "A facility available specifically for Service Voters (armed forces), allowing them to nominate a resident of their constituency to vote on their behalf." },
  { id: 15, title: "Election Expenditure Limit", content: "The legal maximum amount a candidate can spend on their election campaign. The ECI monitors this strictly to ensure a level playing field." }
];

export default function LearnPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextFlashcard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % topics.length);
    }, 150);
  };

  const prevFlashcard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + topics.length) % topics.length);
    }, 150);
  };

  const currentTopic = topics[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="mb-8 text-center max-w-lg">
        <h1 className="text-3xl font-bold font-display text-brand-600">Micro-Learning</h1>
        <p className="text-muted-foreground mt-2">Flip the cards to learn essential voting concepts.</p>
      </div>

      <div className="w-full max-w-md perspective-1000" onClick={() => setFlipped(!flipped)}>
        <AnimatePresence mode="wait">
          <m.div
            key={currentIndex + (flipped ? "flip" : "front")}
            initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Card className={`h-64 flex items-center justify-center p-6 text-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow ${flipped ? 'bg-brand-50 dark:bg-brand-900/80 border-brand-200 dark:border-brand-700' : 'bg-white dark:bg-slate-900'}`}>
              <CardContent className="p-0">
                {!flipped ? (
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{currentTopic.title}</h2>
                ) : (
                  <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">{currentTopic.content}</p>
                )}
                <p className="absolute bottom-4 left-0 right-0 text-xs text-muted-foreground flex justify-center items-center gap-1">
                  Tap to flip <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.90321 8.5H13.0968C13.56 8.5 13.9355 8.12452 13.9355 7.66129V3.53226C13.9355 3.06903 13.56 2.69355 13.0968 2.69355H1.90321C1.44 2.69355 1.06452 3.06903 1.06452 3.53226V7.66129C1.06452 8.12452 1.44 8.5 1.90321 8.5ZM13.0968 1.5C14.2185 1.5 15.129 2.41051 15.129 3.53226V7.66129C15.129 8.78304 14.2185 9.69355 13.0968 9.69355H8.08381C7.81846 9.69355 7.56453 9.79975 7.3768 9.98748L4.62915 12.7351C4.30154 13.0627 3.74194 12.8306 3.74194 12.3674V9.69355H1.90321C0.781467 9.69355 -0.129032 8.78304 -0.129032 7.66129V3.53226C-0.129032 2.41051 0.781467 1.5 1.90321 1.5H13.0968Z" fill="currentColor"></path></svg>
                </p>
              </CardContent>
            </Card>
          </m.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={prevFlashcard}>Previous</Button>
        <div className="flex items-center text-sm font-medium text-muted-foreground w-16 justify-center">
          {currentIndex + 1} / {topics.length}
        </div>
        <Button onClick={nextFlashcard}>Next Card</Button>
      </div>
    </div>
  );
}
