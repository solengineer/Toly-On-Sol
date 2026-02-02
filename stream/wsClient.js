import WebSocket from "ws";
import config from "../config/index.js";

const wsUrl = config.apiBase.replace("http", "ws") + config.wsPath;
const ws = new WebSocket(wsUrl);

ws.on("open", () => {
  console.log("Connected to Toly");
  ws.send("Hey Toly! Introduce yourself.");
});

ws.on("message", (data) => {
  console.log("Toly:", data.toString());
});

ws.on("close", () => {
  console.log("Disconnected");
});
