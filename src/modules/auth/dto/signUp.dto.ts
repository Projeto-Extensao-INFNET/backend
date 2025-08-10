import type { DocumentType, ROLE } from '@/_types';

export interface SignUpDto {
	name: string;
	email: string;
	password: string;
	birthDate: Date;
	role: ROLE;
	documentType: DocumentType;
	document: string;
}
