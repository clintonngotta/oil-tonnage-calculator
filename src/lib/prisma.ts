import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient({
	errorFormat: "pretty",
	log: ["error"],
});
const globalForPrisma = global as unknown as { prisma: typeof prisma };

globalForPrisma.prisma = prisma;

export default prisma;
