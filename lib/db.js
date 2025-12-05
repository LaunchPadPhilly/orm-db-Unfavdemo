import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'test' || process.env.VITEST 
      ? [] 
      : process.env.NODE_ENV === 'development' 
        ? ['query', 'error', 'warn'] 
        : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// Middleware to enforce technologies field is explicitly provided
prisma.$use(async (params, next) => {
  // Only check on create operations for Project model
  if (params.model === 'Project' && params.action === 'create') {
    // Check if technologies is not in the data object (undefined)
    if (!('technologies' in params.args.data)) {
      throw new Error('technologies field is required');
    }
  }
  return next(params);
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

