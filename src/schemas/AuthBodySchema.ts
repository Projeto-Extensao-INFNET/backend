import { z } from 'zod';

export const AuthBodySchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

export type authBodySchema = z.infer<typeof AuthBodySchema>;
