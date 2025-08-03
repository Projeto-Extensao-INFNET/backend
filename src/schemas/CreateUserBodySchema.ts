import z from 'zod';

export const CreateUserBodySchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	password: z.string(),
	role: z.enum(['PATIENT', 'PROFESSIONAL', 'ADMIN']),
	documentType: z.enum(['CPF', 'RG']),
	document: z.string(),
});

export type createUserBodySchema = z.infer<typeof CreateUserBodySchema>;
