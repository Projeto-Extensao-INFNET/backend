import { z } from 'zod';

export const LoginDTO = z.object({
	email: z.email(),
	password: z.string().min(8),
});

export type LoginRequest = z.infer<typeof LoginDTO>;
