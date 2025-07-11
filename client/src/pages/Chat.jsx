import React, { useState, useRef, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Dummy bot reply — replace with backend later
    const botReply = await getBotReply(input);
    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
  };

  const getBotReply = async (text) => {
    // TODO: replace this with Whisper + Bark backend call
    return `You said: "${text}". Let’s explore that further.`;
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 h-[90vh] flex flex-col border rounded-xl shadow bg-white">
      <h1 className="text-xl font-bold mb-4 text-center">
        🧠 NeuroBridge Chat
      </h1>

      <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-gray-50 rounded-md border">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.sender === "user"
                ? "bg-blue-100 self-end text-right"
                : "bg-gray-200 self-start text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex mt-4 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
