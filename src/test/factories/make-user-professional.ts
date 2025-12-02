import {
  DOCUMENT_TYPE,
  GENDER,
  PAYMENT_METHOD,
  PROFESSIONAL_DOCUMENT_TYPE,
  ROLE,
  TYPE_OF_QUERY,
} from '@/core/shared/types';
import {
  generateBirthDate,
  generateUniqueCPF,
  generateUniqueCRM,
  generateUniqueEmail,
  generateUniqueName,
  hashPassword,
} from '@/core/shared/utils';
import type { PrismaService } from '@/infra/database/prisma.service';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const makeUserProfessional = async (prisma: PrismaService) => {
  const result = await prisma.user.create({
    data: {
      name: generateUniqueName(),
      email: generateUniqueEmail(),
      password: await hashPassword('12345678'),
      birthDate: generateBirthDate(),
      role: ROLE.PROFESSIONAL,
      documentType: DOCUMENT_TYPE.CPF,
      document: generateUniqueCPF(),
    },
  });

  return result;
};

export const makeProfessional = async (prisma: PrismaService) => {
  const user = await makeUserProfessional(prisma);

  const specialty = await prisma.specialty.create({
    data: {
      name: `Specialty-${faker.person.jobArea()}`,
    },
  });

  const typeOfTreatment = await prisma.typesOfTreatment.create({
    data: {
      name: `Treatment-${faker.science.chemicalElement()}`,
    },
  });

  const professional = await prisma.professional.create({
    data: {
      userId: user.id,
      document: generateUniqueCRM(),
      documentType: PROFESSIONAL_DOCUMENT_TYPE.CRM,
      typeOfQuery: TYPE_OF_QUERY.ONLINE_VIDEO_CALL,
      price: 100,
      paymentMethod: PAYMENT_METHOD.CREDIT_CARD,
      gender: GENDER.MALE,
      avatar: 'https://example.com/avatar.jpg',
      specialtyId: specialty.id,
      typeOfTreatmentId: typeOfTreatment.id,
    },
  });

  return professional;
};
