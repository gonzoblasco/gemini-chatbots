import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

interface ChatbotCardProps {
  id: string;
  name: string;
  description: string;
}

export function ChatbotCard({ id, name, description }: ChatbotCardProps) {
  return (
    <div className="glass-card rounded-xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-4">
        <MessageCircle className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{name}</h3>
      <p className="text-gray-300 mb-6 flex-grow">{description}</p>
      <Link 
        href={`/chat/${id}`}
        className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-center font-medium transition-colors flex items-center justify-center gap-2"
      >
        Chatear ahora
      </Link>
    </div>
  );
}
