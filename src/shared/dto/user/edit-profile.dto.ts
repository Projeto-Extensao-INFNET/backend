import { z } from 'zod';

export const editProfileDto = z.object({
  name: z.string().optional(),
  avatar: z.string().optional(),
});

export type EditProfileDto = z.infer<typeof editProfileDto>;
