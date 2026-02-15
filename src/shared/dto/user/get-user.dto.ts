import z from 'zod';

// DTO para retornar perfil do usuário
export const getUserProfileResponse = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  birthDate: z.iso.datetime(),
  avatar: z.string(),
  role: z.string(),
  document: z.string(),
});

export type GetUserProfileResponse = z.infer<typeof getUserProfileResponse>;
