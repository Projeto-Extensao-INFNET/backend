import type { PrismaClient } from '../.././src/infra/database/generated/client';

export const CreateSpecialties = async (prisma: PrismaClient) => {
  await prisma.specialty.createMany({
    data: [{ name: 'Psiquiatria' }, { name: 'Psicologia' }],
    skipDuplicates: true,
  });
  console.log('✔️ specialties created');
};
