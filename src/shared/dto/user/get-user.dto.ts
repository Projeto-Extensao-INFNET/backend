import { IsUUID, IsString, IsEmail, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserProfileResponse {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  id!: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ type: Date, example: '1990-01-01T00:00:00Z' })
  @IsDate()
  @Type(() => Date)
  birthDate!: Date | string;

  @ApiProperty({ example: 'data:image/jpeg;base64,...' })
  @IsString()
  avatar!: string;

  @ApiProperty({ example: 'PATIENT' })
  @IsString()
  role!: string;

  @ApiProperty({ example: '12345678901' })
  @IsString()
  document!: string;
}
