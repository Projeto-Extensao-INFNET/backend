import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const signInDto = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});

export type SignInDto = z.infer<typeof signInDto>;

// Classe para uso exclusivo no Swagger
export class SignInDtoClass extends createZodDto(signInDto) {}
