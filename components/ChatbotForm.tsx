'use client';

import { createChatbot, updateChatbot } from '@/app/actions';

interface ChatbotFormProps {
  initialData?: {
    id: string;
    name: string;
    description: string;
    system_instruction: string;
  };
}

export default function ChatbotForm({ initialData }: ChatbotFormProps) {
  // If we have initialData, we bind the update action with the ID
  const action = initialData 
    ? updateChatbot.bind(null, initialData.id) 
    : createChatbot;

  return (
    <form action={action} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
        <input
          type="text"
          name="name"
          required
          defaultValue={initialData?.name}
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
          defaultValue={initialData?.description}
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
          defaultValue={initialData?.system_instruction}
          placeholder="Eres un experto en..."
          className="w-full glass-input rounded-lg px-4 py-2 resize-y"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {initialData ? 'Guardar Cambios' : 'Crear Chatbot'}
        </button>
      </div>
    </form>
  );
}
