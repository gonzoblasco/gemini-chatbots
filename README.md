# Catálogo de Chatbots Gemini

Una plataforma web para crear, gestionar y desplegar chatbots personalizados potenciados por la API de Google Gemini.

## Características

- **Catálogo Público:** Vista estilo galería donde los usuarios pueden explorar los chatbots disponibles.
- **Chat en Tiempo Real:** Interfaz de chat moderna con respuestas en streaming (efecto máquina de escribir).
- **Panel de Administración:**
  - Acceso protegido por contraseña.
  - **CRUD de Chatbots:** Crear, Editar, Eliminar y Activar/Desactivar bots.
  - **Editor de Prompts:** Define la personalidad y reglas de cada bot mediante "System Instructions".
- **Diseño Premium:** Interfaz con estilo "Glassmorphism" (efectos de vidrio y desenfoque).

## Stack Tecnológico

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** TailwindCSS
- **IA:** [Vercel AI SDK](https://sdk.vercel.ai/docs) + Google Gemini Provider
- **Base de Datos:** SQLite (vía Prisma ORM)
- **Autenticación:** Custom (Cookies/Server Actions)

## Configuración e Instalación

### 1. Requisitos Previos

- Node.js 18+
- Una API Key de [Google AI Studio](https://aistudio.google.com/)

### 2. Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd gemini-chatbots

# Instalar dependencias
npm install
```

### 3. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# API Key de Google Gemini
GOOGLE_GENERATIVE_AI_API_KEY=tu_api_key_aqui

# Contraseña para el panel de administración
ADMIN_PASSWORD=tu_password_seguro
```

### 4. Base de Datos

Inicializa la base de datos SQLite con Prisma:

```bash
# Crear las tablas en la base de datos local (dev.db)
npx prisma migrate dev --name init
```

### 5. Ejecutar

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Estructura del Proyecto

- `/app`: Rutas de la aplicación (Next.js App Router).
  - `(public)`: Rutas públicas (Catálogo, Chat).
  - `(admin)`: Rutas protegidas del panel de administración.
  - `api/chat`: Endpoint para el streaming de respuestas de IA.
- `/components`: Componentes de UI reutilizables.
- `/prisma`: Esquema de la base de datos y migraciones.
- `/lib`: Utilidades y configuración.

## Licencia

MIT
