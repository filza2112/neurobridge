// const fs = require("fs/promises");
// const path = require("path");
// const ffmpeg = require("fluent-ffmpeg");
// const ffmpegPath = require("ffmpeg-static");
// const wav = require("wav-decoder");
// const { pipeline } = require("@xenova/transformers");

// ffmpeg.setFfmpegPath(ffmpegPath);

// let transcriber;

// async function convertToWav(inputPath) {
//   const outputPath = inputPath.replace(/\.[^/.]+$/, ".wav");
//   return new Promise((resolve, reject) => {
//     ffmpeg(inputPath)
//       .audioChannels(1)
//       .audioFrequency(16000)
//       .format("wav")
//       .on("end", () => resolve(outputPath))
//       .on("error", reject)
//       .save(outputPath);
//   });
// }

// exports.transcribeAudio = async (audioPath) => {
//   // Convert to .wav with correct settings
//   const wavPath = await convertToWav(audioPath);
//   const wavBuffer = await fs.readFile(wavPath);
//   const decoded = await wav.decode(wavBuffer);
//   const float32Array = decoded.channelData[0]; // Mono channel

//   // Load Whisper once
//   if (!transcriber) {
//     transcriber = await pipeline(
//       "automatic-speech-recognition",
//       "Xenova/whisper-tiny.en"
//     );
//   }

//   const result = await transcriber(float32Array, { sampling_rate: 16000 });

//   // Clean up
//   await fs.unlink(wavPath);

//   return result.text;
// };
