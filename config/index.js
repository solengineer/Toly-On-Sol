import dotenv from "dotenv";
import defaults from "./default.json" assert { type: "json" };

dotenv.config();

const config = {
  port: Number(process.env.PORT || defaults.port),
  wsPath: process.env.WS_PATH || defaults.wsPath,
  apiBase: process.env.API_BASE || defaults.apiBase,
  model: process.env.CLAUDE_MODEL || defaults.model,
  claudeApiKey: process.env.CLAUDE_API_KEY || ""
};

export default config;
