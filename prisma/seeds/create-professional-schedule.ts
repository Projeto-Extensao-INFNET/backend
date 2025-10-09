import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient } from '../../generated/prisma';

export const CreateProfessionalSchedule = async () => {
	const prisma = new PrismaClient();

	const professionals = await prisma.professional.findMany();

	for (let i = 0; i < 10; i++) {
		const professional = faker.helpers.arrayElement(professionals);
		await prisma.schedule.create({
			data: {
				schedules: faker.date.future(),
				isAvailable: true,
				isConfirmed: false,
				professionalId: professional.id,
			},
		});
		await prisma.$disconnect();
	}
};
