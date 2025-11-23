import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
// Note: In production, use a singleton pattern to avoid multiple instances
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, chatbotId: bodyChatbotId } = body;
    const url = new URL(req.url);
    const headerChatbotId = req.headers.get('x-chatbot-id');
    const chatbotId = bodyChatbotId || url.searchParams.get('chatbotId') || headerChatbotId;

    if (!chatbotId) {
      return new Response('Chatbot ID is required', { status: 400 });
    }

    // Fetch chatbot system instruction
    const chatbot = await prisma.chatbot.findUnique({
      where: { id: chatbotId },
    });

    if (!chatbot) {
      return new Response('Chatbot not found', { status: 404 });
    }

    // Determine model (MVP: Default to Flash, logic for Pro can be added later)
    // const model = isPremium ? 'gemini-1.5-pro' : 'gemini-1.5-flash';
    const model = 'gemini-flash-latest';

    const result = streamText({
      model: google(model),
      system: chatbot.system_instruction,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    // @ts-ignore
    if (error.response) {
      // @ts-ignore
      console.error('API Response Error Body:', await error.response.text());
    }
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: String(error) }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
