export enum ROLE {
	PATIENT = 'PATIENT',
	PROFESSIONAL = 'PROFESSIONAL',
	ADMIN = 'ADMIN',
}

export enum DocumentType {
	CPF = 'CPF',
	RG = 'RG',
}

export interface GetUserDto {
	id: string;
	name: string;
	email: string;
	birthDate: Date;
	role: ROLE;
	documentType: DocumentType;
	document: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface AuthenticatedUserRequest {
	user: {
		userId: string;
		username: string;
	};
}
