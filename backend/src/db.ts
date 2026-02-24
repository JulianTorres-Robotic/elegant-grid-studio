import { PrismaClient } from '@prisma/client';

// Patrón Singleton para evitar múltiples instancias en desarrollo
const prisma = new PrismaClient();

export default prisma;
