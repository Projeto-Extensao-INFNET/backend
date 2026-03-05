import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient } from '../.././src/infra/database/prisma/generated/client';
import { hashPassword } from '../../src/utils';

export const CreatePatientUser = async (prisma: PrismaClient) => {
  for (let i = 0; i < 10; i++) {
    await prisma.user.createMany({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await hashPassword('12345678'),
        birthDate: faker.date.birthdate(),
        role: 'PATIENT',
        documentType: 'CPF',
        document: faker.helpers.replaceSymbols('###.###.###-##'),
      },
    });
  }
  console.log('✔️ patients created');
};
