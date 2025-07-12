import { sendEmailAlert } from "../utils/sendEmailAlert.js";
import User from "./models/user";

export async function checkForAlert({ userId, sentiment, score, tone, triggerKeywords }) {
  const user = await User.findById(userId);
  if (!user || !user.alertEmail) return;

  const dangerousMood = score < -0.7 || ["angry", "anxious", "frustrated"].includes(tone);
  if (!dangerousMood) return;

  const subject = `🚨 Mood Alert: ${user.name}`;
  const body = `NeuroBridge Alert:\nUser ${user.name} is showing signs of distress.\n\nSentiment Score: ${score}\nTone: ${tone}\nTrigger: ${triggerKeywords.join(", ")}\n\nPlease check in.`;

  await sendEmailAlert(user.alertEmail, subject, body);
}
