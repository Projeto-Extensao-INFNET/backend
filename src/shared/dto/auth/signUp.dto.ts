import { z } from 'zod';

export const signUpDto = z.object({
  name: z.string().nonempty(),
  email: z.email().nonempty(),
  password: z.string().min(8).nonempty(),
  birthDate: z.coerce.date(),
  role: z.enum(['PATIENT', 'PROFESSIONAL', 'ADMIN']),
  documentType: z.enum(['CPF', 'RG']),
  document: z.string().nonempty(),
});

export type SignUpDto = z.infer<typeof signUpDto>;
