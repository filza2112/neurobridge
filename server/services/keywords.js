
// Simulated keyword extractor using word frequency and stopword filtering

const stopwords = new Set([
  "i", "the", "and", "a", "to", "of", "it", "in", "is", "that", "on", "for", "with", "was", "as", "but", "are", "at", "be", "have", "this"
]);

// export function extractKeywords(text, max = 3) {
//   const freq = {};
//   const words = text
//     .toLowerCase()
//     .replace(/[^a-z\s]/g, "")
//     .split(/\s+/)
//     .filter(w => w && !stopwords.has(w));

//   for (const word of words) {
//     freq[word] = (freq[word] || 0) + 1;
//   }

//   return Object.entries(freq)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, max)
//     .map(([word]) => word);
// }

// Example:
// console.log(extractKeywords("I feel like I’m drowning in assignments again."));
