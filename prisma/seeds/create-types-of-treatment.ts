import type { PrismaClient } from '../../generated/prisma/client';

export const CreateTypesOfTreatment = async (prisma: PrismaClient) => {
  await prisma.typesOfTreatment.createMany({
    data: [
      { name: 'Psiquiatria Infantil' },
      { name: 'Terapia de Casais' },
      { name: 'Terapia Individual' },
    ],
  });
  await prisma.$disconnect();
};
