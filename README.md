# Gemini Chatbots - Walkthrough

## Resumen

Has creado un catálogo de chatbots potenciados por Google Gemini. La aplicación permite a los usuarios chatear con diferentes "personas" y a los administradores gestionar estos bots.

## Tecnologías

- **Frontend:** Next.js 16 (App Router), TailwindCSS (Glassmorphism).
- **Backend:** Next.js Server Actions & API Routes.
- **AI:** Vercel AI SDK + Google Gemini API.
- **Base de Datos:** SQLite + Prisma ORM.

## Configuración Inicial

### 1. Variables de Entorno

Asegúrate de configurar tu API Key de Google en `.env.local`:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=tu_api_key_aqui
ADMIN_PASSWORD=secret
AUTH_SECRET=secret
```

### 2. Base de Datos

La base de datos SQLite ya está inicializada en `prisma/dev.db`.
Si necesitas resetearla:

```bash
npx prisma migrate reset
```

## Cómo Ejecutar

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Guía de Uso

### Catálogo Público (Home)

- Verás una lista de chatbots activos.
- Haz clic en "Chatear ahora" para iniciar una conversación.
- **Nota:** Si no hay bots, ve al panel de admin para crear uno.

### Panel de Administración

- Accede a: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Login:** Usa la contraseña configurada en `.env.local` (Default: `secret`).
- **Dashboard:**
  - **Nuevo Chatbot:** Crea un bot con nombre, descripción y prompt.
  - **Toggle:** Activa/Desactiva bots.
  - **Eliminar:** Borra bots permanentemente.

### Chat

- La interfaz de chat soporta streaming de texto en tiempo real.
- Usa el modelo `gemini-1.5-flash` por defecto (rápido y eficiente).

## Próximos Pasos (Roadmap)

- [ ] Implementar autenticación real de usuarios (NextAuth con Google/Email).
- [ ] Integrar pagos para acceso a modelos Pro.
- [ ] Migrar base de datos a PostgreSQL (Supabase) para producción.
