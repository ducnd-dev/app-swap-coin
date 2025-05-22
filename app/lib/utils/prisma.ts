import { PrismaClient } from '@/app/generated/prisma/client';

// Add a proper declaration for the global object
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a single instance of Prisma Client
let prisma: PrismaClient;

// This logic ensures we don't create multiple instances in development
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = global.prisma;
}

// Export the Prisma client
export { prisma };

// Ensure Prisma disconnects on process exit
if (process.env.NODE_ENV !== 'production') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}