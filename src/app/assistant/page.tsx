"use client";

import { useState, useRef, useEffect } from "react";
import { useChat, UIMessage } from "@ai-sdk/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { trackEvent, APP_EVENTS } from "@/lib/analytics";

interface ISpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: { results: { [k: number]: { [k: number]: { transcript: string } } } }) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

const INSTANT_RESPONSES: Record<string, string> = {
  "How to vote?": `Here's the complete voting process in India:\n\n1️⃣ **Find your polling booth** — Search on electoralsearch.eci.gov.in using your name and date of birth.\n\n2️⃣ **Carry your ID** — Bring your Voter ID (EPIC) or any alternate valid ID: Aadhaar, PAN, Passport, Driving License.\n\n3️⃣ **At the booth** — Join the queue. The polling officer verifies your ID and inks your finger.\n\n4️⃣ **In the voting compartment** — Press the blue button next to your chosen candidate on the EVM. A beep confirms your vote.\n\n5️⃣ **VVPAT confirmation** — A paper slip appears for 7 seconds showing your vote. This confirms it was recorded correctly.\n\n✅ You're done! The whole process takes 5–10 minutes.`,

  "What to carry?": `On voting day, carry these:\n\n✅ **Primary ID (any one):**\n• Voter ID Card (EPIC) — physical or e-EPIC on phone\n• Aadhaar Card (or m-Aadhaar app)\n• PAN Card\n• Passport\n• Driving License (must be valid)\n• MNREGA Job Card\n• Bank/Post Office Passbook with photo\n\n✅ **Optional but helpful:**\n• Voter Information Slip (distributed by BLO before election)\n• Your Part Number and Serial Number from electoral roll\n\n❌ **Do NOT bring:**\n• Mobile phones (not allowed inside voting compartment)\n• Photocopies of documents\n• Expired IDs\n• Food or campaign material`,

  "What if my name is missing?": `If your name is not on the electoral roll, here's what to do:\n\n🔍 **First, double-check:**\nTry different spellings of your name on electoralsearch.eci.gov.in. Sometimes names are recorded slightly differently.\n\n📋 **If confirmed missing — File Form 6:**\n1. Go to voters.eci.gov.in\n2. Click "New Registration (Form 6)"\n3. Fill in your details and upload age + address proof\n4. Submit and note your Application Reference ID\n\n⏱️ **Timeline:** 15–30 days for approval. Your name will be added to the electoral roll.\n\n🚨 **Urgent before election?**\nIf the election is nearby and registration is closed, unfortunately you cannot vote this time. But register now so you're ready for the next one.\n\nNeed step-by-step help? Visit /solve → "My name is missing"`,

  "First time voter guide": `Welcome to your first election! 🌟 Here's everything you need:\n\n**Step 1: Confirm you're registered**\nSearch your name on electoralsearch.eci.gov.in — many 18-year-olds are auto-added.\n\n**Step 2: Get your Voter ID**\nDownload e-EPIC from voters.eci.gov.in. Or use Aadhaar/PAN if your name is on the roll.\n\n**Step 3: Find your booth**\nYour Part Number (from electoral search) tells you exactly which building to go to.\n\n**Step 4: Practice the process**\nUse our Voting Simulator at /simulate — takes 2 minutes, builds huge confidence.\n\n**Step 5: On the day**\n• Arrive at 7–9 AM (least crowd)\n• Carry your ID\n• Press ONE blue button on the EVM\n• Wait 7 seconds for VVPAT confirmation\n\nYou're ready! Visit /first-time for the full guided journey. 🗳️`,
};

const quickReplies = [
  "How to vote?",
  "What to carry?",
  "What if my name is missing?",
  "First time voter guide",
];

