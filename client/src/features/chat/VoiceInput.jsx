// src/pages/EmotionChat.jsx
import React, { useState, useRef, useEffect } from "react";
import VoiceInput from "../features/chat/VoiceInput";

export default function EmotionChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const userId = "dev_user123"; // replace dynamically later

  const handleSend = async (text) => {
    if (!text.trim()) return;
    setInput("");

    setMessages((prev) => [...prev, { sender: "user", text }]);

    try {
      const res = await fetch("http://localhost:5000/api/chat/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, userId }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `🧠 Sentiment: ${data.label} (${data.score.toFixed(
            2
          )}), Tone: ${data.tone || "N/A"}`,
        },
      ]);

      if (Math.abs(data.score) > 0.7 || data.tone === "frustrated") {
        const response = await fetch("http://localhost:5000/api/chat/respond", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `User expressed ${data.label} with tone ${data.tone}. Ask empathetically why.`,
            userId,
          }),
        });
        const bot = await response.json();
        setMessages((prev) => [...prev, { sender: "bot", text: bot.response }]);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, something went wrong." },
      ]);
    }
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center text-purple-700">
          🎙️ Emotion Chat Assistant
        </h2>

        {/* Chat Display */}
        <div
          ref={chatBoxRef}
          className="h-96 overflow-y-auto p-4 border rounded-lg bg-gray-50 space-y-3"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                m.sender === "user"
                  ? "ml-auto bg-blue-200 text-right text-blue-900"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Type your thoughts..."
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={() => handleSend(input)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition shadow"
          >
            Send
          </button>
        </div>

        {/* Voice Input Button */}
        <VoiceInput onTranscribe={handleSend} />
      </div>
    </div>
  );
}
