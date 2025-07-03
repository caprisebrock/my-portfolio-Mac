"use client";
import { useState } from "react";
import ChatWindow from "./ChatWindow";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating chat bubble button with label */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 flex items-center gap-2 bg-black text-white border-2 border-gray-700 rounded-full px-5 py-3 shadow-lg z-50 hover:bg-gray-800 hover:text-gray-400 focus:outline-white"
          aria-label="Open chat"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
        >
          <span className="font-semibold">AI Chat</span>
        </motion.button>
      )}
      {/* Chat window with slide-in/out animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 z-50"
            style={{ width: '100%', maxWidth: '28rem' }}
          >
            <ChatWindow onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 