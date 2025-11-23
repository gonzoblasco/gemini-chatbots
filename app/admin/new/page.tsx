'use client';

import { createChatbot } from '@/app/actions';
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
        <form action={createChatbot} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Ej: Chef Virtual"
              className="w-full glass-input rounded-lg px-4 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
            <input
              type="text"
              name="description"
              required
              placeholder="Ej: Un experto culinario..."
              className="w-full glass-input rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Instrucciones del Sistema (Prompt)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Define la personalidad y reglas del bot.
            </p>
            <textarea
              name="system_instruction"
              required
              rows={6}
              placeholder="Eres un experto en..."
              className="w-full glass-input rounded-lg px-4 py-2 resize-y"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Crear Chatbot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
