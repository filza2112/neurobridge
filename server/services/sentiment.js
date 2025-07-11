const { pipeline } = require("@xenova/transformers");

let sentimentPipeline;

async function analyzeSentiment(text) {
  if (!sentimentPipeline) {
    sentimentPipeline = await pipeline("sentiment-analysis");
  }

  const result = await sentimentPipeline(text);
  const label = result[0].label.toLowerCase();
  const score = result[0].score;
  return {
    sentiment: label,
    score: label === "positive" ? score : -score,
  };
}

module.exports = { analyzeSentiment };
<<<<<<< HEAD
=======
const { pipeline } = require("@xenova/transformers");

let sentimentPipeline;

async function analyzeSentiment(text) {
  if (!sentimentPipeline) {
    sentimentPipeline = await pipeline("sentiment-analysis");
  }

  const result = await sentimentPipeline(text);
  const label = result[0].label.toLowerCase();
  const score = result[0].score;
  return {
    sentiment: label,
    score: label === "positive" ? score : -score,
  };
}

module.exports = { analyzeSentiment };
>>>>>>> be133bc (Save local changes before pulling)
