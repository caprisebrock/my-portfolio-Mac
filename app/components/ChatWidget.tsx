"use client";
import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating chat bubble button with label */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 flex items-center gap-2 bg-black text-white border-2 border-gray-700 rounded-full px-5 py-3 shadow-lg z-50 hover:bg-gray-800 hover:text-gray-400 focus:outline-white"
          aria-label="Open chat"
        >
          <span className="text-xl text-white">��</span>
          <span className="font-semibold">AI Chat</span>
        </button>
      )}
      {/* Chat window */}
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
} 