import type { PrismaService } from '@/infra/database/prisma/prisma.service';
import type { DOCUMENT_TYPE, ROLE } from '@/shared/types';
import {
  generateBirthDate,
  generateUniqueCPF,
  generateUniqueEmail,
  generateUniqueName,
  hashPassword,
} from '@/utils';

// cria um usuário ADM
export const makeCreateAdminUser = async (prisma: PrismaService) => {
  const result = await prisma.user.create({
    data: {
      name: generateUniqueName(),
      email: generateUniqueEmail(),
      password: await hashPassword('12345678'),
      birthDate: generateBirthDate(),
      role: 'ADMIN' as ROLE,
      documentType: 'CPF' as DOCUMENT_TYPE,
      document: generateUniqueCPF(),
    },
  });

  return result;
};
