import type { PrismaClient } from 'generated/prisma';

export const CreateSpecialties = async (prisma: PrismaClient) => {
  await prisma.specialty.createMany({
    data: [{ name: 'Psiquiatria' }, { name: 'Psicologia' }],
  });

  await prisma.$disconnect();
};
