// src/pages/EmotionChat.jsx
import React, { useState, useRef, useEffect } from "react";
import VoiceInput from "../features/chat/VoiceInput"; // You’ll create this next

export default function EmotionChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const userId = "dev_user123"; // Replace with real user ID if needed
  const chatBoxRef = useRef(null);

  const handleSend = async (text, fromVoice = false) => {
    if (!text.trim()) return;
    setInput(""); // clear input box

    // Append user's message
    setMessages((prev) => [...prev, { sender: "user", text }]);

    try {
      const res = await fetch("http://localhost:5000/api/chat/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, userId }),
      });
      const data = await res.json();

      // Append analysis result
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `🧠 Sentiment: ${data.label}, Tone: ${data.tone || "N/A"}`,
        },
      ]);

      // Ask follow-up if emotion is strong
      if (Math.abs(data.score) > 0.7 || data.tone === "frustrated") {
        const response = await fetch("http://localhost:5000/api/chat/respond", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `User just expressed ${data.label} and tone is ${data.tone}. Ask empathetically why.`,
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

  // Scroll to bottom on new message
  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        🎙️ Emotion Chat Assistant
      </h2>

      {/* Message Display */}
      <div
        ref={chatBoxRef}
        className="bg-white p-4 rounded-lg shadow h-96 overflow-y-auto border border-gray-200"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 ${
              m.sender === "user"
                ? "text-right text-blue-600"
                : "text-left text-gray-800"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Text Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          className="flex-1 p-2 border rounded"
          placeholder="Type your thoughts..."
        />
        <button
          onClick={() => handleSend(input)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {/* Voice Input */}
      <VoiceInput onTranscribe={handleSend} />
    </div>
  );
}
