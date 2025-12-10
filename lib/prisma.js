// lib/prisma.js
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

const { Pool } = pkg;

// reuse a single PrismaClient in dev
const globalForPrisma = globalThis;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter, // 👈 THIS is what Prisma 7 needs
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
