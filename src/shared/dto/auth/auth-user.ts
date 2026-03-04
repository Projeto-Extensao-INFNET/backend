import { createZodDto } from 'nestjs-zod';
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

// Classe para uso exclusivo no Swagger
export class AuthenticatedUserResponseClass extends createZodDto(
  authenticatedUserResponse,
) {}
