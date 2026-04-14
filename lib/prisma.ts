import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/prisma/generated/prisma/client';

const prismaClientSingleton = () => {
  // Create the connection pool for Supabase
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  // Wrap it in the Prisma PostgreSQL adapter
  const adapter = new PrismaPg(pool);

  // Pass the adapter to the PrismaClient constructor
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
