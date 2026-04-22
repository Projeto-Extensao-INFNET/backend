import { IsString, IsEmail, MinLength, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { MIN_PASSWORD_LENGTH } from '@/shared/constants';
import { ROLE, DocumentType } from '@/infra/database/prisma/generated/enums';

export class SignUpDto {
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

  @ApiProperty({ example: 'password123', description: 'Senha do usuário.' })
  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  password!: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Data de nascimento do usuário.',
  })
  @IsDate()
  @Type(() => Date)
  birthDate!: Date;

  @ApiProperty({
    enum: ROLE,
    example: 'PATIENT',
    description: 'Papel do usuário no sistema.',
  })
  @IsEnum(ROLE)
  role!: ROLE;

  @ApiProperty({
    enum: DocumentType,
    example: 'CPF',
    description: 'Tipo de documento.',
  })
  @IsEnum(DocumentType)
  documentType!: DocumentType;

  @ApiProperty({ example: '12345678901', description: 'Número do documento.' })
  @IsString()
  document!: string;
}

export class SignUpResponseDto {
  @ApiProperty({
    example: '39483434ore74520192-348934...',
    description: 'uuid do usuário',
  })
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
    example: '1990-01-01',
    description: 'Data de nascimento do usuário.',
  })
  @IsDate()
  @Type(() => Date)
  birthDate!: Date;

  @ApiProperty({
    enum: ROLE,
    example: 'PATIENT',
    description: 'Papel do usuário no sistema.',
  })
  @IsEnum(ROLE)
  role!: ROLE;

  @ApiProperty({ example: '12345678901' })
  @IsString()
  document!: string;

  @ApiProperty({ enum: DocumentType, example: 'CPF' })
  @IsEnum(DocumentType)
  documentType!: DocumentType;
}
