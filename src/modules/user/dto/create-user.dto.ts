import z from 'zod';

export const CreateUserDTO = z
	.object({
		name: z.string().min(1),
		email: z.email(),
		password: z.string().min(8),
		birthDate: z.iso.date(),
		role: z.enum(['PATIENT', 'PROFESSIONAL', 'ADMIN']),
		documentType: z.enum(['CPF', 'RG']),
		document: z.string(),
	})
	.refine(
		(data) => {
			if (data.documentType === 'CPF') {
				return /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/.test(
					data.document,
				);
			}

			if (data.documentType === 'RG') {
				return /^\d{2}\.\d{3}\.\d{3}-\d{1}$|^\d{9}$/.test(
					data.document,
				);
			}

			return true;
		},
		{
			message: 'Formato de documento inválido para o tipo selecionado',
			path: ['document'],
		},
	);

export type CreateUserRequest = z.infer<typeof CreateUserDTO>;
