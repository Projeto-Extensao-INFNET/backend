import type { DocumentType, ROLE } from '@/core/shared/types';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  role: ROLE;
  documentType: DocumentType;
  document: string;
  createdAt: Date;
  updatedAt: Date;
}
