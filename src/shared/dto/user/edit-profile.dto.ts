import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const editProfileDto = z.object({
  name: z.string().optional(),
  avatar: z.string().optional(),
});

export type EditProfileDto = z.infer<typeof editProfileDto>;

// Classe para uso no Swagger
export class EditProfileDtoClass extends createZodDto(editProfileDto) {}
