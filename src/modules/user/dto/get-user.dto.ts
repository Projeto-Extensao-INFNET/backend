import type { DocumentType, ROLE } from '@/_types';

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
