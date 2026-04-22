"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";

export default function AssistantPage() {
  const { messages, sendMessage, status } = useChat({
    messages: [
      { id: "1", role: "assistant", parts: [{ type: "text", text: "Hello! I am the VoteSmart AI Civic Companion. Ask me anything about the Indian election process, voter eligibility, EVMs, or polling booths." }] }
    ] as any
  });
  
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input;
    setInput("");
    await sendMessage({ text });
  };
  
  const [isListening, setIsListening] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== "undefined" && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: { error: string }) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [setInput]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const quickReplies = [
    "How do I register to vote?",
    "What is VVPAT?",
    "Am I eligible to vote?",
    "Moving to a new city?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto p-4 md:p-6 lg:p-8 w-full">
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-widest border border-brand-100"
        >
          24/7 Neutral AI Companion
        </motion.div>
        <h1 className="text-4xl font-black font-display tracking-tight text-foreground sm:text-5xl">
          Civic <span className="gradient-text">Assistant</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-lg font-light">Ask anything about India&apos;s electoral process with voice support</p>
      </div>

      <Card className="flex-grow flex flex-col overflow-hidden glass border-white/20 shadow-premium rounded-2xl relative">
        <CardContent className="flex-grow overflow-y-auto p-6 space-y-6 flex flex-col scrollbar-thin scrollbar-thumb-brand-100">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl shadow-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white rounded-tr-sm' 
                      : 'bg-white/80 dark:bg-slate-900/80 text-foreground border border-brand-100/30 rounded-tl-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 opacity-70">
                    <span className="text-[10px] font-black uppercase tracking-tighter">
                      {msg.role === 'user' ? 'You' : 'Assistant'}
                    </span>
                  </div>
                  <p className="text-[15px] whitespace-pre-wrap">
                    {msg.parts.map((part: any, i: number) => 
                      part.type === 'text' ? part.text : ''
                    ).join('')}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white/50 dark:bg-slate-900/50 p-4 rounded-2xl rounded-tl-sm w-20 flex justify-center items-center gap-1.5 border border-brand-50/50">
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              </div>
            </motion.div>
          )}
          <div ref={endOfMessagesRef} />
        </CardContent>

        <div className="p-6 glass border-t border-white/20 bg-white/40 dark:bg-slate-950/40">
          <div className="flex gap-2 pb-4 overflow-x-auto scrollbar-hide no-scrollbar">
            {quickReplies.map((qr) => (
              <Button
                key={qr}
                variant="outline"
                size="sm"
                onClick={() => setInput(qr)}
                className="whitespace-nowrap text-xs font-bold rounded-xl glass border-brand-100/50 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all duration-300"
              >
                {qr}
              </Button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-3 relative">
            <Button 
              type="button" 
              variant="outline" 
              onClick={toggleListening}
              className={cn(
                "rounded-xl w-14 h-14 flex items-center justify-center text-xl transition-all",
                isListening 
                  ? "bg-red-500 text-white border-red-500 animate-pulse shadow-lg shadow-red-500/30" 
                  : "glass border-brand-100/50 hover:bg-brand-50"
              )}
              title="Voice Input"
            >
              {isListening ? "⏹️" : "🎙️"}
            </Button>
            <div className="relative flex-grow">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask anything about voting..."
                className="w-full h-14 pl-6 pr-16 rounded-xl glass border-brand-100/50 shadow-inner focus:ring-brand-500"
                disabled={isLoading || isListening}
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 h-10 w-10 p-0 rounded-lg bg-brand-600 hover:bg-brand-700 transition-transform active:scale-95"
              >
                <span className="text-xl">➔</span>
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-[10px] text-muted-foreground/60 uppercase font-black tracking-widest">
              Verified by Election Information Model • AI can occasionally hallucinate
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
