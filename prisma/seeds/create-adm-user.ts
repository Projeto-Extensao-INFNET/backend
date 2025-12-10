import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient } from '../../generated/prisma';
import { hashPassword } from '../../src/core/shared/utils';

export const CreateAdminUser = async (prisma: PrismaClient) => {
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
