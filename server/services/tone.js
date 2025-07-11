function classifyTone(text) {
  const tones = [
    { keyword: "nervous", tone: "anxious" },
    { keyword: "angry", tone: "angry" },
    { keyword: "sad", tone: "sad" },
    { keyword: "happy", tone: "happy" },
    { keyword: "stressed", tone: "stressed" },
  ];

  for (const { keyword, tone } of tones) {
    if (text.toLowerCase().includes(keyword)) {
      return tone;
    }
  }

  return "neutral";
}

module.exports = { classifyTone };
