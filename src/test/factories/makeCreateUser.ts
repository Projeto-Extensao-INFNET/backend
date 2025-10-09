import { PrismaService } from '@/database/prisma/prisma.service';
import { hashPassword } from '@/shared/utils';
import {
	generateBirthDate,
	generateUniqueDocument,
	generateUniqueEmail,
	generateUniqueName,
} from '@/shared/utils/generate-data';

// cria um usuário
export const makeUser = async (prisma: PrismaService) => {
	const result = await prisma.user.create({
		data: {
			name: generateUniqueName(),
			email: generateUniqueEmail(),
			password: await hashPassword('12345678'),
			birthDate: generateBirthDate(),
			role: 'PATIENT',
			documentType: 'CPF',
			document: generateUniqueDocument(),
		},
	});

	return result;
};
export const makeUserProfessional = async (prisma: PrismaService) => {
	const result = await prisma.user.create({
		data: {
			name: generateUniqueName(),
			email: generateUniqueEmail(),
			password: await hashPassword('12345678'),
			birthDate: generateBirthDate(),
			role: 'PROFESSIONAL',
			documentType: 'CPF',
			document: generateUniqueDocument(),
		},
	});

	return result;
};
