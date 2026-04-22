import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_API_KEY) {
  console.warn("GOOGLE_API_KEY is not defined in environment variables");
}

export const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "dummy_key");
