import { PrismaClient } from '../../generated/prisma';

export const CreateTypesOfTreatment = async () => {
	const prisma = new PrismaClient();

	await prisma.typesOfTreatment.createMany({
		data: [
			{ name: 'Psiquiatria Infantil' },
			{ name: 'Terapia de Casais' },
			{ name: 'Terapia Individual' },
		],
	});
	await prisma.$disconnect();
};
