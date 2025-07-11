import ChatLog from "../models/ChatLog.js"; // Mongoose model

export async function saveChatToDB(entry) {
  const log = new ChatLog(entry);
  await log.save();
}
