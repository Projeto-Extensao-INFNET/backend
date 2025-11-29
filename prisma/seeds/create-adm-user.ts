import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient } from '../../generated/prisma';
import { hashPassword } from '../../src/core/shared/utils';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '../../src/core/config/env';

export const CreateAdminUser = async () => {
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const userAdmin = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await hashPassword('12345678'),
      birthDate: faker.date.birthdate(),
      role: 'ADMIN',
      documentType: 'RG',
      document: faker.helpers.replaceSymbols('##.###.###-#'),
    },
  });
  await prisma.$disconnect();

  return userAdmin;
};
