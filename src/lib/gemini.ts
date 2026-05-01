/**
 * Google Generative AI Configuration
 * 
 * Provides the initialized Gemini SDK instance for use across the application.
 * Requires GOOGLE_API_KEY to be set in environment variables.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GOOGLE_API_KEY) {
  console.warn("GOOGLE_API_KEY is not defined in environment variables");
}

/**
 * Global Gemini instance
 */
export const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "dummy_key");
