import "dotenv/config";
import { generateText, type ModelMessage } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { SYSTEM_PROMPT } from "./system/prompt";
import type { AgentCallbacks } from "../types";
import {tools} from "./tools/index.ts";
import { executeTools } from "./executeTools.ts";
const MODEL_NAME = "stealth/space-bunny-alpha";

const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const runAgent = async (
  userMessage: string,
  conversationHistory: ModelMessage[],
  callbacks: AgentCallbacks,
) => {
  const { text, toolCalls } = await generateText({
    model: openrouter.chat(MODEL_NAME),
    prompt: userMessage,
    system: SYSTEM_PROMPT,
    tools,
  });

  console.log(text, toolCalls);

  toolCalls?.forEach(async (tc) => {
    const result = await executeTools(tc.toolName,tc.input);
    console.log(result);
  });
};

runAgent("what is the current date and time?");