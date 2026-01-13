import z from 'zod';

// DTO para retornar perfil do usuário (SEM senha)
export const getUserProfileDto = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  birthDate: z.date(),
  role: z.enum(['PATIENT', 'PROFESSIONAL', 'ADMIN']),
  documentType: z.enum(['CPF', 'RG']),
  document: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// DTO para retornar usuário autenticado
export const authenticatedUserRequest = z.object({
  user: z.object({
    userId: z.uuid(),
    username: z.string(),
  }),
});

export type GetUserProfileDto = z.infer<typeof getUserProfileDto>;
export type AuthenticatedUserRequest = z.infer<typeof authenticatedUserRequest>;
