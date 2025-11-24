import {
  generateBirthDate,
  generateUniqueDocument,
  generateUniqueEmail,
  generateUniqueName,
  hashPassword,
} from '@/core/shared/utils';
import type { PrismaService } from '@/infra/database/prisma.service';

export const makeUserProfessional = async (prisma: PrismaService) => {
  const result = await prisma.user.create({
    data: {
      name: generateUniqueName(),
      email: generateUniqueEmail(),
      password: await hashPassword('12345678'),
      birthDate: generateBirthDate(),
      role: 'PROFESSIONAL',
      documentType: 'CPF',
      document: generateUniqueDocument(),
    },
  });

  return result;
};

export const makeProfessional = async (prisma: PrismaService) => {
  const user = await makeUserProfessional(prisma);

  const specialty = await prisma.specialty.create({
    data: {
      name: `Specialty-${Date.now()}`,
    },
  });

  const typeOfTreatment = await prisma.typesOfTreatment.create({
    data: {
      name: `Treatment-${Date.now()}`,
    },
  });

  const professional = await prisma.professional.create({
    data: {
      userId: user.id,
      document: `${Date.now()}`,
      documentType: 'CRM',
      typeOfQuery: 'ONLINE_VIDEO_CALL',
      price: 100,
      paymentMethod: 'CREDIT_CARD',
      gender: 'MALE',
      avatar: 'https://example.com/avatar.jpg',
      specialtyId: specialty.id,
      typeOfTreatmentId: typeOfTreatment.id,
    },
  });

  return professional;
};
