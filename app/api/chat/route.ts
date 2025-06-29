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
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Parse the request body
    const body: ChatRequest = await request.json();
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
        content: `You are a helpful AI assistant for Caprise Brock's portfolio website. 
        Caprise is a beginner developer learning HTML, CSS, GitHub, and AI tools for freelance work.
        
        Key information about Caprise:
        - Email: brockcaprise@gmail.com
        - Services: Freelance web development, HTML/CSS, responsive design
        - Experience: Beginner developer, learning and growing
        - Available for: Freelance web projects
        - Location: Remote/Worldwide
        
        Be helpful, professional, and encourage visitors to contact Caprise for freelance opportunities.
        Keep responses concise but informative.`
      },
      ...conversationHistory,
      {
        role: 'user' as const,
        content: message
      }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 300,
      temperature: 0.7,
      stream: false,
    });

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
    console.error('Chat API Error:', error);

    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { error: 'Invalid OpenAI API key' },
          { status: 401 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      if (error.status === 500) {
        return NextResponse.json(
          { error: 'OpenAI service is currently unavailable' },
          { status: 503 }
        );
      }
    }

    // Handle network errors
    if (error instanceof Error && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Network error. Please check your connection.' },
        { status: 503 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
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