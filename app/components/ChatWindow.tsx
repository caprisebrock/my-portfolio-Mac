'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
    type: 'user' | 'ai';
    content: string;
}

const starterQuestions = [
    'What kind of freelance work does Caprise do?',
    'What projects has she built?',
    'What are her long-term goals?'
];

export default function ChatWindow() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || loading) return;
        const userMessage = inputMessage.trim();
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setInputMessage('');
        setLoading(true);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: userMessage,
                    conversationHistory: messages.map(m => ({
                        role: m.type === 'user' ? 'user' : 'assistant',
                        content: m.content
                    }))
                }),
            });
            const data = await response.json();
            if (data.error) {
                setMessages(prev => [...prev, { type: 'ai', content: data.error }]);
            } else {
                setMessages(prev => [...prev, { type: 'ai', content: data.message }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { type: 'ai', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleStarterClick = (q: string) => {
        setInputMessage(q);
        setIsOpen(true);
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-4 right-4 bg-black text-white rounded-full p-4 shadow-lg z-50 ${isOpen ? 'hidden' : ''}`}
                aria-label="Open chat"
            >
                <i className="fas fa-comments text-2xl"></i>
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-4 right-4 w-full max-w-md bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 z-50 transition-all duration-300 ${!isOpen ? 'hidden' : ''}`}
                style={{ minHeight: 480, maxHeight: 600, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-zinc-950 text-white rounded-t-xl border-b border-zinc-800">
                    <h3 className="font-semibold text-lg">AI Chatbot</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-zinc-400"
                        aria-label="Close chat"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900" style={{ minHeight: 0 }}>
                    {messages.length === 0 && (
                        <div className="text-zinc-400 text-center mt-8">Ask me anything about Caprise or her work!</div>
                    )}
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {message.type === 'ai' && (
                                <div className="bg-zinc-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                    <i className="fas fa-robot"></i>
                                </div>
                            )}
                            <div
                                className={`rounded-lg p-3 max-w-xs text-sm break-words shadow ${
                                    message.type === 'user'
                                        ? 'bg-blue-600 text-white ml-auto'
                                        : 'bg-zinc-800 text-zinc-100'
                                }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="rounded-lg p-3 max-w-xs text-sm bg-zinc-800 text-zinc-400 animate-pulse">
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-zinc-800 bg-zinc-950">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 p-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            disabled={loading}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-50"
                            aria-label="Send message"
                            disabled={loading || !inputMessage.trim()}
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
                {/* Starter Questions */}
                <div className="p-4 bg-zinc-900 border-t border-zinc-800 rounded-b-xl">
                    <div className="text-zinc-400 text-xs mb-2">Try asking:</div>
                    <div className="flex flex-wrap gap-2">
                        {starterQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleStarterClick(q)}
                                className="bg-zinc-800 text-zinc-200 px-3 py-1 rounded-full text-xs hover:bg-blue-600 hover:text-white transition"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
} 