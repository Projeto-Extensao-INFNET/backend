import z from 'zod';

// DTO para retornar usuário autenticado
export const authenticatedUserResponse = z.object({
  user: z.object({
    userId: z.uuid(),
    username: z.string(),
  }),
});

export type AuthenticatedUserResponse = z.infer<
  typeof authenticatedUserResponse
>;
