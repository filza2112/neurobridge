const { getGeminiResponse } = require("./gemini");

exports.extractKeywords = async (text) => {
  const prompt = `
You are a smart assistant. The user shared the following text that expresses an emotion.
Your task is to extract the keywords that describe *why* the user is feeling this way. 
These are trigger causes — not emotions themselves.

Return 3 or fewer important words or phrases in JSON format (array of strings).

Text: "${text}"

Triggers:
`;

  const response = await getGeminiResponse(prompt);

  try {
    const match = response.match(/\[.*\]/s);
    if (match) {
      console.log("Gemini raw response:", response);
      return JSON.parse(match[0]);
    }
    throw new Error("Could not parse Gemini response");
  } catch (err) {
    console.error("Keyword extraction failed:", err);
    return [];
  }
};

