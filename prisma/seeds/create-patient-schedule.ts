import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient } from '../../generated/prisma';

export const CreatePatientSchedule = async () => {
	const prisma = new PrismaClient();

	const patients = await prisma.user.findMany({
		where: {
			role: 'PATIENT',
		},
	});

	const schedules = await prisma.schedule.findMany({
		where: {
			isAvailable: true,
		},
	});

	for (const patient of patients) {
		const schedule = faker.helpers.arrayElement(schedules);

		await prisma.userAgenda.create({
			data: {
				userId: patient.id,
				scheduleId: schedule.id,
				status: 'SCHEDULED',
				isConfirmed: false,
			},
		});

		// atualiza o status de disponibilidade daquele horário após agendamento
		await prisma.schedule.update({
			where: {
				id: schedule.id,
			},
			data: {
				isAvailable: false,
			},
		});
    
		await prisma.$disconnect();
	}
};
