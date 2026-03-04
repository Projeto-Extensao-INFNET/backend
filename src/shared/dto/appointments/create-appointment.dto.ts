import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    format: 'uuid',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsString()
  scheduleId!: string;

  @ApiProperty({
    format: 'uuid',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsString()
  userId!: string;

  @ApiProperty({
    format: 'uuid',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsString()
  specialtyId!: string;

  @ApiProperty({
    format: 'uuid',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsString()
  typeOfTreatmentId!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isAvailable!: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  isConfirmed!: boolean;
}
