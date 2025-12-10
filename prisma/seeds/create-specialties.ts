import type { PrismaClient } from '../../generated/prisma/client';

export const CreateSpecialties = async (prisma: PrismaClient) => {
  await prisma.specialty.createMany({
    data: [{ name: 'Psiquiatria' }, { name: 'Psicologia' }],
  });

  await prisma.$disconnect();
};
