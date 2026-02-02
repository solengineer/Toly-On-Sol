import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import config from "../config/index.js";
import { addMemory, getMemory } from "../agent/memory.js";
import { callClaude } from "./claudeClient.js";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", name: "toly" });
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    const memory = getMemory();
    const reply = await callClaude({ userMessage: message, memory });
    addMemory({ user: message, toly: reply });
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message || "server error" });
  }
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server, path: config.wsPath });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "welcome", message: "Toly is ready!" }));

  ws.on("message", async (data) => {
    const text = data.toString();

    try {
      const memory = getMemory();
      const reply = await callClaude({ userMessage: text, memory });
      addMemory({ user: text, toly: reply });
      ws.send(JSON.stringify({ type: "reply", message: reply }));
    } catch (err) {
      ws.send(JSON.stringify({ type: "error", message: err.message }));
    }
  });
});

server.listen(config.port, () => {
  console.log(`Toly API running on port ${config.port}`);
});
