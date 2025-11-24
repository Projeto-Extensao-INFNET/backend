import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient, type User } from '../../generated/prisma';
import { hashPassword } from '../../src/core/shared/utils';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '../../src/core/config/env';


export const CreatePatientUser = async () => {
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const userPatients: User[] = [];

  for (let i = 0; i < 10; i++) {
    const userPatient = await prisma.user.create({
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
    userPatients.push(userPatient);
  }
  await prisma.$disconnect();
  return userPatients;
};
