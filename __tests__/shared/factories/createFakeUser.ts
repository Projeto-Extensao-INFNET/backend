import {
  generateUUID,
  generateBirthDate,
  generateUniqueCPF,
  generateAvatar,
  generateEmail,
  generateName,
} from '@/utils';
import type { User } from '@/infra/database/prisma/generated/client';

export const createFakeUser = (overrides?: Partial<User>): User => {
  const now = new Date();
  return {
    id: generateUUID(),
    name: generateName(),
    password: 'senha-123',
    avatar: generateAvatar(),
    email: generateEmail(),
    birthDate: generateBirthDate(),
    role: 'PATIENT',
    documentType: 'CPF',
    document: generateUniqueCPF(),
    refreshToken: overrides?.refreshToken ?? null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
};
