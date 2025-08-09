export enum ROLE {
	PATIENT = 'PATIENT',
	PROFESSIONAL = 'PROFESSIONAL',
	ADMIN = 'ADMIN',
}

export enum DocumentType {
	CPF = 'CPF',
	RG = 'RG',
}

export interface SignUpDto {
	name: string;
	email: string;
	password: string;
	birthDate: Date;
	role: ROLE;
	documentType: DocumentType;
	document: string;
}
