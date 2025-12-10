import { DOCUMENT_TYPE, ROLE } from '@/core/types';
import { hashPassword } from '@/core/shared/utils';
import {
  generateBirthDate,
  generateUniqueCPF,
  generateUniqueEmail,
  generateUniqueName,
} from '@/core/shared/utils/generate-data';
import { PrismaService } from '@/infra/database/prisma.service';

// cria um usuário
export const makeUser = async (prisma: PrismaService) => {
  const result = await prisma.user.create({
    data: {
      name: generateUniqueName(),
      email: generateUniqueEmail(),
      password: await hashPassword('12345678'),
      birthDate: generateBirthDate(),
      role: ROLE.PATIENT,
      documentType: DOCUMENT_TYPE.CPF,
      document: generateUniqueCPF(),
    },
  });

  return result;
};
