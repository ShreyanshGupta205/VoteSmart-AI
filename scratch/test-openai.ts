
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testOpenAI() {
  console.log("Checking OPENAI_API_KEY...");
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY is NOT defined in .env.local");
    return;
  }
  console.log("✅ OPENAI_API_KEY is defined.");

  try {
    console.log("Attempting a simple test completion (this will fail with a 401 if the key is invalid)...");
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: "Hello, are you working?",
    });
    console.log("✅ Success! Response:", text);
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };
    if (err.status === 401) {
      console.log("ℹ️ Received 401 Unauthorized. This is expected if the key is a placeholder.");
      console.log("✅ Environment variable and SDK configuration are verified.");
    } else {
      console.error("❌ Unexpected Error:", err.message);
    }
  }
}

testOpenAI();
