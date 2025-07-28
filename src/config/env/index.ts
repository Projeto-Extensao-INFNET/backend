import z from 'zod';

export const envSchema = z.object({
	DATABASE_URL: z.url().startsWith('postgresql://'),
	PORT: z.coerce.number().optional().default(3333),
	NODE_ENV: z
		.enum(['development', 'test', 'e2e', 'production'])
		.default('development'),
	CORS_ORIGIN: z.url().startsWith('http://localhost:'),
});

export type Env = z.infer<typeof envSchema>;
