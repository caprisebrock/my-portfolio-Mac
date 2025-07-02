import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the request body type
interface ChatRequest {
  message: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

// Define the response type
interface ChatResponse {
  message: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  // 🔍 Log incoming request
  console.log("🔍 Incoming request to /api/chat");
  try {
    // 🗝️ Log if API key is loaded
    console.log("🗝️ API Key Loaded?", !!process.env.OPENAI_API_KEY);

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Improved error: clear message if API key is missing
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please set OPENAI_API_KEY in your .env.local file.' },
        { status: 500 }
      );
    }

    // Parse the request body
    let body: ChatRequest;
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body.' },
        { status: 400 }
      );
    }
    const { message, conversationHistory = [] } = body;

    // Validate the request
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Prepare conversation messages for OpenAI
    const messages = [
      {
        role: 'system' as const,
        content: `You are a helpful and friendly AI assistant on Caprise Brock's portfolio website. Caprise is a full stack developer and designer who builds clean, modern websites. She offers freelance services, and she's passionate about solving problems with design and code. You should answer questions about her skills, her recent projects, her goals, and how to get in touch for freelance opportunities.`
      },
      ...conversationHistory,
      {
        role: 'user' as const,
        content: message
      }
    ];

    // Wrap OpenAI call in try/catch for better error reporting
    let completion;
    try {
      // Using gpt-3.5-turbo for compatibility with free OpenAI API accounts.
      completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
        stream: false,
      });
    } catch (openaiError: any) {
      // Log and return OpenAI API errors
      console.error('OpenAI API Error:', openaiError);
      if (openaiError.status === 404 && openaiError.code === 'model_not_found') {
        return NextResponse.json(
          { error: 'The specified model does not exist or you do not have access. Please check your OpenAI account and model name.' },
          { status: 404 }
        );
      }
      if (openaiError.status === 401) {
        return NextResponse.json(
          { error: 'Invalid OpenAI API key' },
          { status: 401 }
        );
      }
      if (openaiError.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      if (openaiError.status === 500) {
        return NextResponse.json(
          { error: 'OpenAI service is currently unavailable' },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch response from OpenAI. Please try again later.' },
        { status: 500 }
      );
    }

    // Extract the response
    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json(
        { error: 'No response generated from OpenAI' },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json({
      message: aiResponse,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      ]
    });

  } catch (error: unknown) {
    // Log unexpected errors
    console.error('Chat API Error:', error);
    // Generic error response
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
// Cleaned up GET to return a clear error message
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send messages.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send messages.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send messages.' },
    { status: 405 }
  );
}

// ---
// Fixes made:
// 1. Added logging for incoming requests and API key loading.
// 2. Improved error handling for missing API key and invalid JSON.
// 3. Wrapped OpenAI API call in try/catch for more robust error reporting.
// 4. Cleaned up GET handler to return a clear error message for non-POST requests.
// 5. Confirmed API key is read from process.env.OPENAI_API_KEY (from .env.local).
// --- 