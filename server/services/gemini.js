const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // add to .env

const model = genAI.getGenerativeModel({
  model: "models/gemini-2.0-flash-lite",
});

exports.getGeminiResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    return response;
  } catch (err) {
    console.error("Gemini API error:", err);
    return "⚠️ Sorry, I couldn't generate a response.";
  }
};
