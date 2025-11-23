import { PrismaClient } from '@prisma/client';
import { ChatbotCard } from '@/components/ChatbotCard';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function Home() {
  const chatbots = await prisma.chatbot.findMany({
    where: { is_active: true },
    orderBy: { created_at: 'desc' },
  });

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
            Gemini Chatbots
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explora nuestra colección de asistentes virtuales potenciados por IA.
            Elige uno y comienza a conversar.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatbots.map((bot) => (
            <ChatbotCard 
              key={bot.id}
              id={bot.id}
              name={bot.name}
              description={bot.description}
            />
          ))}
          
          {chatbots.length === 0 && (
            <div className="col-span-full text-center p-12 glass-panel rounded-xl">
              <p className="text-gray-400">No hay chatbots activos en este momento.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
