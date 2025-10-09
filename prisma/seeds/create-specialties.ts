import { PrismaClient } from '../../generated/prisma';

export const CreateSpecialties = async () => {
	const prisma = new PrismaClient();

	await prisma.specialty.createMany({
		data: [{ name: 'Psiquiatria' }, { name: 'Psicologia' }],
	});

	await prisma.$disconnect();
};
