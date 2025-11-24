import { IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  scheduleId?: string;

  @IsString()
  userId?: string;
}
