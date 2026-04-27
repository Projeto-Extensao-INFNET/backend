import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditProfileDto {
  @ApiProperty({
    example: 'John Doe',
    required: false,
    description: 'Nome completo do usuário.',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'data:image/jpeg;base64,...',
    required: false,
    description: 'Avatar do usuário em base64.',
  })
  @IsOptional()
  @IsString()
  avatar?: string;
}
