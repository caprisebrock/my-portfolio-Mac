# Next.js 14 Chat API with OpenAI

This is a Next.js 14 API route that integrates with OpenAI's Chat API to provide AI-powered responses for your portfolio chatbot.

## 🚀 Features

- **Next.js 14 App Router** - Modern API route structure
- **OpenAI Integration** - Powered by GPT-3.5-turbo
- **TypeScript Support** - Full type safety
- **Error Handling** - Comprehensive error management
- **Environment Variables** - Secure API key management
- **Conversation History** - Maintains chat context

## 📁 Project Structure

```
├── app/
│   └── api/
│       └── chat/
│           └── route.ts          # Main API route
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── next.config.js               # Next.js config
├── env.example                  # Environment variables template
└── README-API.md               # This file
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp env.example .env.local
```

Then edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
```

Your API will be available at: `http://localhost:3000/api/chat`

## 📡 API Usage

### Endpoint
```
POST /api/chat
```

### Request Body
```json
{
  "message": "Hello, can you tell me about your services?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous user message"
    },
    {
      "role": "assistant", 
      "content": "Previous AI response"
    }
  ]
}
```

### Response
```json
{
  "message": "AI response here",
  "conversationHistory": [
    // Updated conversation history
  ]
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

## 🔧 Integration with Your Portfolio

### Update Your Chatbot JavaScript

Replace the `generateAIResponse` function in your `script.js` with:

```javascript
async function generateAIResponse(userMessage) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                conversationHistory: [] // Add your conversation history here
            })
        });

        const data = await response.json();
        
        if (data.error) {
            return `Sorry, I'm having trouble right now. Please try again or contact Caprise directly at brockcaprise@gmail.com.`;
        }
        
        return data.message;
    } catch (error) {
        console.error('API Error:', error);
        return `Sorry, I'm having trouble connecting. Please contact Caprise directly at brockcaprise@gmail.com.`;
    }
}
```

## 🛡️ Error Handling

The API includes comprehensive error handling for:

- **401** - Invalid API key
- **429** - Rate limit exceeded
- **500** - OpenAI service unavailable
- **503** - Network errors
- **400** - Invalid request format

## 🔒 Security

- API key is stored in environment variables
- Input validation for all requests
- Rate limiting (handled by OpenAI)
- Error messages don't expose sensitive information

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

Make sure to set the `OPENAI_API_KEY` environment variable in your hosting platform.

## 📝 Customization

### Modify the System Prompt

Edit the system message in `app/api/chat/route.ts` to customize the AI's behavior:

```typescript
{
  role: 'system',
  content: `Your custom system prompt here...`
}
```

### Change Model Parameters

Modify the OpenAI API call parameters:

```typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-4', // Change model
  messages: messages,
  max_tokens: 500, // Adjust response length
  temperature: 0.5, // Adjust creativity
  stream: false,
});
```

## 🧪 Testing

### Test the API

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, what services do you offer?"}'
```

### Test Error Handling

```bash
# Test without API key
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'
```

## 📊 Monitoring

The API logs errors to the console. For production, consider adding:

- Request logging
- Response time monitoring
- Error tracking (Sentry, etc.)
- Usage analytics

## 🤝 Support

If you encounter issues:

1. Check your OpenAI API key is correct
2. Verify environment variables are set
3. Check the browser console for errors
4. Review the API response in Network tab

## 📄 License

This project is open source and available under the MIT License. 