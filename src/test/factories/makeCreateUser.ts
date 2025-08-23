import { PrismaService } from '@/modules/prisma/prisma.service';
import { hashPassword } from '@/utils';
import {
	generateBirthDate,
	generateUniqueDocument,
	generateUniqueEmail,
	generateUniqueName,
} from '@/utils/generate-data';

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
