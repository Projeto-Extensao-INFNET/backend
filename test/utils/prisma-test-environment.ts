import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { PrismaClient } from '../../generated/prisma';

const generateDatabaseUrl = (schema: string) => {
	if (!process.env.DATABASE_URL) {
		throw new Error('Please provide a DATABASE_URL env variable');
	}
	const url = new URL(process.env.DATABASE_URL);
	url.searchParams.set('schema', schema);
	return url.toString();
};

export const setupPrismaTestEnv = async () => {
	const schema = randomUUID();
	const databaseUrl = generateDatabaseUrl(schema);
	process.env.DATABASE_URL = databaseUrl;

	execSync('npx prisma migrate deploy');

	const prisma = new PrismaClient();

	return { prisma, schema };
};

export const teardownPrismaTestEnv = async (
	prisma: PrismaClient,
	schema: string,
) => {
	await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
	await prisma.$disconnect();
};
