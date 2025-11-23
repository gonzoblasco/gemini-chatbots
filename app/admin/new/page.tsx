'use client';

import ChatbotForm from '@/components/ChatbotForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewChatbotPage() {
  return (
    <div>
      <header className="mb-8 flex items-center gap-4">
        <Link 
          href="/admin"
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-white">Nuevo Chatbot</h1>
      </header>

      <div className="glass-panel p-8 rounded-xl max-w-2xl">
        <ChatbotForm />
      </div>
    </div>
  );
}
