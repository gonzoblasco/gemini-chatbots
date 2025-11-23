import { PrismaClient } from '@prisma/client';
import { ChatInterface } from '@/components/ChatInterface';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: PageProps) {
  const { id } = await params;
  
  const chatbot = await prisma.chatbot.findUnique({
    where: { id },
  });

  if (!chatbot) {
    notFound();
  }

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col">
      <header className="mb-6 flex items-center gap-4">
        <Link 
          href="/"
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{chatbot.name}</h1>
          <p className="text-sm text-gray-400">{chatbot.description}</p>
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full">
        <ChatInterface chatbotId={chatbot.id} />
      </div>
    </main>
  );
}
