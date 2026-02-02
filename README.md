# Toly-On-Sol

Toly is an AI-powered dog character designed for livestream demos. He answers questions in real time with a playful persona and a simple API layer for stream integration.

## Features
- Claude-powered chatbot
- Custom persona + prompt system
- REST + WebSocket APIs for live interactions
- Modular memory system
- Stream integration scaffolding

## Quick Start
1. Copy .env.example to .env and add your Claude API key.
2. Install dependencies.
3. Start the server.

## Structure
- agent/: persona + memory
- api/: backend API
- stream/: livestream tools
- config/: env + model config
- docs/: setup + usage

## Docs
- Setup: docs/SETUP.md
- Usage: docs/USAGE.md
- Architecture: docs/ARCHITECTURE.md