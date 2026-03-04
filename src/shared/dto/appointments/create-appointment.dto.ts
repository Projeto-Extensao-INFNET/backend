import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createAppointmentDto = z.object({
  scheduleId: z.string(),
  userId: z.string(),
  specialtyId: z.string(),
  typeOfTreatmentId: z.string(),
  isAvailable: z.boolean(),
  isConfirmed: z.boolean(),
});

export type CreateAppointmentDto = z.infer<typeof createAppointmentDto>;

// Classe para documentação Swagger
export class CreateAppointmentDtoClass extends createZodDto(
  createAppointmentDto,
) {}
