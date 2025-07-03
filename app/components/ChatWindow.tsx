'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
    type: 'user' | 'ai';
    content: string;
}

interface ChatWindowProps {
    onClose: () => void;
}

const starterQuestions = [
    'What kind of freelance work does Caprise do?',
    'What projects has she built?',
    'What are her long-term goals?'
];

export default function ChatWindow({ onClose }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
    };

    return (
        <div className="fixed bottom-4 right-4 w-full max-w-md bg-black rounded-xl shadow-2xl border border-gray-700 z-50 transition-all duration-300" style={{ minHeight: 480, maxHeight: 600, display: 'flex', flexDirection: 'column' }}>
            <div className="flex justify-between items-center p-4 bg-black text-white rounded-t-xl border-b border-gray-700">
                    <h3 className="font-semibold text-lg">AI Chatbot</h3>
                    <button
                    onClick={onClose}
                    className="text-white hover:text-gray-400"
                        aria-label="Close chat"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900" style={{ minHeight: 0 }}>
                    {messages.length === 0 && (
                    <div className="text-gray-300 text-center mt-8">Ask me anything about Caprise or her work!</div>
                    )}
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {message.type === 'ai' && (
                            <div className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                <i className="fas fa-robot" />
                                </div>
                            )}
                            <div
                                className={`rounded-lg p-3 max-w-xs text-sm break-words shadow ${
                                    message.type === 'user'
                                    ? 'bg-gray-700 text-white ml-auto'
                                    : 'bg-gray-800 text-white'
                                }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                        <div className="rounded-lg p-3 max-w-xs text-sm bg-gray-800 text-white animate-pulse">
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

            <div className="p-4 border-t border-gray-700 bg-black">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                        className="flex-1 p-2 bg-gray-900 text-white border border-gray-700 rounded-lg placeholder:text-gray-500 focus:outline-white focus:ring-gray-700"
                            disabled={loading}
                        />
                        <button
                            onClick={handleSendMessage}
                        className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                            aria-label="Send message"
                            disabled={loading || !inputMessage.trim()}
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            <div className="p-4 bg-black border-t border-gray-700 rounded-b-xl">
                <div className="text-gray-400 text-xs mb-2">Try asking:</div>
                    <div className="flex flex-wrap gap-2">
                        {starterQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleStarterClick(q)}
                            className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs hover:bg-gray-700 transition"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
    );
} 