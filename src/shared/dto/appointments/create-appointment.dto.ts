import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    format: 'uuid',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'ID do agendamento.',
  })
  @IsString()
  scheduleId!: string;

  @ApiProperty({
    format: 'uuid',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'ID do usuário.',
  })
  @IsString()
  userId!: string;

  @ApiProperty({
    format: 'uuid',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'ID da especialidade.',
  })
  @IsString()
  specialtyId!: string;

  @ApiProperty({
    format: 'uuid',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'ID do tipo de tratamento.',
  })
  @IsString()
  typeOfTreatmentId!: string;

  @ApiProperty({ example: true, description: 'Se está disponível.' })
  @IsBoolean()
  isAvailable!: boolean;

  @ApiProperty({ example: false, description: 'Se está cancelado.' })
  @IsBoolean()
  isConfirmed!: boolean;
}
