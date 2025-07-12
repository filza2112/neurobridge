import React, { useState, useRef } from "react";

export default function VoiceInput({ onTranscribe }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    chunks.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.current.push(e.data);
      }
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("audio", blob, "voice.webm");

      try {
        const res = await fetch("http://localhost:5000/api/audio/transcribe", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        console.log("📝 Transcription result:", data);

        if (data.transcript) {
          onTranscribe(data.transcript);
        } else {
          alert("⚠️ No transcript received from server.");
        }
      } catch (err) {
        console.error("Voice upload error:", err);
        alert("⚠️ Upload failed. Check console for details.");
      }
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="text-center mt-2">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded text-white ${
          recording ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {recording ? "⏹️ Stop Recording" : "🎤 Start Recording"}
      </button>
    </div>
  );
}
