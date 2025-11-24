import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma';
import { env } from '../../src/core/config/env';


export const CreateSpecialties = async () => {
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  await prisma.specialty.createMany({
    data: [{ name: 'Psiquiatria' }, { name: 'Psicologia' }],
  });

  await prisma.$disconnect();
};
