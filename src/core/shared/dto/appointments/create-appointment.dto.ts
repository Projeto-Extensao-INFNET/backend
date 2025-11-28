import { z } from 'zod';

export const createAppointmentDto = z.object({
  scheduleId: z.string(),
  userId: z.string(),
});

export type CreateAppointmentDto = z.infer<typeof createAppointmentDto>;
