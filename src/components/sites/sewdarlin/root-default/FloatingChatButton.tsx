"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export function FloatingChatButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: "bot" | "user"; text: string }[]>([
    {
      sender: "bot",
      text: "Hi darling! 👋 Welcome to Sewmaistic. We lovingly handmade every single piece right here in Delhi, India. How can we help you today?",
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || message;
    if (!text.trim()) return;

    setChatLog((prev) => [...prev, { sender: "user", text }]);
    setMessage("");

    setTimeout(() => {
      let reply = "Thank you so much for reaching out! We typically respond within an hour. You can also contact us through our Contact Us form.";
      if (text.toLowerCase().includes("ship")) {
        reply = "We offer tracked shipping across India for all orders. Orders are dispatched from Delhi within 3 to 4 business days.";
      }
      setChatLog((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Chat Window */}
      {open && (
        <div className="mb-3 w-[320px] sm:w-[360px] bg-[#FBF9F4] rounded-2xl shadow-2xl border border-[#E5DFD5] overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#667073] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <div>
                <h4 className="font-serif text-[17px] leading-tight">Sewmaistic</h4>
                <p className="text-[11px] text-white/80 font-sans">Usually replies within an hour</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-[260px] overflow-y-auto space-y-3 font-sans text-[13px]">
            {chatLog.map((item, idx) => (
              <div
                key={idx}
                className={`flex ${item.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-xl leading-relaxed ${
                    item.sender === "user"
                      ? "bg-black text-white rounded-br-none"
                      : "bg-white text-[#4F5A5E] border border-[#EBE6DD] rounded-bl-none shadow-2xs"
                  }`}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick suggestions */}
          <div className="px-3 pb-2 flex flex-wrap gap-1.5 border-t border-[#EBE6DD] pt-2 bg-white/60">
            {["Shipping & delivery info"].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-[11px] bg-[#F2ECE1] hover:bg-[#E8E0D2] text-[#4F5A5E] px-2.5 py-1 rounded-full transition-colors"
              >
                {chip}
              </button>
            ))}
            <a
              href="mailto:hello@sewmaistic.com"
              className="text-[11px] bg-[#F2ECE1] hover:bg-[#E8E0D2] text-[#4F5A5E] px-2.5 py-1 rounded-full transition-colors"
            >
              Mail us
            </a>
          </div>

          {/* Input field */}
          <div className="p-3 bg-white border-t border-[#EBE6DD] flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent text-xs text-[#2E3A42] outline-hidden placeholder-[#9EA8AC]"
            />
            <button
              onClick={() => handleSend()}
              className="p-1.5 rounded-full bg-black hover:bg-[#262626] text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Bubble Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-13 h-13 rounded-full bg-[#667073] hover:bg-[#4F5A5E] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/80"
        aria-label="Customer service chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
