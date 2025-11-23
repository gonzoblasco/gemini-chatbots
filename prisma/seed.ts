import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const chatbot = await prisma.chatbot.create({
    data: {
      name: "Chef Virtual",
      description:
        "Un experto culinario que te ayuda a cocinar con lo que tienes.",
      system_instruction:
        "Eres un chef experto y amable. Tu objetivo es ayudar a los usuarios a cocinar platos deliciosos. Pregunta qué ingredientes tienen y sugiere recetas. Sé creativo y da consejos de cocina.",
      is_active: true,
    },
  });
  console.log({ chatbot });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
