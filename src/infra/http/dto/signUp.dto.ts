import { ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator';
import type { DocumentType, ROLE } from '@/_types';

export class SignUpDto {
	@ApiProperty({ example: 'Exemplo Paciente' })
	@IsString()
	@IsNotEmpty()
	name!: string;

	@ApiProperty({ example: 'paciente@acme.com' })
	@IsEmail()
	@IsNotEmpty()
	email!: string;

	@ApiProperty({ example: '12345678', minLength: 8 })
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password!: string;

	@ApiProperty({ example: '1990-01-01T00:00:00.000Z', type: String })
	@IsDateString()
	birthDate!: Date;

	@ApiProperty({
		example: 'PATIENT',
		enum: ['PATIENT', 'PROFESSIONAL', 'ADMIN'],
	})
	role!: ROLE;

	@ApiProperty({ example: 'CPF', enum: ['CPF', 'RG'] })
	documentType!: DocumentType;

	@ApiProperty({ example: '123.456.789-00' })
	@IsString()
	@IsNotEmpty()
	document!: string;
}
