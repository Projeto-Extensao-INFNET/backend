import { IsUUID, IsString, IsEmail, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserProfileResponse {
  @ApiProperty({ format: 'uuid', description: 'ID do usuário.' })
  @IsUUID()
  id!: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Nome completo do usuário.',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'E-mail do usuário.',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    type: Date,
    example: '1990-01-01T00:00:00Z',
    description: 'Data de nascimento.',
  })
  @IsDate()
  @Type(() => Date)
  birthDate!: Date | string;

  @ApiProperty({
    example: 'data:image/jpeg;base64,...',
    description: 'Avatar do usuário em base64.',
  })
  @IsString()
  avatar!: string;

  @ApiProperty({ example: 'PATIENT', description: 'Papel do usuário.' })
  @IsString()
  role!: string;

  @ApiProperty({ example: '12345678901', description: 'Número do documento.' })
  @IsString()
  document!: string;
}
