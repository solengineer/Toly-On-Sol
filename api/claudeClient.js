import config from "../config/index.js";
import fs from "fs";
import path from "path";

const systemPrompt = fs.readFileSync(
  path.join(process.cwd(), "agent", "systemPrompt.txt"),
  "utf-8"
);

export async function callClaude({ userMessage, memory }) {
  if (!config.claudeApiKey) {
    throw new Error("Missing CLAUDE_API_KEY in environment.");
  }

  const payload = {
    model: config.model,
    max_tokens: 512,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Context memory:\n${JSON.stringify(memory)}\n\nUser: ${userMessage}`
      }
    ]
  };

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": config.claudeApiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const text = data?.content?.[0]?.text || "";
  return text.trim();
}
