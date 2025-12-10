import { DOCUMENT_TYPE } from '@/core/types/index';
import { ROLE } from '@/core/types';

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
  role: ROLE.PATIENT,
  documentType: DOCUMENT_TYPE.CPF,
  document: generateUniqueCPF(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
