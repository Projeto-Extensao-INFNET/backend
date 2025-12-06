import type { DOCUMENT_TYPE, ROLE } from '@/core/shared/types';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  role: ROLE;
  documentType: DOCUMENT_TYPE;
  document: string;
  createdAt: Date;
  updatedAt: Date;
}
