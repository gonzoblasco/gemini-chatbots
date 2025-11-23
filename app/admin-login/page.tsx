'use client';

import { login } from '@/app/actions';
import { useActionState } from 'react';

export default function LoginPage() {
  // @ts-ignore
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              className="w-full glass-input rounded-lg px-4 py-2"
            />
          </div>
          {state?.error && (
            <p className="text-red-400 text-sm">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {isPending ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
