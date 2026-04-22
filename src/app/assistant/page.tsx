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
    "Explain Scenario: I moved to a new city.",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 md:p-6 lg:p-8 w-full">
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold font-display text-brand-600">AI Assistant</h1>
        <p className="text-muted-foreground mt-1 text-sm">Your neutral, 24/7 civic companion with Voice Support</p>
      </div>

      <Card className="flex-grow flex flex-col overflow-hidden bg-background/60 shadow-xl border-brand-100">
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 flex flex-col">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-brand-500 text-white rounded-tr-sm' 
                      : 'bg-muted text-foreground border border-border rounded-tl-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
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
              <div className="bg-muted text-muted-foreground p-3 rounded-2xl rounded-tl-sm w-16 flex justify-center items-center gap-1">
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </motion.div>
          )}
          <div ref={endOfMessagesRef} />
        </CardContent>

        <div className="p-4 bg-card border-t border-border">
          <div className="flex gap-2 pb-3 overflow-x-auto scroolbar-hide">
            {quickReplies.map((qr) => (
              <Button
                key={qr}
                variant="outline"
                size="sm"
                onClick={() => setInput(qr)}
                className="whitespace-nowrap text-xs bg-brand-50 hover:bg-brand-100 hover:text-brand-700 border-brand-200"
              >
                {qr}
              </Button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={toggleListening}
              className={isListening ? "bg-red-100 text-red-600 border-red-300" : ""}
              title="Voice Input"
            >
              🎤
            </Button>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything about voting..."
              className="flex-grow shadow-sm"
              disabled={isLoading || isListening}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              Send
            </Button>
          </form>
        </div>
      </Card>
      
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">Disclaimer: AI can make mistakes. For official information, visit <a href="https://eci.gov.in" target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">eci.gov.in</a>.</p>
      </div>
    </div>
  );
}
