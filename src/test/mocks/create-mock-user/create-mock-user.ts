import type { DOCUMENT_TYPE, ROLE } from '@/core/types/index';

import {
  generateBirthDate,
  generateUniqueCPF,
  generateUniqueEmail,
  generateUniqueName,
  generateUUID,
} from '@/core/shared/utils';

export const CreateMockUser = {
  id: generateUUID(),
  name: generateUniqueName(),
  email: generateUniqueEmail(),
  password: '12345678',
  birthDate: generateBirthDate(),
  role: 'PATIENT' as ROLE,
  documentType: 'CPF' as DOCUMENT_TYPE,
  document: generateUniqueCPF(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const CreateMockUserWithoutPassword = {
  id: generateUUID(),
  name: generateUniqueName(),
  email: generateUniqueEmail(),
  birthDate: generateBirthDate(),
  role: 'PATIENT' as ROLE,
  documentType: 'CPF' as DOCUMENT_TYPE,
  document: generateUniqueCPF(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
