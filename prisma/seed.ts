import 'dotenv/config';
import { PrismaClient } from '../src/infra/database/prisma/generated/client';
import { CreateAdminUser } from './seeds/create-adm-user';
import { CreateUserAgenda } from './seeds/create-user-agenda';
import { CreatePatientUser } from './seeds/create-patient-user';
import { CreateProfessionalSchedule } from './seeds/create-professional-schedule';
import { CreateProfessionalUser } from './seeds/create-professional-user';
import { CreateSpecialties } from './seeds/create-specialties';
import { CreateTypesOfTreatment } from './seeds/create-types-of-treatment';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '../src/infra/config/env';

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const seed = async () => {
  await prisma.userAgenda.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.professional.deleteMany();
  await prisma.user.deleteMany();
  await prisma.specialty.deleteMany();
  await prisma.typesOfTreatment.deleteMany();

  console.log('✔️ Database reset');

  await CreateAdminUser(prisma);
  await CreateSpecialties(prisma);
  await CreateTypesOfTreatment(prisma);
  await CreateProfessionalUser(prisma);
  await CreatePatientUser(prisma);
  await CreateProfessionalSchedule(prisma);
  await CreateUserAgenda(prisma);
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('error on seed database:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
