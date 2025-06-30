'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
    type: 'user' | 'ai';
    content: string;
}

export default function ChatWindow() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', content: inputMessage.trim() }]);
        setInputMessage('');

        try {
            // Send to API and get response
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            });

            const data = await response.json();

            // Add AI response
            setMessages(prev => [...prev, { type: 'ai', content: data.response }]);
        } catch (error) {
            console.error('Error sending message:', error);
            // Optionally add error message to chat
            setMessages(prev => [...prev, { type: 'ai', content: 'Sorry, I encountered an error. Please try again.' }]);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-4 right-4 bg-chat-accent text-white rounded-full p-4 shadow-lg ${isOpen ? 'hidden' : ''}`}
                aria-label="Open chat"
            >
                <i className="fas fa-comments text-2xl"></i>
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl ${!isOpen ? 'hidden' : ''}`}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-chat-accent text-white rounded-t-lg">
                    <h3 className="font-semibold">Chat with Me</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-gray-200"
                        aria-label="Close chat"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-start space-x-2 ${
                                message.type === 'user' ? 'justify-end' : ''
                            }`}
                        >
                            {message.type === 'ai' && (
                                <div className="bg-chat-accent text-white rounded-full w-8 h-8 flex items-center justify-center">
                                    <i className="fas fa-robot"></i>
                                </div>
                            )}
                            <div
                                className={`rounded-lg p-3 max-w-xs ${
                                    message.type === 'user'
                                        ? 'bg-chat-accent text-white'
                                        : 'bg-chat-border text-chat-text'
                                }`}
                            >
                                <p className="text-sm">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chat-accent"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-chat-accent text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                            aria-label="Send message"
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
} 