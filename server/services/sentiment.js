const vader = require("vader-sentiment");

function analyzeSentiment(text) {
  const loweredText = text.toLowerCase();
  const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  const compound = intensity.compound;

  return {
    sentiment:
      compound > 0.2 ? "positive" : compound < -0.2 ? "negative" : "neutral",
    score: compound,
  };
}

module.exports = { analyzeSentiment };
