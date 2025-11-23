import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { Plus, Trash2, Power, Pencil } from 'lucide-react';
import { deleteChatbot, toggleChatbotStatus } from '@/app/actions';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const chatbots = await prisma.chatbot.findMany({
    orderBy: { created_at: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Gestión de Chatbots</h1>
        <Link
          href="/admin/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Nuevo Chatbot
        </Link>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-300 border-b border-white/10">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {chatbots.map((bot) => (
              <tr key={bot.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white">{bot.name}</td>
                <td className="p-4 text-gray-400 max-w-xs truncate">{bot.description}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bot.is_active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {bot.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <form action={toggleChatbotStatus.bind(null, bot.id, !bot.is_active)}>
                    <button
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                      title={bot.is_active ? 'Desactivar' : 'Activar'}
                    >
                      <Power size={18} />
                    </button>
                  </form>
                  <Link
                    href={`/admin/edit/${bot.id}`}
                    className="p-2 hover:bg-indigo-500/20 rounded-lg text-indigo-400 hover:text-indigo-300 transition-colors"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </Link>
                  <form action={deleteChatbot.bind(null, bot.id)}>
                    <button
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {chatbots.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No hay chatbots creados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
