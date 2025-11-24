import {
  generateBirthDate,
  generateUniqueDocument,
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
  role: 'PATIENT',
  documentType: 'CPF',
  document: generateUniqueDocument(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
