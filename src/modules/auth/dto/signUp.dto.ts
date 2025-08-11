import {
	IsDateString,
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator';
import type { DocumentType, ROLE } from '@/_types';

export class SignUpDto {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsEmail()
	@IsNotEmpty()
	email!: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password!: string;

	@IsDateString()
	birthDate!: Date;

	role!: ROLE;
	documentType!: DocumentType;

	@IsString()
	@IsNotEmpty()
	document!: string;
}
