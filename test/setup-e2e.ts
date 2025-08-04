import 'dotenv/config';
import { execSync } from 'node:child_process';
import { PrismaClient } from 'generated/prisma';
import { generateUUID } from '@/utils';

const prisma = new PrismaClient();
const schemaId = generateUUID();

beforeAll(async () => {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL environment variable is not set');
	}

	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set('schema', schemaId);

	process.env.DATABASE_URL = url.toString();

	// no tutorial mandava usar pnpm prisma migrate dev, porém dava erro e a IA sugeriu isso....
	execSync('pnpm dlx prisma db push --force-reset');
});

afterAll(async () => {
	await prisma.$executeRawUnsafe(
		`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`,
	);
	await prisma.$disconnect();
});
