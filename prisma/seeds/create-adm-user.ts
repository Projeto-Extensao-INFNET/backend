import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient } from '../.././src/infra/database/generated/client';
import { hashPassword } from '../../src/utils';

export const CreateAdminUser = async (prisma: PrismaClient) => {
  const email = 'admin@email.com';
  const hashedPassword = await hashPassword('12345678');

  await prisma.user.upsert({
    where: { email },
    update: {
      name: 'Admin',
      password: hashedPassword,
    },
    create: {
      name: 'Admin',
      email,
      password: hashedPassword,
      birthDate: faker.date.birthdate(),
      role: 'ADMIN',
      documentType: 'RG',
      document: faker.helpers.replaceSymbols('##.###.###-#'),
    },
  });

  console.log('✔️ admin user created');
};
