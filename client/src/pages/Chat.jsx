import React, { useState, useRef, useEffect } from "react";
import VoiceInput from "../features/chat/VoiceInput";
import Navbar from "../components/navbar";

export default function EmotionChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  const userId = localStorage.getItem("userId") || "dev_user_123";


  const handleSend = async (text) => {
    if (!text.trim()) return;
    setInput("");

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
    <>
      <Navbar />
      <div className="min-h-screen bg-background-alt text-text-dark p-6 font-mullish">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          🎙️ NeuroBridge Chat Assistant
        </h2>

        <div
          ref={chatBoxRef}
          className="bg-white text-text-dark p-4 rounded-lg shadow h-96 overflow-y-auto border border-accent"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                m.sender === "user"
                  ? "bg-accent ml-auto text-right"
                  : "bg-background-alt text-left"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 items-center mt-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            className="flex-1 p-2 border border-accent rounded-md text-text-dark"
            placeholder="Type your thoughts..."
          />
          <button
            onClick={() => handleSend(input)}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-[#5f7f6f]"
          >
            Send
          </button>
          <VoiceInput onTranscribe={(text) => setInput(text)} />
        </div>
      </div>
    </>
  );
}
