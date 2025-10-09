import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient, type User } from '../../generated/prisma';
import { hashPassword } from '../../src/shared/utils';

export const CreatePatientUser = async () => {
	const prisma = new PrismaClient();

	const userPatients: User[] = [];

	for (let i = 0; i < 10; i++) {
		const userPatient = await prisma.user.create({
			data: {
				name: faker.person.fullName(),
				email: faker.internet.email(),
				password: await hashPassword('12345678'),
				birthDate: faker.date.birthdate(),
				role: 'PATIENT',
				documentType: 'CPF',
				document: faker.helpers.replaceSymbols('###.###.###-##'),
			},
		});
		userPatients.push(userPatient);
	}
	await prisma.$disconnect();
	return userPatients;
};
