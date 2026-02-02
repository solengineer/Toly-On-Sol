# Toly-On-Sol

Toly is an AI-powered dog character designed for livestream demos. He answers questions in real time with a playful persona and a simple API layer for stream integration. This repo includes a ready-to-run backend, a modular prompt/memory system, and a lightweight WebSocket path so Toly can react live to chat.

## Features
- Claude-powered chatbot
- Custom persona + prompt system
- REST + WebSocket APIs for live interactions
- Modular memory system
- Stream integration scaffolding
- Simple configuration layer (env + JSON)
- Ready for livestream wrappers (Twitch/YouTube/Kick)

## Quick Start
1. Copy .env.example to .env and add your Claude API key.
2. Install dependencies.
3. Start the server.

### Install
```bash
npm install
```

### Run
```bash
npm start
```

### Health Check
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{"status":"ok","name":"toly"}
```

## Structure
- agent/: persona + memory
- api/: backend API
- stream/: livestream tools
- config/: env + model config
- docs/: setup + usage

### agent/
This folder defines Toly’s behavior and memory. The persona is stored in a system prompt and a simple JSON file for quick edits.

Example: agent/systemPrompt.txt
```text
You are Toly, a friendly meme-native dog assistant. Your job is to answer user questions in a helpful, upbeat, and concise way while keeping a playful dog persona.
```

### api/
The API layer exposes both REST and WebSocket endpoints. REST is ideal for simple chat UIs, and WebSocket is ideal for livestream overlays.

Example: POST /api/chat
```bash
curl -X POST http://localhost:3000/api/chat \
	-H "content-type: application/json" \
	-d '{"message":"Salut Toly, tu peux te présenter ?"}'
```

Example response:
```json
{"reply":"Woof ! Moi c’est Toly — un chien IA prêt à aider. Comment je peux t’aider aujourd’hui ?"}
```

### stream/
This is where livestream connectors live. A quick local client is included to test WebSocket replies.

Example: run the test client
```bash
node stream/wsClient.js
```

Expected output:
```text
Connected to Toly
Toly: {"type":"welcome","message":"Toly is ready!"}
Toly: {"type":"reply","message":"..."}
```

## API Reference (short)

### REST
Route: POST /api/chat

Payload:
```json
{"message":"Hello Toly"}
```

Response:
```json
{"reply":"..."}
```

### WebSocket
Connect to /ws (or WS_PATH). Send plain text; receive JSON.

Example client snippet:
```js
import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3000/ws");

ws.on("open", () => {
	ws.send("Yo Toly, tu peux faire une blague ?");
});

ws.on("message", (data) => {
	console.log("Toly:", data.toString());
});
```

## Configuration
The config layer reads from .env and defaults in config/default.json.

Example .env:
```dotenv
CLAUDE_API_KEY=your_api_key_here
CLAUDE_MODEL=claude-3-5-sonnet-latest
PORT=3000
WS_PATH=/ws
API_BASE=http://localhost:3000
```

## Persona Tuning
To change Toly’s style, update the system prompt and personality file:
- agent/systemPrompt.txt
- agent/personality.json

Keep it friendly, concise, and meme-native.

## Docs
- Setup: docs/SETUP.md
- Usage: docs/USAGE.md
- Architecture: docs/ARCHITECTURE.md