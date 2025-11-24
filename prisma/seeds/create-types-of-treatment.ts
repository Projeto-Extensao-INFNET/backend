import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma';
import { env } from '../../src/core/config/env';


export const CreateTypesOfTreatment = async () => {
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  await prisma.typesOfTreatment.createMany({
    data: [
      { name: 'Psiquiatria Infantil' },
      { name: 'Terapia de Casais' },
      { name: 'Terapia Individual' },
    ],
  });
  await prisma.$disconnect();
};
