import fs from "fs";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_DIR = path.resolve(__dirname, "../logs");
const LOG_FILE = path.join(LOG_DIR, "delivery-confirmations.log");

const ensureLogDir = () => {
  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
  } catch (error) {
    console.warn("⚠️ Unable to create log directory:", error.message);
  }
};

export const notifyDeveloper = async (event, payload = {}) => {
  const entry = {
    event,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  try {
    ensureLogDir();
    fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n", "utf8");
  } catch (error) {
    console.warn("⚠️ Unable to write delivery log:", error.message);
  }

  const webhookUrl = process.env.DEV_NOTIFICATION_WEBHOOK;
  if (!webhookUrl) {
    return;
  }

  try {
    await axios.post(webhookUrl, entry, { timeout: 5000 });
  } catch (error) {
    console.error("❌ Failed to send developer notification:", error.message);
  }
};

