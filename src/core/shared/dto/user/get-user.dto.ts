import z from 'zod';

export const userProfileDto = z.object({
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

export const authenticatedUserRequest = z.object({
  user: z.object({
    userId: z.uuid(),
    username: z.string(),
  }),
});

export type UserProfileDto = z.infer<typeof userProfileDto>;
export type AuthenticatedUserRequest = z.infer<typeof authenticatedUserRequest>;