export default function AssistantPage() {
  const { messages, setMessages, sendMessage, status } = useChat({
    messages: [
      { id: "1", role: "assistant", parts: [{ type: "text", text: "Hello! I am the VoteSmart AI Civic Companion. Ask me anything about the Indian election process, voter eligibility, EVMs, or polling booths.\n\nOr pick a quick question below! ⬇️" }] } as UIMessage
    ]
  });

  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";
  const [isListening, setIsListening] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined" && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      // @ts-expect-error Web Speech API types are not standard
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.onresult = (event) => {
          setInput(event.results[0][0].transcript);
          setIsListening(false);
        };
        recognitionRef.current.onerror = () => setIsListening(false);
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); }
    else { recognitionRef.current?.start(); setIsListening(true); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input;
    trackEvent(APP_EVENTS.CHAT_QUERY, { query: text, type: "manual_input" });
    setInput("");
    if (sendMessage) {
      await sendMessage({ text });
    }
  };

  const handleQuickReply = (qr: string) => {
    trackEvent(APP_EVENTS.CHAT_QUERY, { query: qr, type: "quick_action" });
    const instant = INSTANT_RESPONSES[qr];
    if (instant) {
      const userMsgId = `user-${messages.length}-${Math.random().toString(36).slice(2, 9)}`;
      const aiMsgId = `ai-${messages.length}-${Math.random().toString(36).slice(2, 9)}`;
      setMessages([
        ...messages,
        { id: userMsgId, role: "user", parts: [{ type: "text", text: qr }] } as UIMessage,
        { id: aiMsgId, role: "assistant", parts: [{ type: "text", text: instant }] } as UIMessage
      ]);
    } else {
      setInput(qr);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto p-4 md:p-6 lg:p-8 w-full">
      <div className="mb-6 text-center">
        <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 mb-3 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-widest border border-brand-100">
          24/7 Neutral AI Companion
        </m.div>
        <h1 className="text-4xl font-black font-display tracking-tight text-foreground sm:text-5xl">
          Civic <span className="gradient-text">Assistant</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-lg font-light">Ask anything about India&apos;s electoral process — voice support included</p>
      </div>

      <Card className="flex-grow flex flex-col overflow-hidden glass border-white/20 shadow-premium rounded-2xl mb-4">
        <CardContent className="flex-grow overflow-y-auto p-4 md:p-8 space-y-6 flex flex-col scrollbar-thin scrollbar-thumb-brand-100">
          <AnimatePresence>
            {messages.map((msg) => (
              <m.div key={msg.id} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] md:max-w-[75%] p-5 rounded-2xl shadow-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white rounded-tr-sm'
                    : 'bg-white/90 dark:bg-slate-800/90 text-gray-900 dark:text-white border border-brand-100/30 rounded-tl-sm'
                }`}>
                  <div className="flex items-center gap-2 mb-2 opacity-70">
                    <span className="text-[10px] font-black uppercase tracking-widest">{msg.role === 'user' ? 'You' : '🤖 Assistant'}</span>
                  </div>
                  <div className="text-[15px] whitespace-pre-wrap leading-relaxed space-y-2">
                    {msg.parts.map((part) => (part.type === 'text' ? part.text : null))}
                  </div>
                </div>
              </m.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white/50 dark:bg-slate-900/50 p-4 rounded-2xl rounded-tl-sm w-20 flex justify-center items-center gap-1.5 border border-brand-50/50">
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              </div>
            </m.div>
          )}
          <div ref={endOfMessagesRef} className="h-4" />
        </CardContent>

        <div className="p-4 md:p-6 glass border-t border-white/20 bg-white/40 dark:bg-slate-950/40">
          {/* Quick actions */}
          <div className="flex gap-2 pb-4 overflow-x-auto no-scrollbar">
            {quickReplies.map((qr) => (
              <Button key={qr} variant="outline" size="sm" onClick={() => handleQuickReply(qr)}
                className="whitespace-nowrap text-xs font-bold rounded-xl glass border-brand-100/50 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all duration-300 flex-shrink-0">
                {qr}
              </Button>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Button type="button" variant="outline" onClick={toggleListening}
              className={cn("rounded-xl w-14 h-14 flex items-center justify-center text-xl transition-all flex-shrink-0",
                isListening ? "bg-red-500 text-white border-red-500 animate-pulse shadow-lg shadow-red-500/30" : "glass border-brand-100/50 hover:bg-brand-50")}
              title={isListening ? "Stop listening" : "Voice Input"}
              aria-label={isListening ? "Stop voice input" : "Start voice input"}>
              {isListening ? "⏹️" : "🎙️"}
            </Button>
            <div className="relative flex-grow">
              <Input value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about voting..."
                className="w-full h-14 pl-6 pr-16 rounded-xl glass border-brand-100/50 shadow-inner focus:ring-brand-500"
                disabled={isLoading || isListening} 
                aria-label="Chat input field" />
              <Button type="submit" disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 h-10 w-10 p-0 rounded-lg bg-brand-600 hover:bg-brand-700 transition-transform active:scale-95"
                aria-label="Send message">
                <span className="text-xl" aria-hidden="true">➔</span>
              </Button>
            </div>
          </form>
          <p className="text-center mt-3 text-[10px] text-muted-foreground/60 uppercase font-black tracking-widest">
            Verified by Election Information Model • AI can occasionally be incorrect
          </p>
        </div>
      </Card>
    </div>
  );
}
