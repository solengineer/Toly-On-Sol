# Usage

## REST
POST /api/chat

Body:
{
  "message": "Hello Toly"
}

Response:
{
  "reply": "..."
}

## WebSocket
Connect to WS_PATH and send plain text messages. The server replies with JSON payloads.
