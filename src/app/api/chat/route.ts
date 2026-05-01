import { NextRequest } from "next/server";
import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";


const SYSTEM_INSTRUCTION = `
You are the VoteSmart AI Civic Companion for Indian citizens.
Your core objective is clear: Educate users about elections, guide them through the voting journey, and maintain 100% political neutrality.
CRITICAL RULES:
- Never ask for or store sensitive personal data (e.g. Voter ID, Aadhaar).
- Never express political bias, endorse parties, or guess election outcomes.
- Provide objective, fact-based educational information about the Indian electoral process (EVMs, VVPAT, eligibility, steps to register).
- Your tone should be encouraging, clear, and simple.
`;

// Simple in-memory rate limiter (resets on server restart)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: NextRequest) {
  try {
    // 1. Basic Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const limitWindow = 60000; // 1 minute
    const maxRequests = 10;

    const rateData = rateLimitMap.get(ip);
    if (rateData && now - rateData.timestamp < limitWindow) {
      if (rateData.count >= maxRequests) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), { status: 429 });
      }
      rateData.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    // 2. Process Request
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages provided" }), { status: 400 });
    }

    // Security: Limit history length
    if (messages.length > 20) {
      return new Response(JSON.stringify({ error: "Chat history too long" }), { status: 400 });
    }

    // Quality: Check content length of the last message
    const lastMessage = messages[messages.length - 1];
    const lastContent = JSON.stringify(lastMessage.parts || "");
    if (lastContent.length > 2000) {
      return new Response(JSON.stringify({ error: "Message too long" }), { status: 400 });
    }

    // Convert UI messages to model messages
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google("gemini-1.5-flash"),
      system: SYSTEM_INSTRUCTION,
      messages: modelMessages,
      temperature: 0.2, // Low temperature for high neutrality and factual accuracy
      topP: 0.8,
      topK: 40,
      // Enable Google Search grounding for live electoral data accuracy
      providerOptions: {
        google: { useSearchGrounding: true },
      },
    });

    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat" }), { status: 500 });
  }
}
