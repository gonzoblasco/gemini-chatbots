'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

// --- Auth Actions ---

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password') as string;
  
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 1 day
    });
    redirect('/admin');
  } else {
    return { error: 'Contraseña incorrecta' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}

// --- Chatbot CRUD Actions ---

export async function createChatbot(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const system_instruction = formData.get('system_instruction') as string;

  await prisma.chatbot.create({
    data: {
      name,
      description,
      system_instruction,
      is_active: true,
    },
  });

  revalidatePath('/admin');
  revalidatePath('/');
  redirect('/admin');
}

export async function updateChatbot(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const system_instruction = formData.get('system_instruction') as string;

  await prisma.chatbot.update({
    where: { id },
    data: {
      name,
      description,
      system_instruction,
    },
  });

  revalidatePath('/admin');
  revalidatePath('/');
  redirect('/admin');
}

export async function deleteChatbot(id: string) {
  await prisma.chatbot.delete({
    where: { id },
  });
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function toggleChatbotStatus(id: string, isActive: boolean) {
  await prisma.chatbot.update({
    where: { id },
    data: { is_active: isActive },
  });
  revalidatePath('/admin');
  revalidatePath('/');
}
