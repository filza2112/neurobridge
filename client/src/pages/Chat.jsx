// src/pages/Chat.jsx
import React, { useState, useRef, useEffect } from "react";
import VoiceInput from "../features/chat/VoiceInput";

export default function EmotionChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  const userId = "dev_user123";

  const handleSend = async (text) => {
    if (!text.trim()) return;
    setInput(""); // clear input box

    setMessages((prev) => [...prev, { sender: "user", text }]);

    try {
      const res = await fetch("http://localhost:5000/api/chat/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          userId,
          email: "user@example.com",
          isFollowUp: false,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.botResponse,
        },
      ]);
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
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        🎙️ Emotion Chat Assistant
      </h2>

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
        <VoiceInput onTranscribe={setInput} />
      </div>
    </div>
  );
}
