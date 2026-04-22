import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

const SYSTEM_INSTRUCTION = `
You are the VoteSmart AI Civic Companion for Indian citizens.
Your core objective is clear: Educate users about elections, guide them through the voting journey, and maintain 100% political neutrality.
CRITICAL RULES:
- Never ask for or store sensitive personal data (e.g. Voter ID, Aadhaar).
- Never express political bias, endorse parties, or guess election outcomes.
- Provide objective, fact-based educational information about the Indian electoral process (EVMs, VVPAT, eligibility, steps to register).
- Your tone should be encouraging, clear, and simple.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return new Response(JSON.stringify({ error: "Messages are required" }), { status: 400 });
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_INSTRUCTION,
      messages,
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), { status: 500 });
  }
}
