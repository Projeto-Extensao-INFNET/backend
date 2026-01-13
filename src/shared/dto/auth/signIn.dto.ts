import { z } from 'zod';

export const signInDto = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});

export type SignInDto = z.infer<typeof signInDto>;
