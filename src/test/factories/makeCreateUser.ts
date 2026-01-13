import type { DOCUMENT_TYPE, ROLE } from '@/shared/types';
import { hashPassword } from '@/utils';
import {
  generateBirthDate,
  generateUniqueCPF,
  generateUniqueEmail,
  generateUniqueName,
} from '@/utils/generate-data';
import { PrismaService } from '@/infra/database/prisma.service';

// cria um usuário
export const makeUser = async (prisma: PrismaService) => {
  const result = await prisma.user.create({
    data: {
      name: generateUniqueName(),
      email: generateUniqueEmail(),
      password: await hashPassword('12345678'),
      birthDate: generateBirthDate(),
      role: 'PATIENT' as ROLE,
      documentType: 'CPF' as DOCUMENT_TYPE,
      document: generateUniqueCPF(),
    },
  });

  return result;
};
