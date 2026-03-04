import { IsString, IsEmail, MinLength, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { MIN_PASSWORD_LENGTH } from '@/shared/constants';
import { ROLE, DocumentType } from '@/infra/database/generated/enums';

export class SignUpDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  password!: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDate()
  @Type(() => Date)
  birthDate!: Date;

  @ApiProperty({ enum: ROLE, example: 'PATIENT' })
  @IsEnum(ROLE)
  role!: ROLE;

  @ApiProperty({ enum: DocumentType, example: 'CPF' })
  @IsEnum(DocumentType)
  documentType!: DocumentType;

  @ApiProperty({ example: '12345678901' })
  @IsString()
  document!: string;
}

export class SignUpResponseDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDate()
  @Type(() => Date)
  birthDate!: Date;

  @ApiProperty({ enum: ROLE, example: 'PATIENT' })
  @IsEnum(ROLE)
  role!: ROLE;

  @ApiProperty({ enum: DocumentType, example: 'CPF' })
  @IsEnum(DocumentType)
  documentType!: DocumentType;

  @ApiProperty({ example: '12345678901' })
  @IsString()
  document!: string;
}
