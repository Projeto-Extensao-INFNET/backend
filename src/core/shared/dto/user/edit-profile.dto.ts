import { z } from 'zod';

export const editProfileDto = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
});

export type EditProfileDto = z.infer<typeof editProfileDto>;
