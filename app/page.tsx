'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversationHistory: []
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResponse(data.message);
      }
    } catch (err) {
      setError('Failed to connect to the API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Chat API Test
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Type your message here..."
                disabled={loading}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {response && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Response:</h3>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <p className="text-gray-900">{response}</p>
              </div>
            </div>
          )}

          <div className="mt-6 text-xs text-gray-500">
            <p>This is a test page for the Chat API. Make sure you have:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Set up your OpenAI API key in .env.local</li>
              <li>Installed dependencies with npm install</li>
              <li>Started the development server with npm run dev</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 