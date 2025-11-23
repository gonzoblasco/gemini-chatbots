'use client';

// import { useChat } from '@ai-sdk/react';
import { Send, Bot, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ChatInterfaceProps {
  chatbotId: string;
  initialMessage?: string;
}

export function ChatInterface({ chatbotId, initialMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<any[]>(
    initialMessage ? [{ id: 'welcome', role: 'assistant', content: initialMessage }] : []
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-chatbot-id': chatbotId,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          chatbotId // Send in body too just in case
        }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      // Add placeholder for assistant message
      const assistantMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }]);

      const decoder = new TextDecoder();
      let accumulatedResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        accumulatedResponse += text;

        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessageId 
              ? { ...msg, content: accumulatedResponse }
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { id: 'error', role: 'assistant', content: 'Error al conectar con el chatbot.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] glass-panel rounded-xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m: any) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${
              m.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                m.role === 'user' ? 'bg-indigo-500' : 'bg-purple-500'
              }`}
            >
              {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                m.role === 'user'
                  ? 'bg-indigo-500/20 text-white'
                  : 'bg-white/10 text-gray-100'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm md:text-base">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
               <Bot size={16} />
             </div>
             <div className="bg-white/10 p-3 rounded-lg">
               <span className="animate-pulse">...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleFormSubmit} className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex gap-2">
          <input
            className="flex-1 glass-input rounded-lg px-4 py-3 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
