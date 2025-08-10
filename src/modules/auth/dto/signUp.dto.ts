export type ROLE = 'PATIENT' | 'PROFESSIONAL' | 'ADMIN';
export type DocumentType = 'CPF' | 'RG';

export interface SignUpDto {
	name: string;
	email: string;
	password: string;
	birthDate: Date;
	role: ROLE;
	documentType: DocumentType;
	document: string;
}
