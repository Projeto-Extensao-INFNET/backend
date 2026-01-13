import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient } from '../.././src/infra/database/generated/client';

export const CreateProfessionalSchedule = async (prisma: PrismaClient) => {
  const professionals = await prisma.professional.findMany();

  for (let i = 0; i < 20; i++) {
    const professional = faker.helpers.arrayElement(professionals);

    await prisma.schedule.create({
      data: {
        createdAt: faker.date.past(),
        endAt: faker.date.past(),
        startAt: faker.date.future(),
        location: faker.location.city(),
        isAvailable: true,
        isConfirmed: false,
        professionalId: professional.id,
      },
    });
  }

  await prisma.$disconnect();
};
