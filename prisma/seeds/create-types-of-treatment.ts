import type { PrismaClient } from '../.././src/infra/database/generated/client';

export const CreateTypesOfTreatment = async (prisma: PrismaClient) => {
  await prisma.typesOfTreatment.createMany({
    data: [
      { name: 'Psiquiatria Infantil' },
      { name: 'Terapia de Casais' },
      { name: 'Terapia Individual' },
    ],
    skipDuplicates: true,
  });
  console.log('✔️ types of treatment created');
};
