import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const setupGracefulShutdown = () => {
  const shutdown = async () => {
    console.log('Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};
